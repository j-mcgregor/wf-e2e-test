/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable no-case-declarations */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import User, { GetFullUser, UpdateUser } from '../../../lib/funcs/user';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../../lib/utils/http-helpers';
import { UserType } from '../../../types/global';
import { StatusCodeConstants } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';
const { INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED, BAD_REQUEST } =
  StatusCodeConstants;

// @ts-ignore - both handlers return type User but are slightly different
export interface UserIndexApi extends GetFullUser, UpdateUser {}

const userPasswordApi: NextApiHandler<UserIndexApi> = async (
  request,
  response
) => {
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return returnUnauthorised(response, {});
  }
  const { method } = request;

  switch (method) {
    case 'PUT':
      const user = await JSON.parse(request.body);

      if (!user.old_password) {
        return response.status(BAD_REQUEST).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.USER[BAD_REQUEST]
          }),
          user: null
        });
      }

      try {
        // TODO: user passed here needs a type or it needs to be revised.
        // It has no type and updateUser needs a UserType type.
        const result = await User.updateUser(`${token?.accessToken}`, {
          user
        });

        if (result.status === 400) {
          return response.status(BAD_REQUEST).json({
            ...makeApiHandlerResponseFailure({
              message: errorsBySourceType.USER[BAD_REQUEST]
            }),
            user: null
          });
        }

        return response.status(result.status).json({
          ...result,
          user: null
        });
      } catch (error) {
        return response.status(INTERNAL_SERVER_ERROR).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.USER[INTERNAL_SERVER_ERROR]
          }),
          user: null
        });
      }
    default:
      return response.status(METHOD_NOT_ALLOWED).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
        }),
        user: null
      });
  }
};

export default withSentry(userPasswordApi);
