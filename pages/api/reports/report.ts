/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import mockReport from '../../../lib/mock-data/report';
import mockUsers from '../../../lib/mock-data/users';
import {
  NO_REPORT_ID,
  NO_REPORT,
  UNAUTHORISED,
  REPORT_FETCHING_ERROR,
  NO_COMPANY_ID,
  NO_CURRENCY,
  NO_ISO_CODE,
  NO_REPORT_FOUND
} from '../../../lib/utils/error-codes';
import { ReportSnippetType } from '../../../types/global';
import Report from '../../../lib/funcs/report';

import type { NextApiRequest, NextApiResponse } from 'next';

// Declaring function for readability with Sentry wrapper
const report = async (request: NextApiRequest, response: NextApiResponse) => {
  const session = await getSession({ req: request });

  // unauthenticated requests
  if (!session) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
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
        });
      }

      if (!body.currency) {
        return response.status(500).json({
          error: NO_CURRENCY,
          message: `No currency code provided.`
        });
      }

      if (!body.iso_code) {
        return response.status(500).json({
          error: NO_ISO_CODE,
          message: `No ISO code provided.`
        });
      }
      const report = await Report.createReport(body, `${session?.token}`);
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
            error: NO_REPORT_FOUND,
            message: `Error details: ${report?.details}`
          });
        }

        if (report.status === 500) {
          return response.status(500).json({
            error: REPORT_FETCHING_ERROR,
            message: `Error details: ${report?.details}`
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        error: REPORT_FETCHING_ERROR,
        message: `Report couldn't be generated for ${body?.company_id}`
      });
    }
  }

  if (isGet) {
    // extract report id
    const reportId = request.query.id;
    if (!reportId) {
      return response.status(500).json({
        error: NO_REPORT_ID,
        message: 'No report ID provided, please add report id.'
      });
    }

    const email = session?.user?.email;

    // to be replaced by backend call
    // @ts-ignore
    // eslint-disable-next-line security/detect-object-injection
    const user = mockUsers[email];
    const report = user?.reports?.find(
      (report: ReportSnippetType) => report.id === reportId
    );

    if (session.token && !report) {
      // console.log(session.token)
      const report = await Report.getExistingReport(
        `${reportId}`,
        `${session.token}`
      );
      // console.log(report)
      if (report.ok) {
        return response.status(200).json(report.report);
      }
    }

    if (!report) {
      return response
        .status(404)
        .json({ error: NO_REPORT, message: 'No report found with that ID.' });
    }

    const resReport = {
      ...report,
      ...mockReport
    };

    return response.status(200).json(resReport);
  }
};

export default withSentry(report);
