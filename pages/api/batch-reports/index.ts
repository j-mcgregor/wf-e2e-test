/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport, {
  CreateBatchReport,
  GetAllBatchReports
} from '../../../lib/funcs/batch-reports';
import { MISSING_DATA, NO_REPORT } from '../../../lib/utils/error-codes';
import { makeApiHandlerResponseFailure } from '../../../lib/utils/http-helpers';
import { HttpStatusCodes } from '../../../types/http-status-codes';

import type { BatchAutoRequest } from '../../../types/batch-reports';
import type { NextApiHandler } from 'next';

const {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  METHOD_NOT_ALLOWED
} = HttpStatusCodes;

export const defaultNullProps = {
  batchReports: null,
  report: null,
  batchReportId: null
};
export interface BatchReportsIndexApi
  extends GetAllBatchReports,
    CreateBatchReport {
  batchReportId: string | null;
}

// Declaring function for readability with Sentry wrapper
const batchReports: NextApiHandler<BatchReportsIndexApi> = async (
  request,
  response
) => {
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return response.status(FORBIDDEN.statusCode).json({
      ...makeApiHandlerResponseFailure({
        message: 'Unauthorised api request, please login to continue.',
        error: FORBIDDEN.key
      }),
      batchReports: null,
      report: null,
      batchReportId: null
    });
  }

  const { method } = request;
  const isGet = method === 'GET';
  const isPost = method === 'POST';

  if (isPost) {
    if (request?.body?.entities?.length > 0) {
      const batchReport: BatchAutoRequest = {
        entities: request?.body?.entities || [],
        name: request?.body?.name || '',
        accounts_type: request?.body?.accounts_type || 0,
        currency: request?.body?.currency || ''
      };

      try {
        const res = await BatchReport.createBatchReport(
          `${token.accessToken}`,
          { report: batchReport }
        );

        return response.status(res.status).json({
          ...res,
          ...defaultNullProps,
          batchReportId: res.report?.id ?? null
        });
      } catch (error: any) {
        return response.status(INTERNAL_SERVER_ERROR.statusCode).json({
          ...makeApiHandlerResponseFailure({ message: error.message }),
          ...defaultNullProps
        });
      }
    } else {
      return response.status(BAD_REQUEST.statusCode).json({
        ...makeApiHandlerResponseFailure({
          message: 'No company list provided',
          error: MISSING_DATA
        }),
        ...defaultNullProps
      });
    }
  }

  if (isGet) {
    try {
      const res = await BatchReport.getAllBatchReports(
        `${token.accessToken}`,
        {}
      );

      if (res.ok) {
        return response.status(res.status).json({
          ...res,
          ...defaultNullProps,
          batchReports: res.batchReports
        });
      }
    } catch (error) {
      return response.status(NOT_FOUND.statusCode).json({
        ...makeApiHandlerResponseFailure({
          message: "Can't find any batch reports",
          error: NO_REPORT
        }),
        ...defaultNullProps
      });
    }
  }

  return response.status(METHOD_NOT_ALLOWED.statusCode).json({
    ...makeApiHandlerResponseFailure({ message: METHOD_NOT_ALLOWED.key }),
    ...defaultNullProps
  });
};

export default withSentry(batchReports);
