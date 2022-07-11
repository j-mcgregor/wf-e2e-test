import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../../lib/utils/fetchWrapper';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const OrganisationApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'ORGANISATION'
    },
    GET: async ({ query, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/organisations/${query.orgId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        )
      };
    },
    PUT: async ({ query, body, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/organisations/${query.orgId}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            },
            body: JSON.stringify(body)
          }
        )
      };
    }
  });
};

export default withSentry(OrganisationApi);
