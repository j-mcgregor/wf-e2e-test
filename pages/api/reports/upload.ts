/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/react';

import Report from '../../../lib/funcs/report';
import {
  COMPANY_404,
  COMPANY_500,
  REPORT_FETCHING_ERROR,
  UNAUTHORISED,
  UNPROCESSABLE_ENTITY
} from '../../../lib/utils/error-codes';
import { ApiError } from '../../../types/global';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

// Declaring function for readability with Sentry wrapper
const report = async (request: NextApiRequest, response: NextApiResponse) => {
  const token = await getToken({ req: request, secret: `${process.env.NEXTAUTH_SECRET}` });

  // unauthenticated requests
  if (!token) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    } as ApiError);
  }

  const isPost = request.method === 'POST';

  if (isPost) {
    const body = await request?.body;

    try {
      const report = await Report.uploadReport(body, `${token.accessToken}`);

      if (report.ok) {
        return response
          .status(200)
          .json({ ok: true, reportId: report.report?.id });
      }

      // handle the 500 error when API Fails
      if (!report.ok) {
        if (report.status === 404) {
          return response.status(404).json({
            error: COMPANY_404,
            message: report?.details
          } as ApiError);
        }

        if (report.status === 422) {
          return response.status(422).json({
            error: UNPROCESSABLE_ENTITY,
            message: report?.details
          } as ApiError);
        }

        if (report.status === 500) {
          return response.status(500).json({
            error: COMPANY_500,
            message: report?.details
          } as ApiError);
        }
      }
    } catch (error) {
      return response.status(500).json({
        error: REPORT_FETCHING_ERROR,
        message: `Report couldn't be generated for ${body?.company_id}`
      } as ApiError);
    }
  }
};

export default withSentry(report);
