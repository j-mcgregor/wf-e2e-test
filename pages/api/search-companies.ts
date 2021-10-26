import { withSentry } from '@sentry/nextjs';
import { getSession } from 'next-auth/client';

import mockCompanies, { ShortCompany } from '../../lib/mock-data/companies';
import {
  UNAUTHORISED,
  SEARCH_ERROR,
  INVALID_COUNTRY_CODE,
  COUNTRY_CODE_REQUIRED
} from '../../lib/utils/error-codes';

import type { NextApiRequest, NextApiResponse } from 'next';
import Company, { CompanyResType } from '../../lib/funcs/company';

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
  const searchQuery: string = request.query.query?.toString()?.toLowerCase();

  // // country code required for adding different jurisdictions
  const countryCode: string = request.query?.country?.toString()?.toLowerCase();

  if (!countryCode) {
    return response.status(404).json({
      error: COUNTRY_CODE_REQUIRED,
      message:
        'Please provide a country code in order to correctly access the right database.'
    });
  }

  if (!searchQuery) {
    return response.status(200).json([]);
  }

  if (countryCode === 'gb') {
    const searchResults = await Company.searchUKCompaniesHouse(
      process.env.COMPANIES_HOUSE_BASE64_KEY,
      `companies?q=${searchQuery}`
    );

    //  handle error
    if (!searchResults || !searchResults.ok) {
      return handleSearchError(searchResults, response);
    }

    const reducedCompanies = Company.filterUKCompanyInformation(
      searchResults?.data?.items
    );

    return response.status(200).json(reducedCompanies);
  }

  const filterCompanies = (companies: ShortCompany[], searchString: string) => {
    return companies.filter(company =>
      company.name.toLowerCase().includes(searchString)
    );
  };
  // const filteredCompanies = filterCompanies(mockCompanies, searchQuery);

  // return response.status(200).json(filteredCompanies);

  return response
    .status(404)
    .json({ error: INVALID_COUNTRY_CODE, message: 'Invalid country code.' });
};

const handleSearchError = (
  results: CompanyResType,
  response: NextApiResponse
) => {
  if (!results || !results.ok) {
    return response.status(500).json({
      error: SEARCH_ERROR,
      message: 'Error when accessing Companies House API.'
    });
  }
};

export default withSentry(SearchCompanies);
