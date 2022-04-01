/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import Report, {
  CreateReport,
  GetExistingReport,
  GetReportCsv
} from '../../../lib/funcs/report';
import mockUsers from '../../../lib/mock-data/users';
import {
  COMPANY_404,
  COMPANY_500,
  NO_COMPANY_ID,
  NO_CURRENCY,
  NO_ISO_CODE,
  NO_REPORT,
  NO_REPORT_ID,
  REPORT_FETCHING_ERROR,
  VALIDATION_ERROR
} from '../../../lib/utils/error-codes';
import {
  makeApiHandlerResponseFailure,
  makeMissingArgsResponse
} from '../../../lib/utils/http-helpers';
import { ReportSnippetType } from '../../../types/global';
import { HttpStatusCodes } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';

const {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  UNPROCESSABLE_ENTITY
} = HttpStatusCodes;

export interface ReportsReportApi
  extends CreateReport,
    GetReportCsv,
    GetExistingReport {}

// Declaring function for readability with Sentry wrapper
const report: NextApiHandler<ReportsReportApi> = async (request, response) => {
  const defaultNullProps = {
    reportId: null,
    report: null,
    csv: null
  };

  const token = await getToken({
    req: request,
    secret: `${process.env.NEXTAUTH_SECRET}`
  });

  // unauthenticated requests
  if (!token) {
    return response.status(FORBIDDEN.statusCode).json({
      ...makeApiHandlerResponseFailure({
        message: 'Unauthorised api request, please login to continue.',
        error: FORBIDDEN.key
      }),
      ...defaultNullProps
    });
  }

  const isGet = request.method === 'GET';
  const isPost = request.method === 'POST';

  if (isPost) {
    const body = await request?.body;

    if (!body.company_id) {
      return makeMissingArgsResponse(
        response,
        NO_COMPANY_ID,
        `No company ID provided.`,
        defaultNullProps
      );
    }

    if (!body.currency) {
      return makeMissingArgsResponse(
        response,
        NO_CURRENCY,
        `No currency code provided.`,
        defaultNullProps
      );
    }

    if (!body.iso_code) {
      return makeMissingArgsResponse(
        response,
        NO_ISO_CODE,
        `No ISO code provided.`,
        defaultNullProps
      );
    }

    try {
      const result = await Report.createReport(`${token?.accessToken}`, {
        report: body
      });

      if (result.ok) {
        return response.status(result.status).json({
          ...defaultNullProps,
          ...result,
          reportId: result?.reportId
        });
      }

      // NOT OK
      if (result.status === 404) {
        return response.status(NOT_FOUND.statusCode).json({
          ...makeApiHandlerResponseFailure({
            error: COMPANY_404,
            message: result?.message
          }),
          ...defaultNullProps
        });
      }

      if (result.status === 500) {
        return response.status(INTERNAL_SERVER_ERROR.statusCode).json({
          ...makeApiHandlerResponseFailure({
            error: COMPANY_500,
            message: result.message
          }),
          ...defaultNullProps
        });
      }

      return response.status(404).json({ ...result, ...defaultNullProps });
    } catch (error) {
      return response.status(INTERNAL_SERVER_ERROR.statusCode).json({
        ...makeApiHandlerResponseFailure({
          error: REPORT_FETCHING_ERROR,
          message: `Report couldn't be generated for ${body?.company_id}`
        }),
        ...defaultNullProps
      });
    }
  }

  if (isGet) {
    // extract report id
    const reportId = request.query.id;

    if (!reportId) {
      return makeMissingArgsResponse(
        response,
        NO_REPORT_ID,
        'No report ID provided, please add report id.',
        defaultNullProps
      );
    }

    /* ***** GET REPORT AS CSV ******* */

    if (request.query.export === 'csv') {
      try {
        const result = await Report.getReportCsv(`${token.accessToken}`, {
          reportId: `${reportId}`
        });

        if (result.ok) {
          return response.status(200).json({
            ...defaultNullProps,
            ...result,
            csv: result.csv
          });
        }

        return response.status(404).json({ ...result, ...defaultNullProps });
      } catch (error) {
        return response.status(UNPROCESSABLE_ENTITY.statusCode).json({
          ...makeApiHandlerResponseFailure({
            error: VALIDATION_ERROR,
            message: 'Unable to process the request'
          }),
          ...defaultNullProps
        });
      }
    } else {
      /* ***** GET REPORT FROM USER ******* */

      const email = token?.email;

      // to be replaced by backend call
      // @ts-ignore
      // eslint-disable-next-line security/detect-object-injection
      const user = mockUsers[email];

      const report = user?.reports?.find(
        (report: ReportSnippetType) => report.id === reportId
      );

      try {
        if (token.accessToken && !report) {
          const result = await Report.getExistingReport(
            `${token.accessToken}`,
            {
              reportId: `${reportId}`
            }
          );

          if (result.ok) {
            return response.status(200).json({
              ...defaultNullProps,
              ...result,
              report: result.report
            });
          }
        }
        if (!report) {
          return response.status(NOT_FOUND.statusCode).json({
            ...makeApiHandlerResponseFailure({
              error: NO_REPORT,
              message: 'No report found with that ID.'
            }),
            ...defaultNullProps
          });
        }
      } catch (error: any) {
        return response.status(INTERNAL_SERVER_ERROR.statusCode).json({
          ...makeApiHandlerResponseFailure({
            message: error?.message || error
          }),
          ...defaultNullProps
        });
      }
    }
  }

  return response.status(METHOD_NOT_ALLOWED.statusCode).json({
    ...makeApiHandlerResponseFailure({ message: METHOD_NOT_ALLOWED.key }),
    ...defaultNullProps
  });
};

export default withSentry(report);
