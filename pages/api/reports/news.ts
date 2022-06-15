import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import News from '../../../lib/funcs/news';
import {
  COMPANY_NAME_REQUIRED,
  INVALID_REQUEST_TYPE,
  SEARCH_ERROR
} from '../../../lib/utils/error-codes';
import { returnUnauthorised } from '../../../lib/utils/error-handling';
import { ApiError, ApiResType } from '../../../types/global';

import type { NextApiHandler, NextApiResponse } from 'next';
import APIHandler from '../../../lib/api-handler/handler';
import authenticators from '../../../lib/api-handler/authenticators';

/**
 * IS THIS API PAGE NEEDED?
 */
export interface ReportsNewsApi {}

const NewsApi: NextApiHandler = async (request, response) => {
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
