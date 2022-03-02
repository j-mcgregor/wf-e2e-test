export type ErrorType = string | boolean | null;
export type ErrorArray = ErrorType[];

export type ErrorCodeKeys =
  | 'BATCH_REPORT_FETCHING_ERROR'
  | 'COMPANY_404'
  | 'COMPANY_422'
  | 'COMPANY_500'
  | 'COMPANY_NAME_REQUIRED'
  | 'COMPANY_WEBSITE_REQUIRED'
  | 'CONFIRM_PASSWORD_MATCH'
  | 'COUNTRY_CODE_REQUIRED'
  | 'EMAIL_REQUIRED'
  | 'FULL_NAME_REQUIRED'
  | 'GENERIC_API_ERROR_FORM'
  | 'GENERIC_API_ERROR'
  | 'INCORRECT_DETAILS'
  | 'INVALID_COUNTRY_CODE'
  | 'INVALID_REQUEST_TYPE'
  | 'INVALID_SSO_LOGIN'
  | 'METHOD_NOT_ALLOWED'
  | 'MISSING_DATA'
  | 'NEW_PASSWORD_REQUIRED'
  | 'NO_COMPANY_ID'
  | 'NO_CURRENCY'
  | 'NO_ISO_CODE'
  | 'NO_REPORT_FOUND'
  | 'NO_REPORT_ID'
  | 'NO_REPORT'
  | 'PASSWORD_REQUIRED'
  | 'REPORT_FETCHING_ERROR'
  | 'SEARCH_ERROR'
  | 'SIGNED_OUT'
  | 'UNAUTHORISED'
  | 'UNPROCESSABLE_ENTITY'
  | 'USER_403'
  | 'USER_404'
  | 'USER_422'
  | 'USER_500'
  | 'VALID_EMAIL_REQUIRED'
  | 'VALIDATION_ERROR';

export type HttpStatusKeys =
  | 'ACCEPTED'
  | 'ALREADY_REPORTED'
  | 'BAD_GATEWAY'
  | 'BAD_REQUEST'
  | 'CONFLICT'
  | 'CONTINUE'
  | 'CREATED'
  | 'EXPECTATION_FAILED'
  | 'FAILED_DEPENDENCY'
  | 'FORBIDDEN'
  | 'FOUND'
  | 'GATEWAY_TIMEOUT'
  | 'GONE'
  | 'HTTP_VERSION_NOT_SUPPORTED'
  | 'I_AM_A_TEAPOT'
  | 'IM_USED'
  | 'INSUFFICIENT_STORAGE'
  | 'INTERNAL_SERVER_ERROR'
  | 'LENGTH_REQUIRED'
  | 'LOCKED'
  | 'LOOP_DETECTED'
  | 'METHOD_NOT_ALLOWED'
  | 'MISDIRECTED_REQUEST'
  | 'MOVED_PERMANENTLY'
  | 'MULTI_STATUS'
  | 'MULTIPLE_CHOICES'
  | 'NETWORK_AUTHENTICATION_REQUIRED'
  | 'NO_CONTENT'
  | 'NON_AUTHORITATIVE_INFORMATION'
  | 'NOT_ACCEPTABLE'
  | 'NOT_EXTENDED'
  | 'NOT_FOUND'
  | 'NOT_IMPLEMENTED'
  | 'NOT_MODIFIED'
  | 'OK'
  | 'PARTIAL_CONTENT'
  | 'PAYLOAD_TOO_LARGE'
  | 'PAYMENT_REQUIRED'
  | 'PERMANENT_REDIRECT'
  | 'PRECONDITION_FAILED'
  | 'PRECONDITION_REQUIRED'
  | 'PROCESSING'
  | 'PROXY_AUTHENTICATION_REQUIRED'
  | 'RANGE_NOT_SATISFIABLE'
  | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
  | 'REQUEST_TIMEOUT'
  | 'RESET_CONTENT'
  | 'SEE_OTHER'
  | 'SERVICE_UNAVAILABLE'
  | 'SWITCH_PROXY'
  | 'SWITCHING_PROTOCOLS'
  | 'TEMPORARY_REDIRECT'
  | 'TOO_MANY_REQUESTS'
  | 'UNAUTHORIZED'
  | 'UNAVAILABLE_FOR_LEGAL_REASONS'
  | 'UNPROCESSABLE_ENTITY'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'UPGRADE_REQUIRED'
  | 'URI_TOO_LONG'
  | 'USE_PROXY'
  | 'VARIANT_ALSO_NEGOTIATES';

/**
 * ***************************************************
 * BACKEND VALIDATION ERROR
 * @status 422
 * @name ValidationError
 * @description The backend team send thes following response if the data isn't correct
 *
 * The detail.loc[] gives the path of the invalid type / value in the request body
 * eg path.to.the.property => ['path','to','the','property']
 * ***************************************************
 */

export interface ValidationError {
  detail: [
    {
      loc: string[];
      msg: string;
      type: string;
    }
  ];
}
