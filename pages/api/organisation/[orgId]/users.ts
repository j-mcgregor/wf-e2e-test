import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';
import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../../lib/utils/fetchWrapper';

const OrganisationUsersApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'ORGANISATION_USERS'
    },
    GET: async ({ query, authentication }) => {
      const { orgId, skip, limit } = query;

      const safeSkip = parseInt(`${skip}`) || 0;
      const safeLimit = parseInt(`${limit}`) || 10;

      const res = await fetchWrapper(
        `${
          process.env.WF_AP_ROUTE
        }/organisations/${orgId}/users?_start=${safeSkip}&_end=${
          safeSkip + safeLimit
        }&_sort=full_name&_order=asc`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authentication?.accessToken}`
          }
        }
      );

      const json = await res.json();
      return {
        defaultResponse: {
          data: {
            users: json,
            total: parseInt(res?.headers?.get('X-Total-Count') || '0')
          },
          status: res.status,
          code: `ORGANISATION_USERS_${res.status}`,
          message:
            res.status < 300
              ? 'Successfully fetched organisation users'
              : 'Failed to fetch organisation users'
        }
      };
    }
  });
};

export default withSentry(OrganisationUsersApi);
