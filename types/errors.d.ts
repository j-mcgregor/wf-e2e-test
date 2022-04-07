export type ErrorType = string | boolean | null;
export type ErrorArray = ErrorType[];

export type ErrorCodeKeys =
  // REPORT
  | 'NO_COMPANY_ID'
  | 'NO_CURRENCY'
  | 'NO_ISO_CODE'
  | 'NO_REPORT_FOUND'
  | 'NO_REPORT_ID'
  | 'NO_REPORT'
  | 'REPORT_403'
  | 'REPORT_404'
  | 'REPORT_422'
  | 'REPORT_429'
  | 'REPORT_500'
  | 'REPORT_503'
  // BTCH_REPORT
  | 'BATCH_REPORT_FETCHING_ERROR'
  | 'NO_BATCH_REPORT_FOUND'
  | 'NO_BATCH_REPORT_ID'
  | 'NO_BATCH_REPORT'
  | 'BATCH_REPORT_403'
  | 'BATCH_REPORT_404'
  | 'BATCH_REPORT_422'
  | 'BATCH_REPORT_429'
  | 'BATCH_REPORT_500'
  | 'BATCH_REPORT_503'
  // USER
  | 'EMAIL_REQUIRED'
  | 'FULL_NAME_REQUIRED'
  | 'USER_NOT_AUTHORISED'
  | 'USER_404'
  | 'USER_422'
  | 'USER_429'
  | 'USER_500'
  | 'USER_503'
  | 'VALID_EMAIL_REQUIRED'
  | 'CONFIRM_PASSWORD_MATCH'
  | 'INCORRECT_DETAILS'
  // AUTH
  | 'INVALID_SSO_LOGIN'
  | 'NEW_PASSWORD_REQUIRED'
  | 'PASSWORD_REQUIRED'
  | 'SIGNED_OUT'
  | 'UNAUTHORISED'
  // COMPANY
  | 'COMPANY_429'
  | 'COMPANY_503'
  | 'COMPANY_404'
  | 'COMPANY_422'
  | 'COMPANY_500'
  | 'COMPANY_NAME_REQUIRED'
  | 'COMPANY_WEBSITE_REQUIRED'
  | 'COUNTRY_CODE_REQUIRED'
  | 'INVALID_COUNTRY_CODE'
  | 'INVALID_REQUEST_TYPE'
  | 'SEARCH_ERROR'
  // GENERAL
  | 'BAD_REQUEST'
  | 'GENERIC_API_ERROR_FORM'
  | 'GENERIC_API_ERROR'
  | 'MISSING_DATA'
  | 'METHOD_NOT_ALLOWED'
  | 'REPORT_FETCHING_ERROR'
  | 'UNPROCESSABLE_ENTITY'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'TOO_MANY_REQUESTS';

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

export type CustomApiCodes = 500 | 404 | 422 | 429 | 503;

export interface CustomApiErrorDescription {
  // Data not found
  404: string;
  // Invalid details
  422: string;
  // Rate limit (soft) i.e. try again in 30s
  429: string;
  // Full unrecoverable error generating report
  500: string;
  // Full Rate limit
  503: string;
}
