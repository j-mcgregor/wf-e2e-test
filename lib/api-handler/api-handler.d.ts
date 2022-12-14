import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'next-auth/jwt';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { CustomErrorsType, DefaultErrorType } from './errors';
import HttpStatusCode from './http-status-codes';

export type FetcherOptions = {
  method: MethodTypes;
  data?: object;
  headers: {
    [key: string]: string;
  };
};

export type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ErrorCodeType = {
  [key: string]: string;
  GENERAL: 'GENERAL';
};
type ErrorCodeKeys = {
  [key: string]: string;
};

export type MakeErrorOutput = NextApiResponse & {
  status: HttpStatusCode;
  sourceType: ErrorCodeType;
  isError: true;
  code: ErrorCodeType;
  message: string;
  details: {
    requestUrl: string;
    requestBody: RequestBodyType;
    responseBody: object | null;
    requestHeaders: object | null;
    requiresAuth?: boolean | null;
    hadToken?: boolean | null;
  };
};

export type RequestBodyType = Record<string, any> | null;

export type MakeErrorInput = {
  status: HttpStatusCode;
  sourceType: ErrorCodeType | string;
  message: string;
  code: ErrorCodeType;
  details: {
    requestUrl: string;
    requestBody: RequestBodyType;
    responseBody?: object;
    requestHeaders?: object;
    requiresAuth?: boolean;
    hadToken?: boolean;
  };
};

export type UnauthenticatedMethodsType = {
  [index: MethodTypes]: boolean;
  GET?: boolean;
  POST?: boolean;
  PUT?: boolean;
  DELETE?: boolean;
  PATCH?: boolean;
};

export type SourceTypes =
  | 'USER'
  | 'BATCH_REPORTS_BY_ID'
  | 'BATCH_AUTO'
  | 'BATCH_MANUAL'
  | 'INTEGRATIONS'
  | 'INTEGRATIONS_CODAT'
  | 'ORGANISATION_ALL_REPORTS'
  | 'ORGANISATION'
  | 'ORGANISATION_USER'
  | 'ORGANISATION_USERS'
  | 'REPORTS_NEWS'
  | 'REPORTS'
  | 'REPORTS_UPLOAD'
  | 'USER_BOOKMARK'
  | 'USER_REPORTS'
  | 'PASSWORD_RESET'
  | 'SEARCH_COMPANIES';

type APIHandlerOptionsType = {
  authenticate: (req: NextApiRequest) => Promise<JWT | null>;
  publicMethods?: UnauthenticatedMethodsType;
  sourceType: SourceTypes;
};

export type MakeHttpResponse = <T = any>(
  args: HandlerArgumentsType
) => Promise<
  | {
      // response: NextApiResponse<MakeErrorOutput | SuccessResponseType<T>>;
      response?: Response;
      defaultResponse?: DefaultErrorType;
    }
  | undefined
>;

// Partial so not every method is required for each handler instance
type APIHandlerMethods = Partial<Record<MethodTypes, MakeHttpResponse>>;

export interface APIInitalisationType extends APIHandlerMethods {
  config: APIHandlerOptionsType;
  customErrors?: CustomErrorsType;
}

type HandlerArgumentsType = {
  query: NextApiRequestQuery;
  body: RequestBodyType;
  isAuthenticated: boolean;
  authentication: JWT | null;
};

export type SuccessResponseType<T = any> = {
  ok: boolean;
  isError: boolean;
  sourceType?: string;
  blob?: Promise<Blob> | null;
  data: T | null;
};

export type ErrorResponseType = MakeErrorOutput;

export type ApiHandlerResponse<T = any> = SuccessResponseType<T> &
  ErrorResponseType;

type BaseHandlerResponse = null;
