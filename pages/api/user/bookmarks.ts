/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
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
const allowedMethods = ['GET', 'POST', 'DELETE'];

export interface UserBookmarkApi {}

const userBookmarkApi: NextApiHandler<UserBookmarkApi> = async (
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

  if (!allowedMethods.includes(`${method}`)) {
    return response.status(500).json({
      ok: false,
      error: METHOD_NOT_ALLOWED,
      message: 'Method not allowed.'
    } as ApiError);
  }

  if (method === 'GET') {
    try {
      const fetchRes = await User.getUserBookmarks(`${token.accessToken}`);

      return response.status(fetchRes.status).json({
        ok: fetchRes.ok,
        bookmarks: fetchRes.bookmarks
      });
    } catch (err) {
      return response.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: err
      } as ApiError);
    }
  }

  if (allowedMethods.includes(`${method}`)) {
    let all_bookmarks;
    try {
      const fetchRes = await User.bookmarkReport(
        `${request.query.reportId}`,
        `${token.accessToken}`,
        method as any
      );

      // add in all bookmarks on post request
      if (request.query.return_all) {
        const user_bookmarks = await User.getUserBookmarks(
          `${token.accessToken}`
        );
        all_bookmarks = user_bookmarks.bookmarks;
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
          return response.status(422).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_422,
            //dev message
            message:
              'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
          } as ApiError);
        case 500:
          return response.status(500).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_500,
            //dev message
            message:
              "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
          } as ApiError);
        case 201: // created (post)
          return response.status(201).json({
            bookmarks: all_bookmarks,
            ok: true
          });
        case 204: // no content (delete)
          return response.status(response.statusCode).json({
            ok: fetchRes.ok,
            data: fetchRes.details,
            bookmarks: all_bookmarks
          });
      }
    } catch (err) {
      return response.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: err
      } as ApiError);
    }
  }
};

export default withSentry(userBookmarkApi);
