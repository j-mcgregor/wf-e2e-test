/* eslint-disable no-console */
import * as Sentry from '@sentry/nextjs';

import config from '../../config';

const fetcher = async (
  relativeUrl: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: object | null,
  headers?: object,
  returnType?: 'json' | 'csv'
) => {
  try {
    if (method === 'GET') {
      const res = await fetch(`${config.URL}${relativeUrl}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Most cases return JSON, but one endpoint returns CSV
      // eslint-disable-next-line sonarjs/no-small-switch
      switch (returnType) {
        case 'csv':
          return res.text();
        default:
          return res.json();
      }
    }

    const res = await fetch(`${config.URL}${relativeUrl}`, {
      method: method,
      body: data && JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    return res.json();
  } catch (error) {
    // capture error on sentry
    Sentry.captureException(error);
    console.log(error);
    console.log(`Error making request to ${config.URL}${relativeUrl}`);
    return {
      error: true,
      message: error
    };
  }
};

export default fetcher;
