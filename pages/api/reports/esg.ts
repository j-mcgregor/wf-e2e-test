import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/react';

import {
  COMPANY_WEBSITE_REQUIRED,
  INVALID_REQUEST_TYPE,
  SEARCH_ERROR,
  UNAUTHORISED
} from '../../../lib/utils/error-codes';

import type { NextApiRequest, NextApiResponse } from 'next';
import ESG from '../../../lib/funcs/esg';
import { ApiError, ApiResType } from '../../../types/global';
import { getToken } from 'next-auth/jwt';

// Declaring function for readability with Sentry wrapper
const ESGApi = async (request: NextApiRequest, response: NextApiResponse) => {

  const token = await getToken({ req: request, secret: `${process.env.NEXTAUTH_SECRET}` });

  // unauthenticated requests
  if (!token && process.env.NODE_ENV !== 'development') {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    } as ApiError);
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
    } as ApiError);
  }

  if (type === 'demo') {
    return response.status(200).json({
      data: [
        {
          name: 'Higher_Education',
          score: 0.9
        },
        {
          name: 'Computer_Hardware',
          score: 0.31
        },
        {
          name: 'Business_Supplies_and_Equipment',
          score: 0.13
        }
      ]
    });
  }

  // allows us to add other ESG API endpoints
  // at a later date
  if (type === 'website') {
    const searchResults = await ESG.analyseWebsite(companyName, companyWebsite);

    //  handle search error
    if (!searchResults || !searchResults.ok) {
      return handleSearchError(searchResults, response);
    }

    // take the top X results
    const matches = ESG.topXMatches(searchResults.data, 3);

    return response.status(200).json({ data: matches });
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
      message: 'Error when accessing ESG API.'
    } as ApiError);
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
