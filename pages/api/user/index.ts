import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler } from 'next';
import User from '../../../lib/funcs/user';

const XMLHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

const userIndexApi: NextApiHandler = (request, response) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'USER',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ authentication }) => {
      const Authorization = `Bearer ${authentication?.accessToken}`;

      const res = await fetchWrapper(`${process.env.WF_AP_ROUTE}/users/me`, {
        method: 'GET',
        headers: {
          ...XMLHeaders,
          Authorization
        }
      });

      const user = await res.json();

      return {
        defaultResponse: {
          status: res.status,
          code: `USER_${res.status}`,
          message: res.status < 300 ? 'Success' : 'Failed',
          data: {
            user: {
              ...User.giveDefaults(user)
            }
          }
        }
      };
    },
    PUT: async ({ body, authentication }) => {
      const Authorization = `Bearer ${authentication?.accessToken}`;

      const user = {
        full_name: body?.full_name,
        email: body?.email,
        preferences: body?.preferences,
        ...(body?.new_password ? { new_password: body?.new_password } : {}),
        ...(body?.old_password ? { old_password: body?.old_password } : {})
      };

      return {
        response: await fetchWrapper(`${process.env.WF_AP_ROUTE}/users/me`, {
          method: 'PUT',
          headers: {
            Authorization,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      };
    }
  });
};

export default withSentry(userIndexApi);
