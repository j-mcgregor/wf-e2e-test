/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import Report from '../../../lib/funcs/report';
import mockReport from '../../../lib/mock-data/report';
import mockUsers from '../../../lib/mock-data/users';
import {
  COMPANY_404,
  COMPANY_500,
  NO_COMPANY_ID,
  NO_CURRENCY,
  NO_ISO_CODE,
  NO_REPORT,
  NO_REPORT_ID,
  REPORT_FETCHING_ERROR,
  UNAUTHORISED,
  VALIDATION_ERROR
} from '../../../lib/utils/error-codes';
import { ApiError, ReportSnippetType } from '../../../types/global';

import type { NextApiRequest, NextApiResponse } from 'next';
// Declaring function for readability with Sentry wrapper
const report = async (request: NextApiRequest, response: NextApiResponse) => {
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

  const isGet = request.method === 'GET';

  const isPost = request.method === 'POST';

  if (isPost) {
    const body = await request?.body;

    try {
      if (!body.company_id) {
        return response.status(500).json({
          error: NO_COMPANY_ID,
          message: `No company ID provided.`
        } as ApiError);
      }

      if (!body.currency) {
        return response.status(500).json({
          error: NO_CURRENCY,
          message: `No currency code provided.`
        } as ApiError);
      }

      if (!body.iso_code) {
        return response.status(500).json({
          error: NO_ISO_CODE,
          message: `No ISO code provided.`
        } as ApiError);
      }
      const report = await Report.createReport(body, `${token?.accessToken}`);
      // const tempReport = await Report.getExistingReport('fafd5ee8-8bd1-4c11-aea8-457e862bc06a', `${session?.token}`)

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

  if (isGet) {
    // extract report id
    const reportId = request.query.id;

    if (!reportId) {
      return response.status(500).json({
        error: NO_REPORT_ID,
        message: 'No report ID provided, please add report id.'
      } as ApiError);
    }

    /* ***** GET REPORT AS CSV ******* */

    if (request?.query?.export === 'csv') {
      try {
        const res = await Report.getReportShortCsv(
          `${reportId}`,
          `${token.accessToken}`
        );
        if (res.ok) {
          return response.status(200).json(res.csv);
        }
      } catch (error) {
        return response.status(422).json({
          error: VALIDATION_ERROR,
          message: 'Unable to process the request'
        } as ApiError);
      }
    } else if (request?.query?.export === 'csv-full') {
      try {
        const res = await Report.getReportFullCsv(
          `${reportId}`,
          `${token.accessToken}`
        );
        if (res.ok) {
          return response.status(200).json(res.csv);
        }
      } catch (error) {
        return response.status(422).json({
          error: VALIDATION_ERROR,
          message: 'Unable to process the request'
        } as ApiError);
      }
    } else {
      /* ***** GET REPORT FROM USER ******* */

      const email = token?.email;

      // to be replaced by backend call
      // @ts-ignore
      // eslint-disable-next-line security/detect-object-injection
      const user = mockUsers[email];

      const report = user?.reports?.find(
        (report: ReportSnippetType) => report.id === reportId
      );

      if (token.accessToken && !report) {
        const report = await Report.getExistingReport(
          `${reportId}`,
          `${token.accessToken}`
        );

        // console.log(report)
        if (report.ok) {
          return response.status(200).json(report.report);
        }
      }

      if (!report) {
        return response.status(404).json({
          error: NO_REPORT,
          message: 'No report found with that ID.'
        } as ApiError);
      }

      const resReport = {
        ...report,
        ...mockReport
      };

      return response.status(200).json(resReport);
    }
  }
};

export default withSentry(report);
