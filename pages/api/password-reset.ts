import { withSentry } from '@sentry/nextjs';

import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../lib/funcs/user';
import {
  GENERIC_API_ERROR,
  VALID_EMAIL_REQUIRED
} from '../../lib/utils/error-codes';

// Declaring function for readability with Sentry wrapper
const passwordReset = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { email } = request.query;
  const { token, newPassword } = request.body;
  if (email && typeof email === 'string') {
    const status = await User.forgotPassword(email);
    if (status.ok) {
      return response.status(200).json(status);
    }
    if (!status.ok) {
      return response.status(404).json({ error: GENERIC_API_ERROR });
    }
  }

  if (token && newPassword) {
    const status = await User.resetPassword(token, newPassword);
    if (status.ok && status.msg) {
      return response.status(200).json(status);
    }

    if (!status.ok) {
      return response.status(404).json({ error: GENERIC_API_ERROR });
    }
  }
  return response.status(404).json({ error: VALID_EMAIL_REQUIRED });
};

export default withSentry(passwordReset);
