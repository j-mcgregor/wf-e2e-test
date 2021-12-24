/* eslint-disable no-console */
import config from '../../config';
import * as Sentry from '@sentry/nextjs';

const fetcher = async (
  relativeUrl: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: object
) => {
  try {
    if (method === 'GET') {
      const res = await fetch(`${config.URL}${relativeUrl}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return res.json();
    }

    try {
      JSON.stringify(data);
    } catch (e) {
      console.log('ERROR', e);
    }

    const res = await fetch(`${config.URL}${relativeUrl}`, {
      method: method,
      body: data && JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (error) {
    console.log('ERROR', error);

    // capture error on sentry
    Sentry.captureException(error);

    console.log(`Error making request to ${config.URL}${relativeUrl}`);
    return {
      error: true,
      message: error
    };
  }
};

export default fetcher;
