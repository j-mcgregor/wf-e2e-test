/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  SIGNED_OUT,
  USER_404,
  USER_422,
  USER_500
} from '../../lib/utils/error-codes';

import { UserType } from '../../types/global';

const UserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const user: UserType = req.body as UserType;

  if (method === 'PUT' && user) {
    console.log('req', req.body);
    console.log('id', req.query.id);
    try {
      const fetchRes = await fetch(
        `https://618cb05261c8d0001780ff4b.mockapi.io/users/${
          req.body?.id || req.query?.id
        }`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: req.body
        }
      );

      const json = await fetchRes.json();

      console.log('json', json);

      switch (fetchRes.status) {
        case 403:
          return res.status(403).json({
            okay: false,
            //user facing message
            error: SIGNED_OUT,
            //dev message
            message:
              'Access to the source is forbidden, user needs to sign in possibly.'
          });
        case 404:
          return res.status(404).json({
            okay: false,
            //user facing message
            error: USER_404,
            //dev message
            message: "User not found: Can't find the user. Probably wrong id."
          });
        case 422:
          res.status(422).json({
            ok: false,
            //user facing message
            error: USER_422,
            //dev message
            message:
              'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
          });
          break;
        case 500:
          return res.status(500).json({
            ok: false,
            //user facing message
            error: USER_500,
            //dev message
            message:
              "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
          });
        case 200:
          return res.status(200).json({ ok: true, data: json });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ ok: false, error: GENERIC_API_ERROR, message: err });
    }
  }

  return res
    .status(500)
    .json({
      ok: false,
      error: METHOD_NOT_ALLOWED,
      message: 'Method not allowed.'
    });
};

export default withSentry(UserHandler);
