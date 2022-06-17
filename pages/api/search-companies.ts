/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';

import authenticators from '../../lib/api-handler/authenticators';
import APIHandler from '../../lib/api-handler/handler';
import Company from '../../lib/funcs/company';
import { orbisAvailableSearchCountries } from '../../lib/settings/sme-calc.settings';

import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchWrapper } from '../../lib/utils/fetchWrapper';

const searchCompaniesApi = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      sourceType: 'SEARCH_COMPANIES',
      authenticate: authenticators.NextAuth
    },
    GET: async ({ query, authentication }) => {
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

        return {
          defaultResponse: {
            status: searchResults.ok ? 200 : 404,
            ok: searchResults.ok || false,
            code: searchResults.ok
              ? 'SEARCH_COMPANIES_SUCCESS'
              : 'SEARCH_COMPANIES_ERROR',
            message: searchResults.ok ? 'Search successful.' : 'Search failed.',
            data: {
              results: reducedCompanies,
              totalResults: searchResults.data?.total_results
            }
          }
        };
      } else if (countryCode) {
        return {
          response: await fetchWrapper(
            `${process.env.WF_AP_ROUTE}/reports/search-companies?country=${countryCode}&query=${searchQuery}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${authentication?.accessToken}`
              }
            }
          )
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
