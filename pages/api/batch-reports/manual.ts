/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport from '../../../lib/funcs/batch-reports';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  MISSING_DATA,
  UNAUTHORISED
} from '../../../lib/utils/error-codes';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiError } from '../../../types/global';
import type { BatchManualRequest } from '../../../types/batch-reports';

// Declaring function for readability with Sentry wrapper
const batchReports = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<any> => {
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    } as ApiError);
  }

  const { method } = request;
  const isPost = method === 'POST';
  if (isPost) {
    try {
      if (request?.body?.entities?.length > 0) {
        const batchReport: BatchManualRequest = {
          // they removed the .report_in requirement
          entities: request?.body?.entities || [],
          name: request?.body?.name || '',
          currency: request?.body?.currency || '',
          /** @deprecated */
          accounts_type: request?.body?.accounts_type
        };

        const fetchRes = await BatchReport.batchJobReportUpload(
          batchReport,
          `${token.accessToken}`
        );

        if (fetchRes.ok && fetchRes.report?.id) {
          return response.status(fetchRes.status).json({
            ok: true,
            batchReportId: fetchRes.report?.id
          });
        }

        return response.status(fetchRes.status).json({
          error: MISSING_DATA,
          message: fetchRes.details,
          ok: false
        } as ApiError);
      } else {
        return response.status(404).json({
          error: MISSING_DATA,
          message: 'No entities list provided',
          ok: false
        } as ApiError);
      }
    } catch (error) {
      return response.status(500).json({
        ok: false,
        error: GENERIC_API_ERROR,
        message: error
      } as ApiError);
    }
  }
  return response.status(500).json({
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed, please use allowed method.'
  } as ApiError);
};

export default withSentry(batchReports);
