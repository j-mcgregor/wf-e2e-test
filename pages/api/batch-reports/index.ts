/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport, {
  CreateBatchReport,
  GetAllBatchReports
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

import type { BatchAutoRequest } from '../../../types/batch-reports';
import type { NextApiHandler } from 'next';
import APIHandler from '../../../lib/api-handler/handler';
import authenticators from '../../../lib/api-handler/authenticators';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

/** @COMPLETE */

const { NOT_FOUND, INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED } =
  StatusCodeConstants;

export const defaultNullProps = {
  batchReports: null,
  batchReportId: null
};
export interface BatchReportsIndexApi
  extends GetAllBatchReports,
    CreateBatchReport {}

const BatchReportsApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'BATCH_REPORTS'
    },
    GET: async ({ query, authentication }) => {
      const { limit, skip } = query;
      const safeLimit = Number(limit) || 10;
      const safeSkip = Number(skip) || 0;
      const limitAndSkipString = safeLimit
        ? `?limit=${safeLimit}&skip=${safeSkip}`
        : '';
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/jobs/batch${limitAndSkipString}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        )
      };
    },
    POST: async ({ body, authentication }) => {
      const batchReport: BatchAutoRequest = {
        entities: body?.entities || [],
        name: body?.name || '',
        currency: body?.currency || '',
        accounts_type: body?.accounts_type || 1
      };

      return {
        response: await fetchWrapper(`${process.env.WF_AP_ROUTE}/jobs/batch`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authentication?.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(batchReport)
        })
      };
    }
  });
};

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
    return returnUnauthorised(response, defaultNullProps);
  }

  const { method } = request;

  const { limit, skip } = request.query;

  const safeLimit = Number(limit);
  const safeSkip = Number(skip);

  switch (method) {
    case 'GET':
      try {
        const result = await BatchReport.getAllBatchReports(
          `${token.accessToken}`,
          { limit: safeLimit, skip: safeSkip }
        );

        return response.status(result.status).json({
          ...defaultNullProps,
          ...result
        });
      } catch (error) {
        return response.status(NOT_FOUND).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.BATCH_REPORT[NOT_FOUND]
          }),
          ...defaultNullProps
        });
      }
    case 'POST':
      if (request?.body?.entities?.length > 0) {
        const batchReport: BatchAutoRequest = {
          entities: request?.body?.entities || [],
          name: request?.body?.name || '',
          currency: request?.body?.currency || '',
          accounts_type: request?.body?.accounts_type || 1
        };

        try {
          const result = await BatchReport.createBatchReport(
            `${token.accessToken}`,
            { report: batchReport }
          );

          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        } catch (error: any) {
          return response.status(INTERNAL_SERVER_ERROR).json({
            ...makeApiHandlerResponseFailure({
              message: errorsBySourceType.BATCH_REPORT[INTERNAL_SERVER_ERROR]
            }),
            ...defaultNullProps
          });
        }
      } else {
        return makeMissingArgsResponse(
          response,
          MISSING_DATA,
          'No company list provided',
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

export default withSentry(BatchReportsApi);
