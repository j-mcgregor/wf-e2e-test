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

import type { NextApiHandler, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export interface UserIndexApi {}

const userIndexApi: NextApiHandler<UserIndexApi> = async (
  request,
  response
) => {
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
  }
  const { method } = request;

  if (method === 'GET') {
    const request = await User.getFullUser(`${token?.accessToken}`);
    return userAPIHandler(request, response);
  }

  if (method === 'PUT') {
    const json = await JSON.parse(request.body);

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
      const request = await User.updateUser(user, `${token?.accessToken}`);
      return userAPIHandler(request, response);
    } catch (err) {
      return response.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: err
      } as ApiError);
    }
  }

  return response.status(500).json({
    ok: false,
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed.'
  });
};

const userAPIHandler = (
  request: {
    user?: UserType | undefined;
    ok?: boolean | undefined;
    status?: number | undefined;
  },
  response: NextApiResponse
) => {
  switch (request.status) {
    case 401:
      return response.status(401).json({
        ok: request.ok,
        //user facing message
        error: SIGNED_OUT,
        //dev message
        message:
          'Access to the source is forbidden, user needs to sign in possibly.'
      } as ApiError);
    case 404:
      return response.status(404).json({
        ok: request.ok,
        //user facing message
        error: USER_404,
        //dev message
        message: "User not found: Can't find the user. Probably wrong id."
      } as ApiError);
    case 403:
      return response.status(403).json({
        ok: request.ok,
        //user facing message
        error: USER_403,
        //dev message
        message: "Forbidden: User doesn't have access to the source."
      } as ApiError);
    case 422:
      response.status(422).json({
        ok: request.ok,
        //user facing message
        error: USER_422,
        //dev message
        message:
          'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
      } as ApiError);
      break;
    case 500:
      return response.status(500).json({
        ok: request.ok,
        //user facing message
        error: USER_500,
        //dev message
        message:
          "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
      } as ApiError);
    case 200:
      return response.status(200).json({ ok: request.ok, data: request.user });
    default:
      return response.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: 'Something went wrong.'
      });
  }
};

export default withSentry(userIndexApi);
