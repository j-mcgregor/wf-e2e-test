import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

import Organisation, {
  GetOrganisationUserAndReports,
  GetOrganisationUsers
} from '../../../../lib/funcs/organisation';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../../types/http-status-codes';

const { NOT_FOUND, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface OrganisationTypeApi
  extends GetOrganisationUsers,
    GetOrganisationUserAndReports {}

const OrganisationUsersApi: NextApiHandler<OrganisationTypeApi> = async (
  request,
  response
) => {
  const defaultNullProps = {
    users: null,
    user: null,
    total: null,
    userReports: null
  };
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  if (!token) {
    return returnUnauthorised(response, {});
  }

  const { method } = request;

  const type: string = request?.query?.type?.toString();
  const orgId: string = request?.query?.orgId?.toString();
  const userId: string = request?.query?.userId?.toString();
  const limit: number = parseInt(request?.query?.limit?.toString()) || 10;
  const skip: number = parseInt(request?.query?.skip?.toString()) || 0;

  switch (method) {
    case 'GET':
      try {
        //   Route for getting all users in an organisation
        if (type === 'users') {
          const result = await Organisation.getOrganisationUsers(
            `${token?.accessToken}`,
            { orgId, limit, skip }
          );
          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
          //   Route for returning a single user of an organisation
        } else if (type === 'user') {
          const result = await Organisation.getOrganisationUserAndReports(
            `${token?.accessToken}`,
            { orgId, userId }
          );
          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        } else if (type === 'user-reports') {
          const result = await Organisation.getOrganisationUserAndReports(
            `${token?.accessToken}`,
            { orgId, userId, limit, skip, reports: true }
          );
          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        }
      } catch (error) {
        return response.status(NOT_FOUND).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.ORGANISATION[NOT_FOUND]
          }),
          ...defaultNullProps
        });
      }
      return response.status(NOT_FOUND).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.ORGANISATION[NOT_FOUND]
        }),
        ...defaultNullProps
      });
    case 'PUT':
      try {
        //   Route for updating a single user of an organisation
        if (type === 'user') {
          const result = await Organisation.updateOrganisationUser(
            `${token?.accessToken}`,
            { orgId, userId, body: request.body }
          );
          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        }
      } catch (error) {
        return response.status(NOT_FOUND).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.ORGANISATION[NOT_FOUND]
          }),
          ...defaultNullProps
        });
      }
      return response.status(NOT_FOUND).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.ORGANISATION[NOT_FOUND]
        }),
        ...defaultNullProps
      });
    default:
      return response.status(METHOD_NOT_ALLOWED).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
        }),
        ...defaultNullProps
      });
  }
};

export default OrganisationUsersApi;
