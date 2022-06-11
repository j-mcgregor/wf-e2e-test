import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { integrationsFetcher } from '../[integrationType]';
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
      const { codatType, orgId, companyId, connectionId } = query;
      switch (codatType) {
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
        codatType,
        companyId,
        connectionId,
        parentId,
        periodLength,
        startMonth,
        numberOfDirectors,
        numberOfSubsidiaries,
        industrySectorCode
      } = query;
      if (codatType === 'codat') {
        const noParentParams = [
          ['number_of_directors', numberOfDirectors],
          ['number_of_subsidiaries', numberOfSubsidiaries],
          ['industry_sector_code', industrySectorCode]
        ]
          .map(param => {
            const [key, value] = param;
            if (value) {
              return `${key}=${value}`;
            }
          })
          .join('&');

        const baseUrl = `${
          process.env.WF_AP_ROUTE
        }/integrations/codat?company_id=${companyId}&connection_id=${connectionId}&period_length=${periodLength}${
          parentId ? `&parent_id=${parentId}` : `&${noParentParams}`
        }`;
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
