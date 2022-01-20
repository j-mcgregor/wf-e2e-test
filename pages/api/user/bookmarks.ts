/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  SIGNED_OUT,
  UNAUTHORISED,
  USER_404,
  USER_422,
  USER_500
} from '../../../lib/utils/error-codes';
import User from '../../../lib/funcs/user';
import { getSession } from 'next-auth/client';

const allowedMethods = ['GET', 'POST', 'DELETE'];

const BookmarkHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req: req });
  // unauthenticated requests
  if (!session) {
    return res.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
  }
  const { method } = req;

  if (!allowedMethods.includes(`${method}`)) {
    return res.status(500).json({
      ok: false,
      error: METHOD_NOT_ALLOWED,
      message: 'Method not allowed.'
    });
  }

  if (method === 'GET') {
    try {
      const fetchRes = await User.getUserBookmarks(`${session.token}`);

      return res.status(fetchRes.status).json({
        ok: fetchRes.ok,
        bookmarks: fetchRes.bookmarks
      });
    } catch (err) {
      return res
        .status(500)
        .json({ ok: false, error: GENERIC_API_ERROR, message: err });
    }
  }

  if (allowedMethods.includes(`${method}`)) {
    let all_bookmarks;
    try {
      const fetchRes = await User.bookmarkReport(
        `${req.query.reportId}`,
        `${session.token}`,
        method as any
      );

      // add in all bookmarks on post request
      if (req.query.return_all) {
        const user_bookmarks = await User.getUserBookmarks(`${session.token}`);
        all_bookmarks = user_bookmarks.bookmarks;
      }

      switch (fetchRes.status) {
        case 401:
          return res.status(401).json({
            ok: fetchRes.ok,
            //user facing message
            error: SIGNED_OUT,
            //dev message
            message:
              'Access to the source is forbidden, user needs to sign in possibly.'
          });
        case 404:
          return res.status(404).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_404,
            //dev message
            message: "User not found: Can't find the user. Probably wrong id."
          });
        case 422:
          return res.status(422).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_422,
            //dev message
            message:
              'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
          });
        case 500:
          return res.status(500).json({
            ok: fetchRes.ok,
            //user facing message
            error: USER_500,
            //dev message
            message:
              "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
          });
        case 201: // created (post)
          return res.status(201).json({
            bookmarks: all_bookmarks,
            ok: true
          });
        case 204: // no content (delete)
          return res
            .status(res.statusCode)
            .json({
              ok: fetchRes.ok,
              data: fetchRes.details,
              bookmarks: all_bookmarks
            });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ ok: false, error: GENERIC_API_ERROR, message: err });
    }
  }
};

export default withSentry(BookmarkHandler);
