/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import Report, { UploadReport } from '../../../lib/funcs/report';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../lib/utils/error-handling';
import { makeApiHandlerResponseFailure } from '../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';

const { INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED } = StatusCodeConstants;

/** @COMPLETE */

export interface ReportsUploadApi extends UploadReport {}

// Declaring function for readability with Sentry wrapper
const report: NextApiHandler<ReportsUploadApi> = async (request, response) => {
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return returnUnauthorised(response, { report: null });
  }

  switch (request.method) {
    case 'POST':
      const body = await request?.body;

      try {
        const result = await Report.uploadReport(`${token.accessToken}`, {
          report: body
        });
        return response.status(result.status).json(result);
      } catch (error) {
        return response.status(INTERNAL_SERVER_ERROR).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.REPORT[INTERNAL_SERVER_ERROR]
          }),
          reportId: null
        });
      }
    default:
      return response.status(METHOD_NOT_ALLOWED).json({
        ...makeApiHandlerResponseFailure({
          message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
        }),
        reportId: null
      });
  }
};

export default withSentry(report);
