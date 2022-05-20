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

/**
 * IS THIS API PAGE NEEDED?
 */
export interface ReportsNewsApi {}

// Declaring function for readability with Sentry wrapper
const NewsApi: NextApiHandler<ReportsNewsApi> = async (request, response) => {
  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return returnUnauthorised(response, {});
  }
  const isGet = request.method === 'GET';

  if (isGet) {
    // extract search query
    const companyName: string = request?.query?.company_name?.toString();

    // const country: string = request?.query?.country?.toString();
    const type: string = request?.query?.type?.toString();

    if (!companyName) {
      return response.status(404).json({
        error: COMPANY_NAME_REQUIRED,
        message:
          'Please provide a company name in order to make a valid request.'
      } as ApiError);
    }

    // removed for now as it's not helping results
    // const countryCode = countryCodes.find(x => x.name === country);

    const newResults = await News.getCompanyNews(
      companyName
      // countryCode?.code
    );

    //  handle search error
    if (!newResults || !newResults.ok) {
      return handleSearchError(newResults, response);
    }

    return response.status(200).json(newResults);
  }

  return response.status(404).json({
    error: INVALID_REQUEST_TYPE,
    message: 'Invalid request type. Please provide a valid request type.'
  } as ApiError);
};

const handleSearchError = (results: ApiResType, response: NextApiResponse) => {
  if (!results || !results.ok) {
    return response.status(500).json({
      error: SEARCH_ERROR,
      message: results.message || 'Error when accessing News API.'
    } as ApiError);
  }
};

export default withSentry(NewsApi);
