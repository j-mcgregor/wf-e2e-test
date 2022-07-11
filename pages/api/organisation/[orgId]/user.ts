import { withSentry } from '@sentry/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../../lib/utils/fetchWrapper';

const OrganisationUserApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'ORGANISATION_USER'
    },
    GET: async ({ query, authentication }) => {
      const userId = query.userId;
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        )
      };
    },
    POST: async ({ query, authentication, body }) => {
      const { orgId } = query;

      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/organisations/${orgId}/users`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            },
            body: JSON.stringify({
              ...body,
              is_active: true,
              is_superuser: false,
              organisation_id: orgId,
              preferences: {
                defaults: {
                  locale: 'en-GB',
                  currency: 'GBP',
                  home_page: 'dashboard',
                  reporting_country: 'GB'
                },
                communication: {
                  batch_report_email: true,
                  service_updates: true,
                  company_updates: false
                }
              }
            })
          }
        )
      };
    },
    PATCH: async ({ query, authentication, body }) => {
      const { orgId, userId } = query;
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/organisations/${orgId}/users/${userId}`,
          {
            method: 'PATCH',
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

export default withSentry(OrganisationUserApi);
