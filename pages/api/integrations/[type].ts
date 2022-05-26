import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth/jwt';
import {
  MethodTypes,
  RequestBodyType
} from '../../../lib/api-handler/api-handler';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';

export interface IntegrationFetcherOptions {
  url: string;
  method?: MethodTypes;
  body?: RequestBodyType;
  authentication: JWT | null;
}

export const integrationsFetcher = async ({
  url,
  method = 'GET',
  body,
  authentication
}: IntegrationFetcherOptions) =>
  await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${authentication?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: body && (body as BodyInit)
  });

const IntegrationsAPI = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'INTEGRATIONS',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ query, authentication }) => {
      const { type, orgId } = query;
      switch (type) {
        case 'codat-credentials':
          return {
            response: await integrationsFetcher({
              url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
              authentication
            })
          };
        default:
          return {
            defaultResponse: {
              code: 'TYPE_NOT_FOUND',
              message: 'GET request only accepts codat-credentials',
              status: 500
            }
          };
      }
    },
    PUT: async ({ query, authentication, body }) => {
      const { type, orgId } = query;
      if (type === 'codat-credentials') {
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
            method: 'PUT',
            authentication,
            body
          })
        };
      }
    },
    customErrors: [
      {
        status: 404,
        code: 'ORGANISATION_NOT_FOUND',
        message: 'Organisation not found',
        hasError: ({ res }) => res?.status === 404
      }
    ]
  });
};

export default withSentry(IntegrationsAPI);
