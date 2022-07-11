import { BaseErrorCodeEnum, ErrorMessageObjectType } from './errors';

const renderType = (type: string) => type + ' ';

const DEFAULT_ERROR_MESSAGES: ErrorMessageObjectType = {
  BAD_REQUEST: (type: string = '') =>
    `This was a bad ${type + ' '}request. Please check and try again.`,
  UNAUTHORISED: (type: string = '') =>
    `This ${renderType(
      type
    )}request on is not authorised. Please provide correct authentication.`,
  NOT_FOUND: (type: string = '') =>
    `The requested ${renderType(type)}resource could not be found.`,
  METHOD_NOT_ALLOWED: (type: string = '') =>
    `The requested method ${'on ' + renderType(type)} is not allowed.`,
  VALIDATION_ERROR: (type: string = '') =>
    `This ${renderType(
      type
    )}request has a validation error. Please check and try again.`,
  TOO_MANY_REQUESTS: (type: string = '') =>
    `This ${renderType(
      type
    )}request has been throttled. Please try again later.`,
  INTERNAL_SERVER_ERROR: (type: string = '') =>
    `This ${renderType(
      type
    )}request resulted in an internal server error. Please try again later.`,
  SERVICE_UNAVAILABLE: (type: string = '') =>
    `The ${renderType(
      type
    )}service is currently unavailable. Please try again later.`,
  UNKNOWN_API_ERROR: (type: string = '') =>
    `There is a general error facilitating your ${renderType(
      type
    )}request. Please try again later.`,
  EXCEPTION_CODE_ERROR: (type: string = '') =>
    `There has been a logic exception when handling this ${renderType(
      type
    )}request.`
};

const createErrorMessage = (code: BaseErrorCodeEnum, type?: string) => {
  return DEFAULT_ERROR_MESSAGES[`${code}`](type);
};

export default createErrorMessage;
