import { NextApiResponse } from 'next';

import { HandlerReturn } from '../../types/http';
import {
  HttpStatusCodes,
  StatusCodeConstants
} from '../../types/http-status-codes';
import { GENERIC_API_ERROR } from './error-codes';

const { OK } = HttpStatusCodes;

/**
 * The Promise returned from fetch() won't reject on HTTP error
 * status even if the response is an HTTP 404 or 500. Instead,
 * as soon as the server responds with headers, the Promise will
 * resolve normally (with the ok property of the response set to
 * false if the response isn't in the range 200–299), and it will
 * only reject on network failure or if anything prevented the
 * request from completing.
 */

export const makeApiHandlerResponseSuccess = (
  args?: Partial<HandlerReturn>
): HandlerReturn => ({
  ok: args?.ok || true,
  status: args?.status || 200,
  is_error: false,
  error: '',
  message: OK.key
});

export const makeApiHandlerResponseFailure = (
  args?: Partial<HandlerReturn>
): HandlerReturn => ({
  ok: args?.ok || false,
  status: args?.status || 500,
  message: args?.message || GENERIC_API_ERROR,
  is_error: true,
  error: ''
});

export const makeMissingArgsResponse = (
  response: NextApiResponse,
  message: string,
  error: string,
  defaultProps: any
) => {
  return response.status(StatusCodeConstants.BAD_REQUEST).json({
    ...makeApiHandlerResponseFailure({
      message,
      error
    }),
    ...defaultProps
  });
};
