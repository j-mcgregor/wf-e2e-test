import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import {
  MethodTypes,
  RequestBodyType
} from '../../../lib/api-handler/api-handler';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';

interface IntegrationFetcherOptions {
  url: string;
  method: MethodTypes;
  body?: RequestBodyType;
  authentication: JWT | null;
}

const integrationsFetcher = async ({
  url,
  method,
  body,
  authentication
}: IntegrationFetcherOptions) =>
  await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${authentication?.accessToken}`,
      'Content-Type': 'application/json'
    }
    // body: body && (body as BodyInit)
  });

const IntegrationsAPI = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  return APIHandler(request, response, {
    config: {
      sourceType: 'INTEGRATIONS',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ query, authentication }) => {
      const { type } = query;
      if (type === 'companies') {
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/companies`,
            method: 'GET',
            authentication
          })
        };
      } else if (type === 'account-categorisation') {
        const { companyId, connectionId } = query;
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/account-categorisation?company_id=${companyId}&connection_id=${connectionId}`,
            method: 'GET',
            authentication
          })
        };
      } else if (type === 'codat-credentials') {
        const { orgId } = query;
        return {
          response: await integrationsFetcher({
            url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
            method: 'GET',
            authentication
          })
        };
      } else {
        return {
          defaultResponse: null
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
        status: 406,
        code: 'NOTHING_TO_SYNCHRONISE',
        message: 'Cannot find any company to synchronise.',
        hasError: ({ res }) => false
      }
    ]
  });
};

export default IntegrationsAPI;
