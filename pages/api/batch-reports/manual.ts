/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import { defaultNullProps } from '.';
import BatchReport, {
  BatchJobReportUpload
} from '../../../lib/funcs/batch-reports';
import { MISSING_DATA } from '../../../lib/utils/error-codes';
import { makeApiHandlerResponseFailure } from '../../../lib/utils/http-helpers';
import { HttpStatusCodes } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';
import type { BatchManualRequest } from '../../../types/batch-reports';

const { FORBIDDEN, INTERNAL_SERVER_ERROR, BAD_REQUEST, METHOD_NOT_ALLOWED } =
  HttpStatusCodes;

export interface BatchReportsManualApi extends BatchJobReportUpload {
  batchReportId: string | null;
}

// Declaring function for readability with Sentry wrapper
const batchReports: NextApiHandler<BatchReportsManualApi> = async (
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
      report: null,
      batchReportId: null
    });
  }

  const { method } = request;
  const isPost = method === 'POST';
  if (isPost) {
    if (request?.body?.entities?.length > 0) {
      const batchReport: BatchManualRequest = {
        // they removed the .report_in requirement
        entities: request?.body?.entities || [],
        name: request?.body?.name || '',
        accounts_type: request?.body?.accounts_type,
        currency: request?.body?.currency || ''
      };

      try {
        const res = await BatchReport.batchJobReportUpload(
          `${token.accessToken}`,
          batchReport
        );

        return response.status(res.status).json({
          ...res,
          ...defaultNullProps,
          // TODO just send batchReportId from handler
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
          message: 'No entities list provided',
          error: MISSING_DATA
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
