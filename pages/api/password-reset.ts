/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable security/detect-object-injection */
import { withSentry } from '@sentry/nextjs';

import User, { ForgotPassword, ResetPassword } from '../../lib/funcs/user';
import { errorsBySourceType } from '../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../types/http-status-codes';

import type { NextApiHandler } from 'next';
import { VALID_PASSWORD } from '../../lib/utils/regexes';

const { BAD_REQUEST, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface PasswordResetApi extends ForgotPassword, ResetPassword {}

// Declaring function for readability with Sentry wrapper
const passwordReset: NextApiHandler<PasswordResetApi> = async (
  request,
  response
) => {
  const { email } = request.query;
  const { token, newPassword } = request.body;
  switch (request.method) {
    case 'GET':
      /** @action REQUEST EMAIL TO CHANGE EMAIL ADDRESS  */
      if (email && typeof email === 'string') {
        const result = await User.forgotPassword(email, {});

        return response.status(result.status).json(result);
      }

      return response.status(BAD_REQUEST).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[BAD_REQUEST]
        }),
        msg: null
      });
    case 'POST':
      if (token && newPassword) {
        /* @TODO update with new error handling */
        if (!VALID_PASSWORD.test(newPassword)) {
          return response.status(BAD_REQUEST).json({
            ...makeApiHandlerResponseFailure({
              message: errorsBySourceType.GENERAL[BAD_REQUEST]
            }),
            msg: null
          });
        }
        const result: ResetPassword = await User.resetPassword(token, {
          newPassword
        });

        return response.status(200).json(result);
      }

      return response.status(BAD_REQUEST).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.USER[BAD_REQUEST]
        }),
        msg: null
      });
    default:
      return response.status(METHOD_NOT_ALLOWED).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
        }),
        msg: null
      });
  }
};

export default withSentry(passwordReset);
