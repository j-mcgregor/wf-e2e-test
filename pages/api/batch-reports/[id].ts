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
import authenticators from '../../../lib/api-handler/authenticators';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';
import APIHandler from '../../../lib/api-handler/handler';

/** @COMPLETE */

const { METHOD_NOT_ALLOWED, NOT_FOUND } = StatusCodeConstants;

export interface BatchReportsIdApi
  extends GetBatchReportById,
    GetBatchReportCsvFull {}

const BatchReportsIdApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'BATCH_REPORTS_BY_ID'
    },
    GET: async ({ query, authentication }) => {
      const batchReportId = query.id;
      const exportQuery = query.export;
      const skip = parseInt(query?.skip?.toString()) || 0;
      const limit = parseInt(query?.limit?.toString()) || 10;

      if (exportQuery === 'csv') {
        const res = await fetchWrapper(
          `${process.env.NEXT_PUBLIC_WF_AP_ROUTE}/jobs/batch/${batchReportId}/export/full`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        );

        const csv = await res.text();

        return {
          defaultResponse: {
            data: { csv },
            status: res.status,
            code: `BATCH_REPORTS_BY_ID_${res.status}`,
            message:
              res.status < 300
                ? 'Successfully fetched batch reports by Id'
                : 'Failed to fetch batch reports by Id'
          }
        };
      }

      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/jobs/batch/${batchReportId}?skip=${skip}&limit=${limit}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        )
      };
    }
  });
};

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
      const skip = parseInt(request.query?.skip?.toString()) || 0;
      const limit = parseInt(request.query?.limit?.toString()) || 10;

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
          { id: batchReportId.toString(), skip, limit }
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

export default withSentry(BatchReportsIdApi);
