/* eslint-disable security/detect-object-injection */
import { withSentry } from '@sentry/nextjs';

import User, { ForgotPassword, ResetPassword } from '../../lib/funcs/user';
import { errorsBySourceType } from '../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../types/http-status-codes';

import type { NextApiHandler } from 'next';

const { BAD_REQUEST, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface PasswordResetApi extends ForgotPassword, ResetPassword {}

// Declaring function for readability with Sentry wrapper
const passwordReset: NextApiHandler<PasswordResetApi> = async (
  request,
  response
) => {
  const { email } = request.query;
  const { token, newPassword } = request.body;

  if (request.method === 'GET') {
    /** @action REQUEST EMAIL TO CHANGE EMAIL ADDRESS  */
    if (email && typeof email === 'string') {
      const result = await User.forgotPassword(email, {});

      return response.status(result.status).json(result);
    }

    /** @action CHANGE PASSWORD THROUGH THE SETTINGS */
    if (token && newPassword) {
      const result: ResetPassword = await User.resetPassword(
        token,
        newPassword
      );

      return response.status(200).json(result);
    }

    return response.status(BAD_REQUEST).json({
      ...makeApiHandlerResponseFailure({
        message: errorsBySourceType.GENERAL[BAD_REQUEST]
      }),
      msg: null
    });
  }
  return response.status(METHOD_NOT_ALLOWED).json({
    ...makeApiHandlerResponseFailure({
      message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
    }),
    msg: null
  });
};

export default withSentry(passwordReset);
