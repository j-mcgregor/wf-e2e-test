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
  errorCode: ErrorCodeType;
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

export type RequestBodyType = object | null;

export type MakeErrorInput = {
  status: HttpStatusCode;
  sourceType: ErrorCodeType | string;
  message: string;
  errorCode: ErrorCodeType;
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

type APIHandlerOptionsType = {
  authenticate: (req: NextApiRequest) => Promise<JWT | null>;
  publicMethods?: UnauthenticatedMethodsType;
  sourceType: string;
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

export type SuccessResponseType<T> = {
  ok: boolean;
  error: boolean;
  sourceType?: string;
  blob?: Promise<Blob> | null;
  data: T | object | null;
};
export type ErrorResponseType = MakeErrorOutput;

type BaseHandlerResponse = null;
