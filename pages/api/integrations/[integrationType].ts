import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth/jwt';
import {
  MethodTypes,
  RequestBodyType
} from '../../../lib/api-handler/api-handler';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { defaultHeaders } from '../../../lib/api-handler/headers';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

export interface IntegrationFetcherOptions {
  url: string;
  method?: MethodTypes;
  body?: RequestBodyType;
  authentication: JWT | null;
}

const codatCredentials = 'codat-credentials';

export const integrationsFetcher = async ({
  url,
  method = 'GET',
  body,
  authentication
}: IntegrationFetcherOptions) =>
  await fetchWrapper(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${authentication?.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
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
      const { integrationType, orgId } = query;
      if (integrationType === codatCredentials) {
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
            authentication
          })
        };
      } else {
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
      const { integrationType, orgId } = query;
      if (integrationType === codatCredentials) {
        // console.log('Type Body', body);
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
            method: 'PUT',
            authentication,
            body
          })
        };
      } else {
        return {
          defaultResponse: {
            code: 'TYPE_NOT_FOUND',
            message: 'PUT request only accepts codat-credentials',
            status: 500
          }
        };
      }
    },
    DELETE: async ({ query, authentication }) => {
      const { integrationType, orgId } = query;
      if (integrationType === codatCredentials) {
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
            method: 'DELETE',
            authentication
          })
        };
      } else {
        return {
          defaultResponse: {
            code: 'TYPE_NOT_FOUND',
            message: 'DELETE request only accepts codat-credentials',
            status: 500
          }
        };
      }
    },
    customErrors: [
      {
        status: 404,
        code: 'ORGANISATION_NOT_FOUND',
        message: 'Organisation not found',
        hasError: ({ res }) => res?.status === 404
      },
      {
        status: 400,
        code: 'ORGANISATION_INVALID_CREDENTIALS',
        message: 'Invalid Credentials',
        hasError: ({ res }) => res?.status === 400
      }
    ]
  });
};

export default withSentry(IntegrationsAPI);
