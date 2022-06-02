import { MethodTypes } from '../api-handler/api-handler';
import { defaultHeaders } from '../api-handler/headers';

export const fetchWrapper = async (
  route: string,
  {
    method,
    headers,
    body
  }: {
    method: MethodTypes;
    headers?: Record<string, string>;
    body?: ReadableStream | string | URLSearchParams;
  }
) => {
  return await fetch(route, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    body
  });
};
