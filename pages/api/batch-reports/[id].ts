/* eslint-disable security/detect-object-injection */
/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport, {
  GetBatchReportById,
  GetBatchReportCsvFull
} from '../../../lib/funcs/batch-reports';
import { NO_REPORT_ID } from '../../../lib/utils/error-codes';
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

/** @COMPLETE */

const { METHOD_NOT_ALLOWED, NOT_FOUND } = StatusCodeConstants;

export interface BatchReportsIdApi
  extends GetBatchReportById,
    GetBatchReportCsvFull {}

// Declaring function for readability with Sentry wrapper
const batchReports: NextApiHandler<BatchReportsIdApi> = async (
  request,
  response
) => {
  const defaultNullProps = {
    batchReport: null,
    report: null,
    csv: null
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
    case 'GET':
      // extract report id
      const batchReportId = request.query.id;
      const exportQuery = request.query.export;

      if (!batchReportId) {
        return makeMissingArgsResponse(
          response,
          NO_REPORT_ID,
          'No report ID provided, please add batched report ID.',
          defaultNullProps
        );
      }

      try {
        // GET CSV
        if (exportQuery === 'csv') {
          const fetchRes = await BatchReport.getBatchReportsCsv(
            `${token.accessToken}`,
            { batchReportId: batchReportId.toString() }
          );

          return response.status(fetchRes.status).json({
            ...defaultNullProps,
            ...fetchRes
          });
        }
        const fetchRes = await BatchReport.getBatchReportsById(
          `${token.accessToken}`,
          { id: batchReportId.toString() }
        );

        return response.status(fetchRes.status).json({
          ...defaultNullProps,
          ...fetchRes
        });
      } catch (error) {
        return response.status(NOT_FOUND).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.BATCH_REPORT[NOT_FOUND]
          }),
          ...defaultNullProps
        });
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
