/* eslint-disable no-console */
import config from '../../config';
import {
  BaseHandlerResponse,
  FetcherOptions,
  SuccessResponseType
} from './api-handler';
import { defaultHeaders } from './headers';
import { makeErrorObject } from './make-reponses';

export const fetcher = async (
  relativeUrl: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  data?: object | null,
  headers?: object
) => {
  try {
    if (method === 'GET') {
      const res = await fetch(`${config.URL}${relativeUrl}`, {
        headers: {
          ...defaultHeaders
        }
      });

      return res.json();
    }

    const res = await fetch(`${config.URL}${relativeUrl}`, {
      method: method,
      body: data && JSON.stringify(data),
      headers: {
        ...defaultHeaders,
        ...headers
      }
    });
    return res.json();
  } catch (error) {
    // capture error on sentry
    console.log(error);
    console.log(`Error making request to ${config.URL}${relativeUrl}`);
    return {
      error: true,
      message: error
    };
  }
};

// // not a big fan of types that extend null like BaseHandlerResponse
// export const oldFetcher = async <T extends BaseHandlerResponse>({
//   url,
//   options,
//   sourceType,
//   token,
//   baseUrl = ''
// }: {
//   url: string;
//   baseUrl?: string;
//   options?: FetcherOptions;
//   sourceType: string;
//   token?: string;
//   // eslint-disable-next-line sonarjs/cognitive-complexity
// }): Promise<SuccessResponseType<T> | ReturnType<typeof makeErrorObject>> => {
//   const { method = 'GET', data, headers = {} } = options || {};

//   const contentType = headers['Content-Type'] || 'application/json';
//   const shouldBeRelative = !url.includes('http');
//   try {
//     const response = await fetch(`${shouldBeRelative && baseUrl}${url}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers,
//         ...(token ? { Authorization: `Bearer ${token}` } : {})
//       },
//       method,
//       ...(data ? { body: JSON.stringify(data) } : {})
//     });

//     if (response.ok) {
//       return {
//         ok: true,
//         error: false,
//         status: response.status,
//         blob: contentType === 'application/pdf' ? response.blob() : null,
//         data: await response.json()
//       };
//     }

//     if (!response.ok) {
//       return makeErrorObject({
//         status: response.status,
//         sourceType,
//         message: '', // unsure how to handle this just yet, but required field
//         code: '', // unsure how to handle this just yet, but required field
//         details: {
//           requestUrl: url,
//           requestBody: data || null,
//           responseBody: await response.json(),
//           requestHeaders: headers || null,
//           requiresAuth: !!token,
//           hadToken: !!token
//         }
//       });
//     }
//   } catch (error: any) {
//     return makeErrorObject({
//       status: null,
//       sourceType,
//       message: error.message,
//       code: '', // unsure how to handle this just yet, but required field
//       details: {
//         requestUrl: url,
//         requestBody: data || null,
//         requestHeaders: headers || null,
//         requiresAuth: !!token,
//         hadToken: !!token
//       }
//     });
//   }
//   // default error
//   return makeErrorObject({
//     status: null,
//     sourceType,
//     message: '', // unsure how to handle this just yet, but required field
//     code: '', // unsure how to handle this just yet, but required field
//     details: {
//       requestUrl: url,
//       requestBody: data || null,
//       requestHeaders: headers || null,
//       requiresAuth: !!token,
//       hadToken: !!token
//     }
//   });
// };
