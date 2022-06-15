import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler } from 'next';
import type { BatchManualRequest } from '../../../types/batch-reports';

const BatchReportsManualApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'BATCH_REPORTS_MANUAL'
    },
    POST: async ({ body, authentication }) => {
      const batchReport: BatchManualRequest = {
        // they removed the .report_in requirement
        entities: body?.entities || [],
        name: body?.name || '',
        currency: body?.currency || '',
        /** @deprecated */
        accounts_type: body?.accounts_type || 1
      };

      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/jobs/batch/upload`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(batchReport)
          }
        )
      };
    }
  });
};

export default withSentry(BatchReportsManualApi);
