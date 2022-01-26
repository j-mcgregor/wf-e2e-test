import { NextApiResponse } from 'next';
import { ApiResType } from '../../types/global';
import { SEARCH_ERROR } from './error-codes';
import { isJsonString } from './json-helpers';

export const handleSearchError = (
  results: ApiResType,
  response: NextApiResponse
) => {
  const isJson = isJsonString(results?.message);

  if (!results || !results.ok) {
    return response.status(500).json({
      error: SEARCH_ERROR,
      message: isJson ? results.message : 'Error when accessing API.'
    });
  }
};
