/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import User from '../../../lib/funcs/user';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  SIGNED_OUT,
  UNAUTHORISED,
  USER_404,
  USER_422,
  USER_500
} from '../../../lib/utils/error-codes';
import { ApiError } from '../../../types/global';

import type { NextApiRequest, NextApiResponse } from 'next';

const UserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });
  // unauthenticated requests
  if (!session) {
    return res.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    } as ApiError);
  }
  const { method } = req;

  if (method === 'GET') {
    try {
      const fetchRes = await User.getReportsHistory(`${session.token}`);

      switch (fetchRes.status) {
        case 401:
          return res.status(401).json({
            ok: fetchRes.ok,
            //user facing message
            error: SIGNED_OUT,
            //dev message
            message:
              'Access to the source is forbidden, user needs to sign in possibly.'
          } as ApiError);
        case 404:
          return res.status(404).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_404,
            //dev message
            message: "User not found: Can't find the user. Probably wrong id."
          } as ApiError);
        case 422:
          res.status(422).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_422,
            //dev message
            message:
              'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
          } as ApiError);
          break;
        case 500:
          return res.status(500).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_500,
            //dev message
            message:
              "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
          } as ApiError);
        case 200:
          return res
            .status(200)
            .json({ ok: fetchRes.ok, data: fetchRes.reports });
      }
    } catch (err) {
      return res.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: err
      } as ApiError);
    }
  }

  return res.status(500).json({
    ok: false,
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed.'
  });
};

export default withSentry(UserHandler);
