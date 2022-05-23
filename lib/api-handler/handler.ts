/* eslint-disable security/detect-object-injection */
import { NextApiResponse } from 'next';
import {
  APIHandlerOptionsType,
  ErrorResponseType,
  HandlerArgumentsType,
  MakeErrorOutput,
  MethodTypes,
  SuccessResponseType
} from './api-handler';
import { CustomErrorsType, DefaultErrorType } from './errors';
import {
  getBody,
  getStatus,
  hasCustomErrors,
  shouldMethodBeUnauthenticated
} from './handler-helpers';
import HttpStatusCode from './http-status-codes';
import {
  makeDefaultErrors,
  makeErrorObject,
  makeResponseObject
} from './make-reponses';

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

// default to auth required
const APIHandler = async <T>(
  // options and parameters
  // accepts an authenticate function, and an object of unauthenticated methods
  // also has a source type for error handling
  {
    // all the details about the requests
    request,
    response,
    authenticate,
    publicMethods,
    sourceType
  }: APIHandlerOptionsType,
  // handles the methods
  handler: APIHandlerMethods,
  // pass in the custom errors
  customErrors: CustomErrorsType = []
  // eslint-disable-next-line sonarjs/cognitive-complexity
): Promise<SuccessResponseType<T> | ErrorResponseType | void> => {
  // extract all the basic details from the request
  const method = request.method as MethodTypes;
  const query = request.query;
  const url = request.url as string;
  const headers = request.headers;
  const body = request.body;

  // pass in an authentication function to authenticate the request
  // should return null or a JTW token / object
  const isAuthenticated = await authenticate(request);

  // check if the method that is being used needs to be authenticated
  const methodRequiresAuthentication = !shouldMethodBeUnauthenticated(
    publicMethods,
    method
  );

  // construct a request details object (this is for error messages)
  const requestDetails = {
    requestUrl: url,
    requestBody: body || null,
    requestHeaders: headers,
    isAuthenticated: !!isAuthenticated,
    authentication: isAuthenticated,
    requestQuery: query,
    sourceType,
    requiresAuth: methodRequiresAuthentication
  };

  // create default errors
  const { UNAUTHORISED, EXCEPTION_CODE_ERROR, METHOD_NOT_ALLOWED } =
    makeDefaultErrors(requestDetails);

  // send an unauthenticated error if the method requires authentication
  if (!isAuthenticated && methodRequiresAuthentication) {
    return response.status(Number(UNAUTHORISED.status)).json(UNAUTHORISED);
  }

  // create handler arguments and information
  // this is passed to the handler functions
  const handlerArguments: HandlerArgumentsType = {
    query,
    body,
    isAuthenticated: !!isAuthenticated,
    authentication: isAuthenticated
  };

  try {
    // the primary function to handle errors and success of the request
    // takes in an object (later we could expand to provide other settings per request etc)
    const handlerWrapper = async (externalRequest?: {
      response?: Response;
      defaultResponse?: DefaultErrorType;
      // need to add this logic in
      // this can throw an error if there is not the expected status from the endpoint
      expectedStatus?: HttpStatusCode;
    }) => {
      // rename the response more accurately
      const externalResponse = externalRequest?.response;
      const defaultResponse = externalRequest?.defaultResponse;

      // find any custom errors
      const customError = hasCustomErrors(
        customErrors,
        externalResponse,
        request
      );

      // extract the status for the requests
      const resStatus = getStatus(
        externalResponse,
        Number(defaultResponse?.status),
        customError
      );

      if (defaultResponse && !customError) {
        return response.status(resStatus).json(
          makeResponseObject({
            sourceType,
            requestDetails,
            data: defaultResponse.data,
            ...defaultResponse
          })
        );
      }

      // show a default response if there is no response returned in the handler
      if (!externalResponse && !customError) {
        return response.status(resStatus).json(
          makeErrorObject({
            code: 'NO_RESPONSE_RETURNED',
            message: 'No response returned from handler',
            status: 500,
            sourceType,
            details: {
              ...requestDetails
            }
          })
        );
      }

      // create the response object (both error and success)
      return response.status(resStatus).json(
        makeResponseObject(
          {
            sourceType,
            status: resStatus,
            data: externalResponse ? await getBody(externalResponse) : null,
            requestDetails
          },
          customError
        )
      );
    };

    // assign function
    const handlerMethodFunction = handler[method];

    // if method return method
    if (handlerMethodFunction) {
      return handlerWrapper(
        await handlerMethodFunction({
          ...handlerArguments
        })
      );
    }

    // if no method return default no method
    return response
      .status(Number(METHOD_NOT_ALLOWED.status))
      .json(METHOD_NOT_ALLOWED);
  } catch (e: any) {
    return response
      .status(500)
      .json({ ...EXCEPTION_CODE_ERROR, message: e.message });
  }
};

export default APIHandler;
