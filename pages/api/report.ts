import { getSession } from 'next-auth/client';
import mockUsers from '../../lib/mock-data/users';
import { NextApiRequest, NextApiResponse } from 'next';
import mockReport from '../../lib/mock-data/report';
import { Report } from '../../types/global';

export default async function report(
  request: NextApiRequest,

  response: NextApiResponse
) {
  const reportId = request.query.id;

  const session = await getSession({ req: request });

  const email = session?.user?.email;

  const user = mockUsers[email];

  const report = user.reports.find(
    (report: Report) => report.id === Number(reportId)
  );

  const resReport = {
    ...report,
    ...mockReport
  };

  // example protected API end points
  // const session = await getSession({ req })

  // if (session) {
  //   res.send({ content: 'Tais is protected content. You can access this content because you are signed in.' })
  // } else {
  //   res.send({ error: 'You must be sign in to view the protected content on this page.' })
  // }
  // send request to FAST API to send password reset email

  return response.status(200).json(resReport);
}
