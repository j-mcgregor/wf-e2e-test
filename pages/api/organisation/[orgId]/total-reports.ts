import { withSentry } from '@sentry/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../../lib/utils/fetchWrapper';

const TotalReportsApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'ORGANISATION_ALL_REPORTS'
    },
    GET: async ({ query, authentication }) => {
      const res = await fetchWrapper(
        `${process.env.WF_AP_ROUTE}/organisations/${query.orgId}/reports?limit=1`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authentication?.accessToken}`
          }
        }
      );
      return {
        defaultResponse: {
          data: { totalOrganisationReports: res.headers.get('x-total-count') },
          status: res.status,
          code: `ORGANISATION_ALL_REPORTS_${res.status}`,
          message:
            res.status < 300
              ? 'Successfully fetched total organisation reports'
              : 'Failed to fetch total organisation reports'
        }
      };
    }
  });
};

export default withSentry(TotalReportsApi);
