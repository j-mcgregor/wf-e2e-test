import { withSentry } from '@sentry/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../../lib/utils/fetchWrapper';

const OrganisationUserReportsApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'ORGANISATION_USER'
    },
    GET: async ({ query, authentication }) => {
      const { userId, orgId, skip, limit } = query;

      return {
        response: await fetchWrapper(
          `${
            process.env.WF_AP_ROUTE
          }/organisations/${orgId}/users/${userId}/reports?_start=${skip}&_end=${
            parseInt(`${skip}`) + parseInt(`${limit}`)
          }`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        )
      };
    }
  });
};

export default withSentry(OrganisationUserReportsApi);
