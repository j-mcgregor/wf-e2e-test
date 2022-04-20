import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import Organisation, {
  GetOrganisation
} from '../../../../lib/funcs/organisation';
import { NO_COMPANY_ID } from '../../../../lib/utils/error-codes';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../../lib/utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeMissingArgsResponse
} from '../../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../../types/http-status-codes';

import type { NextApiHandler } from 'next';

const { NOT_FOUND, METHOD_NOT_ALLOWED } = StatusCodeConstants;

export interface OrganisationIndexApi extends GetOrganisation {}

const OrganisationAPI: NextApiHandler<OrganisationIndexApi> = async (
  request,
  response
) => {
  const defaultNullProps = { organisation: null };
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  if (!token) {
    return returnUnauthorised(response, {});
  }

  const { method } = request;

  // get the company id from the query
  const orgId: string = request?.query?.orgId?.toString();

  // return an error if no company id is provided
  if (!orgId) {
    return makeMissingArgsResponse(
      response,
      NO_COMPANY_ID,
      'No organisation ID provided.',
      defaultNullProps
    );
  }

  switch (method) {
    case 'GET':
      try {
        const result = await Organisation.getOrganisation(
          `${token?.accessToken}`,
          { orgId }
        );
        return response.status(result.status).json(result);
      } catch (error) {
        return response.status(NOT_FOUND).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.ORGANISATION[NOT_FOUND]
          }),
          ...defaultNullProps
        });
      }

    case 'PUT':
      try {
        const result = await Organisation.updateOrganisation(
          `${token?.accessToken}`,
          { orgId, body: request.body }
        );
        return response.status(result.status).json(result);
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

export default withSentry(OrganisationAPI);
