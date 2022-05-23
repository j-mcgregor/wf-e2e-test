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
const { INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED } = StatusCodeConstants;

// @ts-ignore - both handlers return type User but are slightly different
export interface UserIndexApi extends GetFullUser, UpdateUser {}

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
    return returnUnauthorised(response, {});
  }
  const { method } = request;

  switch (method) {
    case 'GET':
      try {
        const result = await User.getFullUser(`${token?.accessToken}`, {});
        return response.status(result.status).json(result);
      } catch (error) {
        return response.status(INTERNAL_SERVER_ERROR).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.USER[INTERNAL_SERVER_ERROR]
          }),
          user: null
        });
      }
    case 'PUT':
      const json = await JSON.parse(request.body);

      // update user object
      const user = {
        full_name: json.full_name,
        email: json.email,
        preferences: json.preferences,
        ...(json.password ? { password: json.password } : {})
      } as UserType;

      try {
        // TODO: user passed here needs a type or it needs to be revised.
        // It has no type and updateUser needs a UserType type.
        const result = await User.updateUser(`${token?.accessToken}`, { user });

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

// const userAPIHandler = (
//   request: {
//     user?: UserType | undefined;
//     ok?: boolean | undefined;
//     status?: number | undefined;
//   },
//   response: NextApiResponse
// ) => {
//   switch (request.status) {
//     case 401:
//       return response.status(401).json({
//         ok: request.ok,
//         //user facing message
//         error: SIGNED_OUT,
//         //dev message
//         message:
//           'Access to the source is forbidden, user needs to sign in possibly.'
//       } as ApiError);
//     case 404:
//       return response.status(404).json({
//         ok: request.ok,
//         //user facing message
//         error: USER_404,
//         //dev message
//         message: "User not found: Can't find the user. Probably wrong id."
//       } as ApiError);
//     case 403:
//       return response.status(403).json({
//         ok: request.ok,
//         //user facing message
//         error: USER_NOT_AUTHORISED,
//         //dev message
//         message: "Forbidden: User doesn't have access to the source."
//       } as ApiError);
//     case 422:
//       response.status(422).json({
//         ok: request.ok,
//         //user facing message
//         error: USER_422,
//         //dev message
//         message:
//           'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
//       } as ApiError);
//       break;
//     case 500:
//       return response.status(500).json({
//         ok: request.ok,
//         //user facing message
//         error: USER_500,
//         //dev message
//         message:
//           "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
//       } as ApiError);
//     case 200:
//       return response.status(200).json({ ok: request.ok, data: request.user });
//     default:
//       return response.status(500).json({
//         ok: false,
//         error: GENERIC_API_ERROR,
//         message: 'Something went wrong.'
//       });
//   }
// };

export default withSentry(userIndexApi);
