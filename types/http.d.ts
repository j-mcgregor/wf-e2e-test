/**
 * ***************************************************
 * @description
 * Used for every API handler call that uses fetch().
 * T should always extend the HandlerReturn. Any generic
 * that isn't extended from HandlerReturn will error
 * @returns a Promise<T> where T is the expected response
 * @example const getAllBatchReports: ApiHandler<GetAllBatchReports> = () => {}
 * @param token string
 * @param ...args any[]
 * ***************************************************
 */

import { ValidationError } from './errors';

export type ApiHandler<T extends HandlerReturn> = (
  token: string,
  ...args: any[]
) => Promise<T>;

/**
 * ***************************************************
 * @name HandlerReturn
 * @description the core interface for every handler in the project.
 * Every handler's own interface should extend this one.
 * Could also be used in other places
 * ***************************************************
 */

export interface HandlerReturn {
  ok: boolean;
  is_error: boolean;
  status: number;
  message: string | HandleMessageObject;
  error: string;
}

/**
 * ***************************************************
 * @name HandleMessageObject
 * @returns data recommended to be the stringified JSON object or array.
 * This was its easily passed through the call chain
 * ***************************************************
 */

export interface HandleMessageObject {
  isJSON: boolean;
  /** @type must be JSON.stringify(ApiErrorType[]) */
  data: string;
}
