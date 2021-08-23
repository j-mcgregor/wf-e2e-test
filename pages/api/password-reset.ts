import { NextApiRequest, NextApiResponse } from "next";

export default async function passwordReset(request: NextApiRequest, response: NextApiResponse) {

  // send request to FAST API to send password reset email
  
  return response.status(200).send('Success')

}
