/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';
import { getToken } from 'next-auth/jwt';
// example multi dates in a single year report
// import mockNewDates from '../../../lib/mock-data/mock-new-dates.json';
import Report, {
  CreateReport,
  GetExistingReport,
  GetReportCsvShort
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
  makeApiHandlerResponseSuccess,
  makeMissingArgsResponse
} from '../../../lib/utils/http-helpers';
import { StatusCodeConstants } from '../../../types/http-status-codes';

import type { NextApiHandler } from 'next';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

/** @COMPLETE */

const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, METHOD_NOT_ALLOWED } =
  StatusCodeConstants;

export interface ReportsReportApi
  extends CreateReport,
    GetReportCsvShort,
    GetExistingReport {}

// Declaring function for readability with Sentry wrapper
// @ts-ignore
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

    // if (reportId === 'new-dates') {
    //   return response.status(200).json({
    //     report: mockNewDates
    //   });
    // }

    if (!reportId) {
      return makeMissingArgsResponse(
        response,
        NO_REPORT_ID,
        'No report ID provided, please add report id.',
        defaultNullProps
      );
    }

    /* ***** GET REPORT AS CSV ******* */

    if (request?.query?.export === 'csv') {
      try {
        const result = await Report.getReportShortCsv(`${token.accessToken}`, {
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
    } else if (request?.query?.export === 'csv-full') {
      try {
        const result = await Report.getReportFullCsv(`${token.accessToken}`, {
          reportId: `${reportId}`
        });
        if (result.ok) {
          return response.status(200).json({
            ...defaultNullProps,
            ...result
          });
        }
      } catch (error) {
        return response.status(UNPROCESSABLE_ENTITY).json({
          ...makeApiHandlerResponseFailure({
            message: errorsBySourceType.REPORT[422]
          }),
          ...defaultNullProps
        });
      }
    } else if (request?.query?.export === 'pdf') {
      try {
        const fetchRes = await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/pdf`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        );

        if (fetchRes.status === 200 && fetchRes.ok) {
          const blob = await fetchRes.blob();
          const arrayBuffer = await blob.arrayBuffer();

          const buffer = Buffer.from(arrayBuffer);
          const filename: any = fetchRes.headers.get('content-disposition');

          const contentType: any = fetchRes.headers.get('content-type');
          response.writeHead(fetchRes.status, 'OK', {
            'content-disposition': filename,
            'content-type': contentType
          });
          response.write(buffer, 'binary');
          return response.end();
        } else {
          return response.status(UNPROCESSABLE_ENTITY).json({
            ...makeApiHandlerResponseFailure({
              message: errorsBySourceType.REPORT[422]
            }),
            ...defaultNullProps
          });
        }
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

          if (result.status === 401 || result.status === 403) {
            return returnUnauthorised(response, defaultNullProps);
          }

          return response.status(result.status).json({
            ...defaultNullProps,
            ...result
          });
        }
        if (!token.accessToken) {
          return returnUnauthorised(response, defaultNullProps);
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
