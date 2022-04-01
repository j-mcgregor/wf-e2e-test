import { NextApiResponse } from 'next';
import { ValidationError } from '../../types/errors';
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
  error: '',
  details: ''
});

/**
 * @deprecated
 */
export const makeJsonError = (status: number, error: any) => {
  return status === UNPROCESSABLE_ENTITY.statusCode
    ? JSON.stringify(error.detail)
    : JSON.stringify(error);
};

export const makeMissingArgsResponse = (
  response: NextApiResponse,
  message: string,
  error: string,
  defaultProps: any
) => {
  return response.status(500).json({
    ...makeApiHandlerResponseFailure({
      message,
      error
    }),
    ...defaultProps
  });
};

interface MakeErrorResponseProps<T extends {}> {
  response: NextApiResponse;
  result: T;
}

export const makeErrorResponse = <T extends {}>({
  response,
  result
}: MakeErrorResponseProps<T>) => {
  switch (response.statusCode) {
    case 422:
      return response.status(422).json({
        ...makeApiHandlerResponseFailure({
          validationError: result
        })
      });

    default:
      break;
  }
};

function isValidationArray(value: unknown): value is Record<string, unknown>[] {
  if (!value || !Array.isArray(value) || value.length === 0) return false;

  return value.every(element => {
    if (!element) return false;

    if (Object.getPrototypeOf(element) === Object.prototype) {
      if (
        element.loc === undefined ||
        element.msg === undefined ||
        element.type === undefined
      )
        return false;
      return true;
    }
    return false;
  });
}

/**
 * Should check the following shape:
 * ---------------------------------
  interface ValidationError {
    detail: [
      {
        loc: string[];
        msg: string;
        type: string;
      }
    ];
}
 */
export const isValidationErrorType = (
  obj: unknown
): ValidationError | false => {
  if (!obj || typeof obj !== 'object' || obj === null) return false;

  const isObjectLiteral = Object.getPrototypeOf(obj) === Object.prototype;
  if (!isObjectLiteral) return false;

  // @ts-ignore
  const hasDetailProperty = isObjectLiteral && obj['detail'];
  if (!hasDetailProperty) return false;

  // @ts-ignore
  const isArrayOfObjects = isValidationArray(obj['detail']);

  if (!isArrayOfObjects) {
    return false;
  }

  // @ts-ignore
  const validationError: ValidationError = obj;
  return validationError;
};
