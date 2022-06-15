import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

import type { NextApiHandler } from 'next';

const userBookmarkApi: NextApiHandler = async (request, response) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'USER_BOOKMARK',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ authentication }) => {
      return {
        response: await await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/me/bookmarks`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
      };
    },
    POST: async ({ query, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/me/bookmarks/${query?.reportId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
      };
    },
    DELETE: async ({ query, authentication }) => {
      return {
        response: await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/users/me/bookmarks/${query?.reportId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
      };
    }
  });
};

// const userBookmarkApi: NextApiHandler<UserBookmarkApi> = async (
//   request,
//   response
// ) => {
//   const token = await getToken({
//     req: request,
//     secret: `${process.env.NEXTAUTH_SECRET}`
//   });

//   // unauthenticated requests
//   if (!token) {
//     return returnUnauthorised(response, {});
//   }

//   const { method } = request;

//   switch (method) {
//     case 'GET':
//       try {
//         const result = await User.getUserBookmarks(`${token.accessToken}`, {});

//         return response.status(result.status).json(result);
//       } catch (err) {
//         return response.status(INTERNAL_SERVER_ERROR).json({
//           ...makeApiHandlerResponseFailure({
//             message: errorsBySourceType.USER[INTERNAL_SERVER_ERROR]
//           }),
//           bookmarks: null
//         });
//       }
//     case 'POST':
//     case 'DELETE':
//       let all_bookmarks;

//       try {
//         const result = await User.bookmarkReport(`${token.accessToken}`, {
//           reportId: `${request.query.reportId}`,
//           method
//         });

//         // add in all bookmarks on post request
//         if (request.query.return_all) {
//           const user_bookmarks = await User.getUserBookmarks(
//             `${token.accessToken}`,
//             {}
//           );
//           all_bookmarks = user_bookmarks.bookmarks;
//         }

//         return response.status(result.status).json({
//           bookmarks: null,
//           ...result,
//           ...(request.query.return_all && { bookmarks: all_bookmarks })
//         });
//       } catch (error) {
//         return response.status(INTERNAL_SERVER_ERROR).json({
//           ...makeApiHandlerResponseFailure({
//             message: errorsBySourceType.USER[INTERNAL_SERVER_ERROR]
//           }),
//           bookmarks: null
//         });
//       }

//     default:
//       return response.status(METHOD_NOT_ALLOWED).json({
//         ...makeApiHandlerResponseFailure({
//           message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
//         }),
//         bookmarks: null
//       });
//   }
// };

export default withSentry(userBookmarkApi);

// switch (fetchRes.status) {
//   case 401:
//     return response.status(401).json({
//       ok: fetchRes.ok,
//       //user facing message
//       error: SIGNED_OUT,
//       //dev message
//       message:
//         'Access to the source is forbidden, user needs to sign in possibly.'
//     } as ApiError);
//   case 404:
//     return response.status(404).json({
//       ok: fetchRes.ok,
//       //user facing message
//       error: USER_404,
//       //dev message
//       message: "User not found: Can't find the user. Probably wrong id."
//     } as ApiError);
//   case 422:
//     return response.status(422).json({
//       ok: fetchRes.ok,
//       //user facing message
//       error: USER_422,
//       //dev message
//       message:
//         'Unprocessable Entity: The server has received the data, understands the request but was unable to complete it.'
//     } as ApiError);
//   case 500:
//     return response.status(500).json({
//       ok: fetchRes.ok,
//       //user facing message
//       error: USER_500,
//       //dev message
//       message:
//         "Internal Server Error: Didn't get anything usable from the server, chances are the server didn't respond."
//     } as ApiError);
//   case 201: // created (post)
//     return response.status(201).json({
//       bookmarks: all_bookmarks,
//       ok: true
//     });
//   case 204: // no content (delete)
//     return response.status(response.statusCode).json({
//       ok: fetchRes.ok,
//       data: fetchRes.details,
//       bookmarks: all_bookmarks
//     });
// }
