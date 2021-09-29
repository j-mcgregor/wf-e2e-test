import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import mockReport from '../../lib/mock-data/report';
import mockUsers from '../../lib/mock-data/users';
import { NO_ID, NO_REPORT, UNAUTHORISED } from '../../lib/utils/error-codes';
import { Report } from '../../types/global';

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

  // extract report id
  const reportId = request.query.id;
  if (!reportId) {
    return response.status(500).json({
      error: NO_ID,
      message: 'No report ID provided, please add report id.'
    });
  }

  const email = session?.user?.email;

  // to be replaced by backend call
  // @ts-ignore
  // eslint-disable-next-line security/detect-object-injection
  const user = mockUsers[email];
  const report = user?.reports?.find(
    (report: Report) => report.id === Number(reportId)
  );

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
};

export default withSentry(report);
