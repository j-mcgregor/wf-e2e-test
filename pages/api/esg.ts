import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import {
  UNAUTHORISED,
  SEARCH_ERROR,
  COMPANY_WEBSITE_REQUIRED,
  INVALID_REQUEST_TYPE
} from '../../lib/utils/error-codes';

import type { NextApiRequest, NextApiResponse } from 'next';
import ESG from '../../lib/funcs/esg';
import { ApiResType } from '../../types/global';

// Declaring function for readability with Sentry wrapper
const ESGApi = async (request: NextApiRequest, response: NextApiResponse) => {
  const session = await getSession({ req: request });

  // unauthenticated requests
  if (!session) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
  }

  // extract search query
  const companyName: string = request?.query?.company_name?.toString();
  const companyWebsite: string = request?.query?.company_website?.toString();
  const type: string = request?.query?.type?.toString();

  if (!companyWebsite && !companyName) {
    return response.status(404).json({
      error: COMPANY_WEBSITE_REQUIRED,
      message:
        'Please provide a country website and company name in order to make a valid request.'
    });
  }

  // allows us to add other ESG API endpoints
  // at a later date
  if (type === 'website') {
    const searchResults = await ESG.analyseWebsite(companyName, companyName);

    //  handle search error
    if (!searchResults || !searchResults.ok) {
      return handleSearchError(searchResults, response);
    }

    // take the top X results
    const matches = ESG.topXMatches(searchResults.data, 3);

    return response.status(200).json(matches);
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
      message: 'Error when accessing ESG API.'
    });
  }
};

export default withSentry(ESGApi);

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
