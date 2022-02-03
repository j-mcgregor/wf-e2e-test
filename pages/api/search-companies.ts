/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';

import Company from '../../lib/funcs/company';
import { orbisAvailableSearchCountries } from '../../lib/settings/sme-calc.settings';
import {
  COUNTRY_CODE_REQUIRED,
  INVALID_COUNTRY_CODE,
  SEARCH_ERROR,
  UNAUTHORISED
} from '../../lib/utils/error-codes';
import { ApiError, ApiResType } from '../../types/global';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
// Declaring function for readability with Sentry wrapper
const SearchCompanies = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {

  const token = await getToken({ req: request, secret: `${process.env.NEXTAUTH_SECRET}` });

  // unauthenticated requests
  if (!token) {
    return response.status(403).json({
      error: UNAUTHORISED,
      message: 'Unauthorised api request, please login to continue.'
    } as ApiError);
  }

  // extract search query
  const searchQuery: string = request.query.query?.toString()?.toLowerCase();

  // country code required for adding different jurisdictions
  const countryCode: string = request.query?.country?.toString()?.toLowerCase();

  if (!countryCode) {
    return response.status(404).json({
      error: COUNTRY_CODE_REQUIRED,
      message:
        'Please provide a country code in order to correctly access the right database'
    } as ApiError);
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
  } else if (
    countryCode &&
    orbisAvailableSearchCountries.includes(countryCode)
  ) {
    // search orbis for matching companies in the country
    const searchResults = await Company.SearchOrbisCompanies(
      process.env.ORBIS_SEARCH_API_KEY,
      searchQuery,
      countryCode
    );

    // filter out those without a BVDID
    // reduce to a consistent format
    const reducedCompanies = Company.filterAndReduceEUCompanyInformation(
      searchResults?.data
    );

    // map to the required format to return
    const mappedCompanies = Company.mapEUCompanyDataToResponseFormat(
      reducedCompanies,
      countryCode
    );

    return response.status(200).json(mappedCompanies);
  } else {
    return response.status(404).json({
      error: INVALID_COUNTRY_CODE,
      message: 'Invalid country code.'
    } as ApiError);
  }
};

const handleSearchError = (results: ApiResType, response: NextApiResponse) => {
  if (!results || !results.ok) {
    return response.status(500).json({
      error: SEARCH_ERROR,
      message: 'Error when accessing API.'
    } as ApiError);
  }
};

export default withSentry(SearchCompanies);
