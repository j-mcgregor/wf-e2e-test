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
      try {
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
        return {
          defaultResponse: {
            status: 400,
            code: 'EMAIL_REQUIRED',
            message: 'Email is required.'
          }
        };
      } catch (e) {
        return {
          defaultResponse: {
            status: 500,
            code: 'PASSWORD_RESET_FAILURE',
            message: 'Password reset failed.'
          }
        };
      }
    },
    POST: async ({ body }) => {
      try {
        const { token, newPassword } = body as {
          token?: string;
          newPassword?: string;
        };

        if (!token) {
          return {
            defaultResponse: {
              status: 400,
              code: 'TOKEN_REQUIRED',
              message: 'Token is required.'
            }
          };
        }

        if (!newPassword) {
          return {
            defaultResponse: {
              status: 400,
              code: 'NEW_PASSWORD_REQUIRED',
              message: 'New password is required.'
            }
          };
        }

        if (token && newPassword) {
          if (!VALID_PASSWORD.test(newPassword)) {
            return {
              defaultResponse: {
                status: 422,
                code: 'INVALID_PASSWORD',
                message:
                  'Password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase letter and one special character.'
              }
            };
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
      } catch (e) {
        return {
          defaultResponse: {
            status: 500,
            code: 'PASSWORD_RESET_FAILURE',
            message: 'Password reset failed.'
          }
        };
      }
    }
  });
};

export default withSentry(passwordReset);
