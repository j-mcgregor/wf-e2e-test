import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler } from 'next';

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

export default withSentry(BatchReportsIdApi);
