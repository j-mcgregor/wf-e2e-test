/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';

import Report, {
  CreateReport,
  GetExistingReport,
  GetReportCsv
} from '../../../lib/funcs/report';
import {
  NO_COMPANY_ID,
  NO_CURRENCY,
  NO_ISO_CODE,
  NO_REPORT_ID,
  REPORT_FETCHING_ERROR
} from '../../../lib/utils/error-codes';
import {
  errorsBySourceType,
  returnUnauthorised
} from '../../../lib/utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeMissingArgsResponse
} from '../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';

/** @COMPLETE */

const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, METHOD_NOT_ALLOWED } =
  StatusCodeConstants;

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
    return returnUnauthorised(response, defaultNullProps);
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

      return response.status(result.status).json({
        ...defaultNullProps,
        ...result
      });
    } catch (error) {
      return response.status(INTERNAL_SERVER_ERROR).json({
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

        return response.status(result.status).json({
          ...defaultNullProps,
          ...result
        });
      } catch (error) {
        return response.status(UNPROCESSABLE_ENTITY).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.REPORT[422]
          }),
          ...defaultNullProps
        });
      }
    } else {
      /* ***** GET REPORT FROM USER ******* */
      // test this bit in particular
      try {
        if (token.accessToken) {
          const result: GetExistingReport = await Report.getExistingReport(
            `${token.accessToken}`,
            {
              reportId: `${reportId}`
            }
          );

          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        }
      } catch (error: any) {
        return response.status(INTERNAL_SERVER_ERROR).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.REPORT[INTERNAL_SERVER_ERROR]
          }),
          ...defaultNullProps
        });
      }
    }
  }

  return response.status(METHOD_NOT_ALLOWED).json({
    ...makeApiHandlerResponseFailure({
      message: errorsBySourceType.GENERAL[METHOD_NOT_ALLOWED]
    }),
    ...defaultNullProps
  });
};

export default withSentry(report);
