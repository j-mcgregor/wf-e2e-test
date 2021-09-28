import { withSentry } from '@sentry/nextjs';

import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client'

// Declaring function for readability with Sentry wrapper
const passwordReset = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // example protected API end points
  // const session = await getSession({ req })

  // if (session) {
  //   res.send({ content: 'Tais is protected content. You can access this content because you are signed in.' })
  // } else {
  //   res.send({ error: 'You must be sign in to view the protected content on this page.' })
  // }
  // send request to FAST API to send password reset email

  return response.status(200).send('Success');
};

export default withSentry(passwordReset);
