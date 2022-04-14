import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

import Organisation, {
  //   GetOrganisationUser,
  GetOrganisationUsers
} from '../../../../lib/funcs/organisation';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../../types/http-status-codes';

const { NOT_FOUND, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface OrganisationUsersApi extends GetOrganisationUsers {}

const OrganisationUsersApi: NextApiHandler<OrganisationUsersApi> = async (
  request,
  response
) => {
  const defaultNullProps = { users: null, total: null };
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
        if (type === 'users') {
          const result = await Organisation.getOrganisationUsers(
            `${token?.accessToken}`,
            { orgId, limit, skip }
          );
          return response.status(result.status).json(result);
        }
      } catch (error) {
        return response.status(NOT_FOUND).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.ORGANISATION[NOT_FOUND]
          }),
          ...defaultNullProps
        });
      }
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
