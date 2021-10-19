import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import mockCompanies, { ShortCompany } from '../../lib/mock-data/companies';
import { UNAUTHORISED } from '../../lib/utils/error-codes';

import type { NextApiRequest, NextApiResponse } from 'next';

// Declaring function for readability with Sentry wrapper
const SearchCompanies = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const session = await getSession({ req: request });

  // unauthenticated requests
  if (!session) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    });
  }

  // extract search query
  const searchQuery: string = request.query.query.toString().toLowerCase();

  if (!searchQuery) {
    return response.status(200).json([]);
  }

  const filterCompanies = (companies: ShortCompany[], searchString: string) => {
    return companies.filter(company =>
      company.name.toLowerCase().includes(searchString)
    );
  };

  const filteredCompanies = filterCompanies(mockCompanies, searchQuery);

  return response.status(200).json(filteredCompanies);
};

export default withSentry(SearchCompanies);
