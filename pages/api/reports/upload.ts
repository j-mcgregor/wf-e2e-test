import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const ReportUploadApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'REPORTS_UPLOAD'
    },
    POST: async ({ body, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/reports/upload`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        )
      };
    }
  });
};

export default withSentry(ReportUploadApi);
