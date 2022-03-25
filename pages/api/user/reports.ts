/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/react';

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

import type { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

export interface UserReportsApi {}

const userReportsApi: NextApiHandler<UserReportsApi> = async (
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
    } as ApiError);
  }
  const { method } = request;

  const { limit, skip, total } = request.query;

  const safeLimit = Number(limit);
  const safeSkip = Number(skip);

  if (method === 'GET') {
    try {
      const fetchRes = await User.getReportsHistory(
        `${token.accessToken}`,
        safeLimit,
        safeSkip
      );

      if (total && fetchRes.ok) {
        const total = fetchRes?.reports?.length;
        return response.status(200).json({
          total
        });
      }
      switch (fetchRes.status) {
        case 401:
          return response.status(401).json({
            ok: fetchRes.ok,
            //user facing message
            error: SIGNED_OUT,
            //dev message
            message:
              'Access to the source is forbidden, user needs to sign in possibly.'
          } as ApiError);
        case 404:
          return response.status(404).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_404,
            //dev message
            message: "User not found: Can't find the user. Probably wrong id."
          } as ApiError);
        case 422:
          response.status(422).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_422,
            //dev message
            message:
              'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
          } as ApiError);
          break;
        case 500:
          return response.status(500).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_500,
            //dev message
            message:
              "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
          } as ApiError);
        case 200:
          return response
            .status(200)
            .json({ ok: fetchRes.ok, data: fetchRes.reports });
      }
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

export default withSentry(userReportsApi);
