/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import BatchReport from '../../../lib/funcs/batch-reports';
import {
  METHOD_NOT_ALLOWED,
  NO_REPORT,
  NO_REPORT_ID,
  UNAUTHORISED
} from '../../../lib/utils/error-codes';

import type { ApiError } from '../../../types/global';
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

  // GET BY ID
  if (isGet) {
    // extract report id
    const batchReportId = request.query.id;

    if (!batchReportId) {
      return response.status(500).json({
        error: NO_REPORT_ID,
        message: 'No report ID provided, please add batched report ID.'
      } as ApiError);
    }

    try {
      const fetchRes = await BatchReport.getBatchReportsById(
        `${token.accessToken}`,
        batchReportId.toString()
      );

      if (fetchRes.ok) {
        return response.status(fetchRes.status).json({
          ok: true,
          batchReport: fetchRes.batchReport
        });
      }
    } catch (error) {
      return response.status(404).json({
        error: NO_REPORT,
        message: 'No batched report job found with that ID.'
      } as ApiError);
    }
  }

  return response.status(500).json({
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed, please use allowed method.'
  } as ApiError);
};

export default withSentry(batchReports);
