import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import {
  UNAUTHORISED,
  SEARCH_ERROR,
  INVALID_REQUEST_TYPE,
  COMPANY_NAME_REQUIRED
} from '../../../lib/utils/error-codes';

import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResType } from '../../../types/global';
import News from '../../../lib/funcs/news';
import newsHits from '../../../lib/mock-data/newsResponse';

// Declaring function for readability with Sentry wrapper
const NewsApi = async (request: NextApiRequest, response: NextApiResponse) => {
  const session = await getSession({ req: request });

  // unauthenticated requests
  // if (!session) {
  //   return response.status(403).json({
  //     error: UNAUTHORISED,
  //     message: 'Unauthorised api request, please login to continue.'
  //   });
  // }

  const isGet = request.method === 'GET';

  if (isGet) {
    // extract search query
    const companyName: string = request?.query?.company_name?.toString();
    const type: string = request?.query?.type?.toString();

    if (!companyName) {
      return response.status(404).json({
        error: COMPANY_NAME_REQUIRED,
        message:
          'Please provide a company name in order to make a valid request.'
      });
    }

    // handle demo mode
    if (type === 'demo') {
      return response.status(200).json({
        ok: true,
        data: newsHits
      });
    }

    const newResults = await News.getCompanyNews(companyName);

    //  handle search error
    if (!newResults || !newResults.ok) {
      return handleSearchError(newResults, response);
    }

    return response.status(200).json(newResults);
  }

  return response.status(404).json({
    error: INVALID_REQUEST_TYPE,
    message: 'Invalid request type. Please provide a valid request type.'
  });
};

const handleSearchError = (results: ApiResType, response: NextApiResponse) => {
  if (!results || !results.ok) {
    return response.status(500).json({
      error: SEARCH_ERROR,
      message: 'Error when accessing News API.'
    });
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
