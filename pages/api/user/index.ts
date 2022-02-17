/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';

import User from '../../../lib/funcs/user';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  SIGNED_OUT,
  UNAUTHORISED,
  USER_403,
  USER_404,
  USER_422,
  USER_500
} from '../../../lib/utils/error-codes';
import { ApiError, UserType } from '../../../types/global';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const UserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return res.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
  }
  const { method } = req;

  if (method === 'GET') {
    const req = await User.getFullUser(`${token?.accessToken}`);
    return userAPIHandler(req, res);
  }

  if (method === 'PUT') {
    const json = await JSON.parse(req.body);

    // update user object
    const user = {
      full_name: json.full_name,
      email: json.email,
      preferences: json.preferences,
      ...(json.password ? { password: json.password } : {})
    };

    try {
      // TODO: user passed here needs a type or it needs to be revised.
      // It has no type and updateUser needs a UserType type.
      //@ts-ignore
      const req = await User.updateUser(user, `${token?.accessToken}`);
      return userAPIHandler(req, res);
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

const userAPIHandler = (
  req: {
    user?: UserType | undefined;
    ok?: boolean | undefined;
    status?: number | undefined;
  },
  res: NextApiResponse
) => {
  switch (req.status) {
    case 401:
      return res.status(401).json({
        ok: req.ok,
        //user facing message
        error: SIGNED_OUT,
        //dev message
        message:
          'Access to the source is forbidden, user needs to sign in possibly.'
      } as ApiError);
    case 404:
      return res.status(404).json({
        ok: req.ok,
        //user facing message
        error: USER_404,
        //dev message
        message: "User not found: Can't find the user. Probably wrong id."
      } as ApiError);
    case 403:
      return res.status(403).json({
        ok: req.ok,
        //user facing message
        error: USER_403,
        //dev message
        message: "Forbidden: User doesn't have access to the source."
      } as ApiError);
    case 422:
      res.status(422).json({
        ok: req.ok,
        //user facing message
        error: USER_422,
        //dev message
        message:
          'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
      } as ApiError);
      break;
    case 500:
      return res.status(500).json({
        ok: req.ok,
        //user facing message
        error: USER_500,
        //dev message
        message:
          "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
      } as ApiError);
    case 200:
      return res.status(200).json({ ok: req.ok, data: req.user });
    default:
      return res.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: 'Something went wrong.'
      });
  }
};

export default withSentry(UserHandler);
