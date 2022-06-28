import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler } from 'next';

const userBookmarkApi: NextApiHandler = async (request, response) => {
  const contentType = 'application/json';

  APIHandler(request, response, {
    config: {
      sourceType: 'USER_BOOKMARK',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/me/bookmarks`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': contentType
            }
          }
        )
      };
    },
    POST: async ({ query, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/me/bookmarks/${query?.reportId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': contentType
            }
          }
        )
      };
    },
    DELETE: async ({ query, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/me/bookmarks/${query?.reportId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': contentType
            }
          }
        )
      };
    }
  });
};

export default withSentry(userBookmarkApi);
