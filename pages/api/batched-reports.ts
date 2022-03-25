/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import mockBatchReport from '../../lib/mock-data/mockBatchReport';
import mockUsers, { MockCompanyNames } from '../../lib/mock-data/users';
import { batchReport } from '../../lib/settings/report.settings';
import {
  GENERIC_API_ERROR,
  METHOD_NOT_ALLOWED,
  MISSING_DATA,
  NO_REPORT,
  NO_REPORT_ID,
  UNAUTHORISED
} from '../../lib/utils/error-codes';

import type { ApiError, BatchedReportType } from '../../types/global';
import type { NextApiHandler } from 'next';

const randomValue = (amount: number) => {
  return Math.floor(Math.random() * amount);
};

type CompanyReqType = {
  iso: string;
  company_id: string;
};

// DEMO FUNCTION

export interface BatchedReportsApi {}
// Declaring function for readability with Sentry wrapper
const batchedReport: NextApiHandler<BatchedReportsApi> = async (
  request,
  response
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
      const company_list = request?.body?.company_list || [];
      const name = request?.body?.name || '';

      if (company_list.length > 0) {
        // setTimeout for demo purposes
        return setTimeout(() => {
          return response.status(200).json({
            ok: true,
            data: {
              name,
              id: '21'
              // batched_reports
            }
          });
        }, company_list.length * batchReport.averageTime);
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
    // extract report id
    const batchReportId = request.query.id;

    if (!batchReportId) {
      return response.status(500).json({
        error: NO_REPORT_ID,
        message: 'No report ID provided, please add batched report ID.'
      } as ApiError);
    }

    if (request.query.demo === 'true') {
      // create fake company reports
      const batched_reports = mockBatchReport.company_list.map(
        (company: CompanyReqType) => {
          return {
            company_id: company.company_id,
            sme_z_score: `${randomValue(500)}`,
            company_name: Object.values(MockCompanyNames)[randomValue(5)],
            bond_rating: randomValue(3) > 1 ? 'A' : 'B',
            probability_of_default: `${randomValue(200)}`
          };
        }
      );
      return response.status(200).json({
        ok: true,
        id: batchReportId,
        name: 'Mock Api Report',
        company_list: batched_reports
      });
    }

    const email = token?.email;

    // to be replaced by backend call
    // @ts-ignore
    const user = mockUsers[`${email}`];

    const batchReportJob = user?.batchReportJobs?.find(
      (report: BatchedReportType) => report.id === Number(batchReportId)
    );

    if (!batchReportJob) {
      return response.status(404).json({
        error: NO_REPORT,
        message: 'No batched report job found with that ID.'
      } as ApiError);
    }

    return response.status(200).json(batchReportJob);
  }

  return response.status(500).json({
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed, please use allowed method.'
  } as ApiError);
};

export default withSentry(batchedReport);
