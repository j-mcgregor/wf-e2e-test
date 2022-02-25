/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport from '../../../lib/funcs/batch-reports';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  MISSING_DATA,
  NO_REPORT,
  NO_REPORT_ID,
  UNAUTHORISED
} from '../../../lib/utils/error-codes';

import type { ApiError } from '../../../types/global';
import type { BatchAutoRequest } from '../../../types/batch-reports';
import type { NextApiRequest, NextApiResponse } from 'next';

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
  const isGet = method === 'GET';
  const isPost = method === 'POST';

  if (isPost) {
    try {
      if (request?.body?.entities?.length > 0) {
        const batchReport: BatchAutoRequest = {
          entities: request?.body?.entities || [],
          name: request?.body?.name || '',
          accounts_type: request?.body?.accounts_type || 0,
          currency: request?.body?.currency || ''
        };

        const fetchRes = await BatchReport.createBatchReport(
          batchReport,
          `${token.accessToken}`
        );

        if (fetchRes.ok && fetchRes.report?.id) {
          return response.status(fetchRes.status).json({
            ok: true,
            batchReportId: fetchRes.report?.id
          });
        }
      } else {
        return response.status(404).json({
          error: MISSING_DATA,
          message: 'No company list provided',
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

  if (isGet) {
    try {
      const fetchRes = await BatchReport.getAllBatchReports(
        `${token.accessToken}`
      );

      if (fetchRes.ok) {
        return response.status(fetchRes.status).json({
          ok: true,
          batchReports: fetchRes.batchReports
        });
      }
    } catch (error) {
      return response.status(404).json({
        error: NO_REPORT,
        message: "Can't find any batch reports"
      } as ApiError);
    }
  }

  return response.status(500).json({
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed, please use allowed method.'
  } as ApiError);
};

export default withSentry(batchReports);
