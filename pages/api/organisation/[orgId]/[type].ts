import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

import Organisation, {
  GetOrganisationUserAndReports,
  GetOrganisationUsers,
  PatchOrganisationUser,
  PostOrganisationUser
} from '../../../../lib/funcs/organisation';
import { ORG_404 } from '../../../../lib/utils/error-codes';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../../lib/utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeMissingArgsResponse
} from '../../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../../types/http-status-codes';

const { NOT_FOUND, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface OrganisationTypeApi
  extends GetOrganisationUsers,
    GetOrganisationUserAndReports,
    PatchOrganisationUser,
    PostOrganisationUser {}

const OrganisationUsersApi: NextApiHandler<OrganisationTypeApi> = async (
  request,
  response
) => {
  const defaultNullProps = {
    users: null,
    user: null,
    organisation: null,
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

  if (!['users', 'user', 'user-reports'].includes(type)) {
    return makeMissingArgsResponse(
      response,
      ORG_404,
      'Endpoint not found. The route should be either /users, /user or /user-reports',
      defaultNullProps
    );
  }

  try {
    if (method === 'GET' && type === 'users') {
      const result = await Organisation.getOrganisationUsers(
        `${token?.accessToken}`,
        { orgId, limit, skip }
      );
      return response.status(result.status).json({
        ...defaultNullProps,
        ...result
      });
    }

    if (method === 'GET' && type === 'user') {
      const result = await Organisation.getOrganisationUserAndReports(
        `${token?.accessToken}`,
        { orgId, userId }
      );
      return response.status(result.status).json({
        ...defaultNullProps,
        ...result
      });
    }

    if (method === 'POST' && type === 'user') {
      const result = await Organisation.postOrganisationUser(
        `${token?.accessToken}`,
        { orgId, body: request.body }
      );
      return response.status(result.status).json({
        ...defaultNullProps,
        ...result
      });
    }

    if (method === 'PATCH' && type === 'user') {
      const result = await Organisation.patchOrganisationUser(
        `${token?.accessToken}`,
        { orgId, userId, body: request.body }
      );
      return response.status(result.status).json({
        ...defaultNullProps,
        ...result
      });
    }

    if (method === 'GET' && type === 'user-reports') {
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

  return response.status(METHOD_NOT_ALLOWED).json({
    ...makeApiHandlerResponseFailure({
      message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
    }),
    ...defaultNullProps
  });
};

export default withSentry(OrganisationUsersApi);
