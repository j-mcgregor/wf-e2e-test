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
      sourceType: 'INTEGRATIONS_CODAT',
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
    POST: async ({ query, body, authentication }) => {
      if (!body) {
        return {
          defaultResponse: {
            code: 'NO_BODY',
            status: 400,
            message: 'No body provided'
          }
        };
      }

      const codatType = `${query.codatType}`;

      const {
        companyId,
        connectionId,
        parentId,
        periodLength,
        startMonth,
        numberOfDirectors,
        numberOfSubsidiaries,
        industrySectorCode,
        website
      } = body;

      if (codatType === 'codat') {
        // Get non-Null parameters used in stage 4
        // These are all optional, which is why we need to filter them before sending
        const params = [
          ['number_of_directors', numberOfDirectors],
          ['number_of_subsidiaries', numberOfSubsidiaries],
          ['industry_sector_code', industrySectorCode],
          ['website', website]
        ]
          .map(param => {
            const [key, value] = param;
            if (value !== null && value !== undefined && value !== '') {
              return `${key}=${value}`;
            }
          })
          .filter(param => param);

        // If the report was generated within a parent, just include the parent id
        // Otherwise, include the optional parameters gernerated above
        const hasParentParams = parentId
          ? `&parent_id=${parentId}`
          : params.length > 0
          ? `&${params.join('&')}`
          : '';

        const baseUrl = `${process.env.WF_AP_ROUTE}/integrations/codat?company_id=${companyId}&connection_id=${connectionId}&period_length=${periodLength}${hasParentParams}`;

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
        code: 'INTEGRATIONS_CODAT_406',
        message: 'Cannot find any company to synchronise.',
        hasError: ({ res }) => res?.status === 406
      },
      {
        status: 404,
        code: 'INTEGRATIONS_CODAT_404',
        message: 'Country code of the company found in Codat is not supported.',
        hasError: ({ res }) => res?.status === 404
      },
      {
        status: 422,
        code: 'INTEGRATIONS_CODAT_422',
        message: 'Invalid currency.',
        hasError: ({ res }) => res?.status === 422
      }
    ]
  });
};

export default withSentry(CodatIntegrationsAPI);
