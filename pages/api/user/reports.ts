import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler } from 'next';

const XMLHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

const userReportsApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'USER_REPORTS',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ authentication, query }) => {
      const { limit, skip, total } = query;
      const limitAsNumber = Number(limit) || 10;
      const skipAsNumber = Number(skip) || 0;

      const limitAndSkipString = limit
        ? `?limit=${limitAsNumber}&skip=${skipAsNumber}`
        : '';

      const response = await fetchWrapper(
        `${process.env.WF_AP_ROUTE}/users/me/history/reports${limitAndSkipString}`,
        {
          method: 'GET',
          headers: {
            ...XMLHeaders,
            Authorization: `Bearer ${authentication?.accessToken}`
          }
        }
      );

      const json = await response.json();

      return {
        defaultResponse: {
          status: response.status,
          code: `USER_REPORTS_${response.status}`,
          message: json.message,
          data: {
            reports: json,
            ...(total && { total: json?.length })
          }
        }
      };
    }
  });
};

export default withSentry(userReportsApi);
