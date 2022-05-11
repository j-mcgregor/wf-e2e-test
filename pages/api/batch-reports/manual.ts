/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport, {
  BatchJobReportUpload
} from '../../../lib/funcs/batch-reports';
import { MISSING_DATA } from '../../../lib/utils/error-codes';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../lib/utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeMissingArgsResponse
} from '../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';
import type { BatchManualRequest } from '../../../types/batch-reports';

/** @COMPLETE */

const { INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface BatchReportsManualApi extends BatchJobReportUpload {
  batchReportId: string | null;
}

// Declaring function for readability with Sentry wrapper
const batchReports: NextApiHandler<BatchReportsManualApi> = async (
  request,
  response
) => {
  const defaultNullProps = {
    batchReportId: null,
    report: null
  };
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return returnUnauthorised(response, defaultNullProps);
  }

  const { method } = request;

  switch (method) {
    case 'POST':
      if (request?.body?.entities?.length > 0) {
        const batchReport: BatchManualRequest = {
          // they removed the .report_in requirement
          entities: request?.body?.entities || [],
          name: request?.body?.name || '',
          currency: request?.body?.currency || '',
          /** @deprecated */
          accounts_type: request?.body?.accounts_type || 1
        };

        try {
          const result = await BatchReport.batchJobReportUpload(
            `${token.accessToken}`,
            { report: batchReport }
          );

          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        } catch (error: any) {
          return response.status(INTERNAL_SERVER_ERROR).json({
            ...makeApiHandlerResponseFailure({ message: error.message }),
            ...defaultNullProps
          });
        }
      } else {
        return makeMissingArgsResponse(
          response,
          MISSING_DATA,
          'No entities list provided',
          defaultNullProps
        );
      }
    default:
      return response.status(METHOD_NOT_ALLOWED).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
        }),
        ...defaultNullProps
      });
  }
};

export default withSentry(batchReports);
