import { withSentry } from '@sentry/nextjs';

import User from '../../lib/funcs/user';
import {
  GENERIC_API_ERROR,
  VALID_EMAIL_REQUIRED
} from '../../lib/utils/error-codes';
import { ApiError } from '../../types/global';

import type { NextApiHandler } from 'next';

export interface PasswordResetApi {}

// Declaring function for readability with Sentry wrapper
const passwordReset: NextApiHandler<PasswordResetApi> = async (
  request,
  response
) => {
  const { email } = request.query;
  const { token, newPassword } = request.body;
  if (email && typeof email === 'string') {
    const status = await User.forgotPassword(email);
    if (status.ok) {
      return response.status(200).json(status);
    }
    if (!status.ok) {
      return response
        .status(404)
        .json({ error: GENERIC_API_ERROR } as ApiError);
    }
  }

  if (token && newPassword) {
    const status = await User.resetPassword(token, newPassword);
    if (status.ok && status.msg) {
      return response.status(200).json(status);
    }

    if (!status.ok) {
      return response
        .status(404)
        .json({ error: GENERIC_API_ERROR } as ApiError);
    }
  }
  return response.status(404).json({ error: VALID_EMAIL_REQUIRED } as ApiError);
};

export default withSentry(passwordReset);
