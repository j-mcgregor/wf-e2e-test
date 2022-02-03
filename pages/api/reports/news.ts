import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/react';

import News from '../../../lib/funcs/news';
import newsHits from '../../../lib/mock-data/newsResponse';
import {
  COMPANY_NAME_REQUIRED,
  INVALID_REQUEST_TYPE,
  SEARCH_ERROR,
  UNAUTHORISED
} from '../../../lib/utils/error-codes';
import { ApiError, ApiResType } from '../../../types/global';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
// Declaring function for readability with Sentry wrapper
const NewsApi = async (request: NextApiRequest, response: NextApiResponse) => {
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

    // handle demo mode
    if (type === 'demo') {
      return response.status(200).json({
        ok: true,
        data: newsHits
      });
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

// example website ESG response
/*
[
  {
    "name": "Capital_Markets",
    "score": 0.5
  },
  {
    "name": "Information_Services",
    "score": 0.22
  },
  {
    "name": "Financial_Services",
    "score": 0.07
  }
]
*/
