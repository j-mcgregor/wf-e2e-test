/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';

import authenticators from '../../lib/api-handler/authenticators';
import APIHandler from '../../lib/api-handler/handler';
import Company from '../../lib/funcs/company';
import { orbisAvailableSearchCountries } from '../../lib/settings/sme-calc.settings';

import type { NextApiRequest, NextApiResponse } from 'next';

const searchCompaniesApi = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'SEARCH_COMPANIES',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ query }) => {
      const searchQuery: string | undefined = query?.query
        ?.toString()
        ?.toLowerCase();
      const countryCode: string | undefined = query?.country
        ?.toString()
        ?.toLowerCase();

      const { skip, limit } = query;

      if (!countryCode) {
        return {
          defaultResponse: {
            status: 404,
            code: 'COUNTRY_CODE_REQUIRED',
            message: 'Country code is required.'
          }
        };
      }

      if (!searchQuery) {
        return {
          defaultResponse: {
            status: 200,
            ok: true,
            code: 'SEARCH_COMPANIES_SUCCESS',
            message: 'No search query provided.',
            data: []
          }
        };
      }

      if (countryCode === 'gb') {
        const searchResults = await Company.searchUKCompaniesHouse(
          process.env.COMPANIES_HOUSE_BASE64_KEY,
          `companies?q=${searchQuery}&start_index=${skip ?? 0}&items_per_page=${
            limit ?? 20
          }`
        );

        const reducedCompanies = Company.filterUKCompanyInformation(
          searchResults?.data?.items
        );

        if (searchResults.ok) {
          return {
            defaultResponse: {
              status: searchResults.status || 200,
              ok: true,
              code: 'SEARCH_COMPANIES_SUCCESS',
              message: 'Search successful.',
              data: {
                results: reducedCompanies,
                totalResults: searchResults.data?.total_results
              }
            }
          };
        } else {
          return {
            defaultResponse: {
              status: searchResults.status || 500,
              ok: false,
              code: 'SEARCH_COMPANIES_FAILURE',
              message: 'Search failed.'
            }
          };
        }
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

        return {
          defaultResponse: {
            status: 200,
            code: 'SEARCH_COMPANIES_SUCCESS',
            message: 'Search successful.',
            data: mappedCompanies
          }
        };
      } else {
        return {
          defaultResponse: {
            status: 404,
            code: 'INVALID_COUNTRY_CODE',
            message: 'Invalid country code.'
          }
        };
      }
    }
  });
};

export default withSentry(searchCompaniesApi);
