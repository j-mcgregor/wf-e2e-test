/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable no-console */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import User, { GetReportsHistory } from '../../../lib/funcs/user';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';

const { INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface UserReportsApi extends GetReportsHistory {
  total?: number | null;
}

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
    return returnUnauthorised(response, {});
  }
  const { method } = request;

  const { limit, skip, total } = request.query;

  const safeLimit = Number(limit);
  const safeSkip = Number(skip);

  switch (method) {
    case 'GET':
      try {
        const result = await User.getReportsHistory(`${token.accessToken}`, {
          limit: safeLimit,
          skip: safeSkip
        });

        const totalReports = result?.reports?.length;

        return response.status(result.status).json({
          ...result,
          ...(total && { total: totalReports })
        });
      } catch (error) {
        return response.status(INTERNAL_SERVER_ERROR).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.USER[INTERNAL_SERVER_ERROR]
          }),
          reports: null
        });
      }
    default:
      return response.status(METHOD_NOT_ALLOWED).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
        }),
        reports: null
      });
  }
};

export default withSentry(userReportsApi);

// if (method === 'GET') {
//   try {
//     const result = await User.getReportsHistory(`${token.accessToken}`, {
//       limit: safeLimit,
//       skip: safeSkip
//     });

//     if (total && result.ok) {
//       const total = result?.reports?.length;
//       return response.status(200).json({
//         total
//       });
//     }
//     switch (result.status) {
//       case 401:
//         return response.status(401).json({
//           ok: result.ok,
//           //user facing message
//           error: SIGNED_OUT,
//           //dev message
//           message:
//             'Access to the source is forbidden, user needs to sign in possibly.'
//         } as ApiError);
//       case 404:
//         return response.status(404).json({
//           ok: result.ok,
//           //user facing message
//           error: USER_404,
//           //dev message
//           message: "User not found: Can't find the user. Probably wrong id."
//         } as ApiError);
//       case 422:
//         response.status(422).json({
//           ok: result.ok,
//           //user facing message
//           error: USER_422,
//           //dev message
//           message:
//             'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
//         } as ApiError);
//         break;
//       case 500:
//         return response.status(500).json({
//           ok: result.ok,
//           //user facing message
//           error: USER_500,
//           //dev message
//           message:
//             "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
//         } as ApiError);
//       case 200:
//         return response
//           .status(200)
//           .json({ ok: result.ok, data: result.reports });
//     }
//   } catch (err) {
//     return response.status(500).json({
//       ok: false,
//       error: GENERIC_API_ERROR,
//       message: err
//     } as ApiError);
//   }
// }
