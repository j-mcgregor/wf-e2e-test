import { HandlerReturn } from '../../types/http';
import { HttpStatusCodes } from '../../types/http-status-codes';
import { GENERIC_API_ERROR } from './error-codes';

const { UNPROCESSABLE_ENTITY, OK } = HttpStatusCodes;

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

export const makeJsonError = (status: number, error: any) => {
  return status === UNPROCESSABLE_ENTITY.statusCode
    ? JSON.stringify(error.detail)
    : JSON.stringify(error);
};
