/* eslint-disable security/detect-object-injection */
import { NextApiResponse } from 'next';
import { ErrorCodeKeys } from '../../types/errors';
import { HandlerReturn } from '../../types/http';
import * as ErrorConstants from './error-codes';
import { makeApiHandlerResponseFailure } from './http-helpers';

type SourceType =
  | 'USER'
  | 'COMPANY'
  | 'AUTH'
  | 'REPORT'
  | 'BATCH_REPORT'
  | 'GENERAL';

interface MakeErrorProps {
  status: number;
  message?: ErrorCodeKeys;
  sourceType?: SourceType;
}

export const errorsBySourceType: Record<SourceType, Record<number, string>> = {
  USER: {
    403: ErrorConstants.USER_NOT_AUTHORISED,
    404: ErrorConstants.USER_404,
    422: ErrorConstants.USER_422,
    429: ErrorConstants.USER_429,
    500: ErrorConstants.USER_500,
    503: ErrorConstants.USER_503
  },
  COMPANY: {
    404: ErrorConstants.COMPANY_404,
    422: ErrorConstants.COMPANY_422,
    429: ErrorConstants.COMPANY_429,
    500: ErrorConstants.COMPANY_500,
    503: ErrorConstants.COMPANY_503
  },
  AUTH: {
    403: ErrorConstants.UNAUTHORISED
  },
  REPORT: {
    404: ErrorConstants.REPORT_404,
    422: ErrorConstants.REPORT_422,
    429: ErrorConstants.REPORT_429,
    500: ErrorConstants.REPORT_500,
    503: ErrorConstants.REPORT_503
  },
  BATCH_REPORT: {
    404: ErrorConstants.BATCH_REPORT_404,
    422: ErrorConstants.BATCH_REPORT_422,
    429: ErrorConstants.BATCH_REPORT_429,
    500: ErrorConstants.BATCH_REPORT_500,
    503: ErrorConstants.BATCH_REPORT_503
  },
  GENERAL: {
    400: ErrorConstants.BAD_REQUEST,
    403: ErrorConstants.UNAUTHORISED,
    404: ErrorConstants.NOT_FOUND,
    405: ErrorConstants.METHOD_NOT_ALLOWED,
    422: ErrorConstants.VALIDATION_ERROR,
    429: ErrorConstants.TOO_MANY_REQUESTS,
    500: ErrorConstants.INTERNAL_SERVER_ERROR,
    503: ErrorConstants.SERVICE_UNAVAILABLE
  }
};

export const makeErrorResponse = ({
  status,
  sourceType = 'GENERAL'
}: MakeErrorProps): HandlerReturn => {
  const message =
    errorsBySourceType[sourceType][status] ||
    errorsBySourceType.GENERAL[status];

  switch (status) {
    case 404:
      return {
        ...makeApiHandlerResponseFailure({
          status: 404,
          message
        })
      };
    case 422:
      return {
        ...makeApiHandlerResponseFailure({
          status: 422,
          message
        })
      };
    case 429:
      return {
        ...makeApiHandlerResponseFailure({
          status: 429,
          message
        })
      };

    case 500:
      return {
        ...makeApiHandlerResponseFailure({
          status: 500,
          message
        })
      };

    case 503:
      return {
        ...makeApiHandlerResponseFailure({
          status: 503,
          message
        })
      };
    default:
      return {
        ...makeApiHandlerResponseFailure({
          status,
          message: ErrorConstants.GENERIC_API_ERROR
        })
      };
  }
};

export const returnUnauthorised = <T extends {}>(
  response: NextApiResponse,
  defaultNullProps: T
) => {
  return response.status(403).json({
    ...makeApiHandlerResponseFailure({
      message: 'Unauthorised api request, please login to continue.',
      error: ErrorConstants.UNAUTHORISED
    }),
    ...defaultNullProps
  });
};
