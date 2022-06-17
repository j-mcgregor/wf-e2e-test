import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
/**
 * IS THIS API PAGE NEEDED?
 */
export interface ReportsNewsApi {}

const NewsApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'REPORTS_NEWS'
    },
    GET: async ({ query }) => {
      const companyName = query?.company_name;

      return {
        response: await fetch(
          // add this to the request below ${countryCodeString} to restrict to a country
          `http://api.datanews.io/v1/headlines?q=${companyName}&size=10`,
          {
            method: 'GET',
            headers: {
              'x-api-key': `${process.env.DATA_NEWS_API_KEY}`
            }
          }
        )
      };
    }
  });
};

export default withSentry(NewsApi);
