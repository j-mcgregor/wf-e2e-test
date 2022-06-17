/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/cognitive-complexity */
import { withSentry } from '@sentry/nextjs';

import authenticators from '../../../lib/api-handler/authenticators';
import APIHandler from '../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../lib/utils/fetchWrapper';

// example multi dates in a single year report
// import mockNewDates from '../../../lib/mock-data/mock-new-dates.json';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const ReportApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'REPORTS'
    },
    GET: async ({ query, authentication }) => {
      const exportType = query?.export;
      const reportId = query?.id;

      if (!exportType) {
        return {
          response: await fetchWrapper(
            `${process.env.WF_AP_ROUTE}/reports/${reportId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${authentication?.accessToken}`
              }
            }
          )
        };
      }

      if (exportType === 'csv') {
        const res = await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/csv`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        );

        const csv = await res.text();
        return {
          defaultResponse: {
            status: res.status,
            data: { csv },
            code: `REPORTS_${res.status}`,
            message:
              res.status < 300
                ? 'CSV Created Successfully'
                : 'Error Creating CSV'
          }
        };
      } else if (exportType === 'csv-full') {
        const res = await fetchWrapper(
          `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/full`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authentication?.accessToken}`
            }
          }
        );

        const csv = await res.text();
        return {
          defaultResponse: {
            status: res.status,
            data: { csv },
            code: `REPORTS_${res.status}`,
            message:
              res.status < 300
                ? 'CSV Created Successfully'
                : 'Error Creating CSV'
          }
        };
      }
      // else if (exportType === 'pdf') {
      //   const res = await fetchWrapper(
      //     `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/pdf`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         Authorization: `Bearer ${authentication?.accessToken}`
      //       }
      //     }
      //   )
      //   return {
      //     defaultResponse:
      //   };
      // }
    },
    POST: async ({ body, authentication }) => {
      return {
        response: await fetchWrapper(`${process.env.WF_AP_ROUTE}/reports`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authentication?.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
      };
    }
  });
};

export default withSentry(ReportApi);
