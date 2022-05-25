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
      switch (type) {
        case 'companies':
          return {
            response: await integrationsFetcher({
              url: `${process.env.WF_AP_ROUTE}/integrations/codat/companies`,
              method: 'GET',
              authentication
            })
          };
        case 'account-categorisation':
          const { companyId, connectionId } = query;
          return {
            response: await integrationsFetcher({
              url: `${process.env.WF_AP_ROUTE}/integrations/codat/account-categorisation?company_id=${companyId}&connection_id=${connectionId}`,
              method: 'GET',
              authentication
            })
          };
        case 'codat-credentials':
          const { orgId } = query;
          return {
            response: await integrationsFetcher({
              url: `${process.env.WF_AP_ROUTE}/integrations/codat/credentials/organisation/${orgId}`,
              method: 'GET',
              authentication
            })
          };
        default:
          return {
            defaultResponse: {
              code: 'TYPE_NOT_FOUND',
              message:
                'GET request only accepts companies, account-categorisation, codat-credentials',
              status: 500
            }
          };
      }
    },
    POST: async ({ query, authentication }) => {
      const {
        type,
        companyId,
        connectionId,
        parentId,
        periodLength,
        startMonth
      } = query;
      if (type === 'codat') {
        const baseUrl = `${process.env.WF_AP_ROUTE}/integrations/codat?company_id=${companyId}&connection_id=${connectionId}&parent_id=${parentId}&period_length=${periodLength}&start_month=${startMonth}`;
        return {
          response: await integrationsFetcher({
            url: startMonth ? `${baseUrl}&start_month=${startMonth}` : baseUrl,
            method: 'POST',
            authentication
          })
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
