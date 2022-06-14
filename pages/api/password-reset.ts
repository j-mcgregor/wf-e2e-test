/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable security/detect-object-injection */
import { withSentry } from '@sentry/nextjs';

import authenticators from '../../lib/api-handler/authenticators';
import APIHandler from '../../lib/api-handler/handler';
import { fetchWrapper } from '../../lib/utils/fetchWrapper';
import { VALID_PASSWORD } from '../../lib/utils/regexes';

import type { NextApiHandler } from 'next';

const XMLHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

const returnMissingQueryResponse = (queryType: string) => {
  return {
    defaultResponse: {
      status: 400,
      code: `${queryType.replace(' ', '_').toUpperCase()}_REQUIRED`,
      message: `${queryType.charAt(0).toUpperCase()} is required.`
    }
  };
};

const passwordReset: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'PASSWORD_RESET',
      authenticate: authenticators.NextAuth,
      publicMethods: {
        GET: true,
        POST: true
      }
    },
    GET: async ({ query }) => {
      const { email } = query;

      if (email && typeof email === 'string') {
        return {
          response: await fetchWrapper(
            `${process.env.WF_AP_ROUTE}/password-recovery/${email}`,
            {
              method: 'POST',
              headers: {
                ...XMLHeaders
              }
            }
          )
        };
      }
      return returnMissingQueryResponse('email');
    },
    POST: async ({ body }) => {
      const { token, newPassword } = body as {
        token?: string;
        newPassword?: string;
      };

      if (!token) {
        return returnMissingQueryResponse('token');
      }

      if (!newPassword) {
        return returnMissingQueryResponse('new password');
      }

      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/reset-password/`,
          {
            method: 'POST',
            body: JSON.stringify({ token, new_password: newPassword })
          }
        )
      };
    }
  });
};

export default withSentry(passwordReset);
