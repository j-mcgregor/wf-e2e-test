import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { BatchAutoRequest } from '../../../types/batch-reports';
import type { NextApiHandler } from 'next';

const BatchReportsApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'BATCH_AUTO'
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

export default withSentry(BatchReportsApi);
