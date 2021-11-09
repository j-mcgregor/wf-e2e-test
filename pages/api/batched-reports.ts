import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import mockUsers, { MockCompanyNames } from '../../lib/mock-data/users';
import {
  NO_REPORT_ID,
  NO_REPORT,
  UNAUTHORISED,
  METHOD_NOT_ALLOWED
} from '../../lib/utils/error-codes';
import { BatchedReportType } from '../../types/global';

const randomValue = (amount: number) => {
  return Math.floor(Math.random() * amount);
};

import type { NextApiRequest, NextApiResponse } from 'next';

type CompanyReqType = {
  iso: string;
  company_id: string;
};

// Declaring function for readability with Sentry wrapper
const batchedReport = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<any> => {
  const session = await getSession({ req: request });

  // unauthenticated requests
  if (!session) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
  }

  const { method } = request;
  const isGet = method === 'GET';
  const isPost = method === 'POST';

  if (isPost) {
    const { name, company_list } = request.body;

    if (company_list.length > 0) {
      // create fake company reports
      const batched_reports = company_list.map((company: CompanyReqType) => {
        return {
          company_id: company.company_id,
          sme_z_score: `${randomValue(500)}`,
          company_name: Object.values(MockCompanyNames)[randomValue(5)],
          bond_rating: randomValue(2) > 1 ? 'A' : 'B',
          probability_of_default: `${randomValue(200)}`
        };
      });

      // setTimeout for demo purposes
      return setTimeout(() => {
        return response.status(200).json({
          data: {
            name,
            id: '21',
            batched_reports
          }
        });
      }, company_list.length * 500);
    }
  }

  if (isGet) {
    // extract report id
    const batchReportId = request.query.id;

    if (!batchReportId) {
      return response.status(500).json({
        error: NO_REPORT_ID,
        message: 'No report ID provided, please add batched report ID.'
      });
    }

    const email = session?.user?.email;

    // to be replaced by backend call
    // @ts-ignore
    const user = mockUsers[`${email}`];

    const batchReportJob = user?.batched_report_jobs?.find(
      (report: BatchedReportType) => report.id === Number(batchReportId)
    );

    if (!batchReportJob) {
      return response.status(404).json({
        error: NO_REPORT,
        message: 'No batched report job found with that ID.'
      });
    }

    return response.status(200).json(batchReportJob);
  }

  return response.status(500).json({
    error: METHOD_NOT_ALLOWED,
    message: 'Method not allowed, please use allowed method.'
  });
};

export default withSentry(batchedReport);
