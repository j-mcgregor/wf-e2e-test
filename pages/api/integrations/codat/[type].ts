import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { integrationsFetcher } from '../[type]';
import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';

const CodatIntegrationsAPI = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'INTEGRATIONS',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ query, authentication }) => {
      const { type, orgId, companyId, connectionId } = query;
      switch (type) {
        case 'companies':
          return {
            response: await integrationsFetcher({
              url: `${process.env.WF_AP_ROUTE}/integrations/codat/companies`,
              authentication
            })
          };
        case 'account-categorisation':
          return {
            response: await integrationsFetcher({
              url: `${process.env.WF_AP_ROUTE}/integrations/codat/account-categorisation?company_id=${companyId}&connection_id=${connectionId}`,
              authentication
            })
          };
        default:
          return {
            defaultResponse: {
              code: 'TYPE_NOT_FOUND',
              message:
                'GET request only accepts companies, account-categorisation',
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
        const baseUrl = `${process.env.WF_AP_ROUTE}/integrations/codat?company_id=${companyId}&connection_id=${connectionId}&parent_id=${parentId}&period_length=${periodLength}`;
        return {
          response: await integrationsFetcher({
            url: startMonth ? `${baseUrl}&start_month=${startMonth}` : baseUrl,
            method: 'POST',
            authentication
          })
        };
      }
    },
    customErrors: [
      {
        status: 406,
        code: 'NOTHING_TO_SYNCHRONISE',
        message: 'Cannot find any company to synchronise.',
        hasError: ({ res }) => res?.status === 406
      },
      {
        status: 404,
        code: 'CREDENTIALS_NOT_FOUND',
        message: 'Organisation does not have integration credentials.',
        hasError: ({ res }) => res?.status === 404
      }
    ]
  });
};

export default withSentry(CodatIntegrationsAPI);
