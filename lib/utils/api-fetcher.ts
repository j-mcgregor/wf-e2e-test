/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable no-console */
import * as Sentry from '@sentry/nextjs';
import Axios from 'axios';

import config from '../../config';
import { ApiHandlerResponse } from '../api-handler/api-handler';
import { defaultHeaders } from '../api-handler/headers';

const ApiFetcher = async <T = any>(
  relativeUrl: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: object | null,
  headers?: {
    [key: string]: string;
  }
  // returnType?: 'json' | 'csv'
): Promise<ApiHandlerResponse<T>> => {
  try {
    if (method === 'GET') {
      const contentType =
        headers && headers['Content-Type']
          ? headers['Content-Type']
          : 'application/json';

      const res = await Axios.get<T, ApiHandlerResponse>(
        `${config.URL}${relativeUrl}`,
        {
          headers: {
            ...defaultHeaders,
            'Content-Type': contentType
          },
          ...(contentType === 'application/pdf'
            ? { responseType: 'blob', timeout: 30000 }
            : {})
        }
      );

      return res;

      // Most cases return JSON, but one endpoint returns CSV
      // eslint-disable-next-line sonarjs/no-small-switch
      // switch (returnType) {
      //   case 'csv':
      //     return res.text();
      //   default:
      //   }
    }

    const res = await Axios.request<T, ApiHandlerResponse>({
      baseURL: `${config.URL}${relativeUrl}`,
      method,
      headers: {
        ...defaultHeaders,
        ...headers
      },
      data: data && JSON.stringify(data)
    });

    return res;
  } catch (error: any) {
    // capture error on sentry
    Sentry.captureException(error);
    console.log(error);
    console.log(`Error making request to ${config.URL}${relativeUrl}`);

    return {
      ok: false,
      data: null,
      isError: true,
      message: error
    } as ApiHandlerResponse;
  }
};

export default ApiFetcher;
