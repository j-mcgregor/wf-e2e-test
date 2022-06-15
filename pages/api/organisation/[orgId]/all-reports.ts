import { withSentry } from '@sentry/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import authenticators from '../../../../lib/api-handler/authenticators';
import APIHandler from '../../../../lib/api-handler/handler';
import { fetchWrapper } from '../../../../lib/utils/fetchWrapper';

const AllReportsApi: NextApiHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  APIHandler(request, response, {
    config: {
      authenticate: authenticators.NextAuth,
      sourceType: 'ORGANISATION_ALL_REPORTS'
    },
    GET: async ({ query, authentication }) => {
      const skip = parseInt(`${query?.skip}`) || 0;
      const limit = parseInt(`${query?.limit}`) || 10;

      const res = await fetchWrapper(
        `${process.env.WF_AP_ROUTE}/organisations/${query.orgId}/reports?_end=${
          skip + limit
        }&_start=${skip}&_sort=created_at&_order=desc`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authentication?.accessToken}`
          }
        }
      );
      return {
        defaultResponse: {
          data: {
            organisationUserReports: await res.json(),
            totalOrganisationReports: res.headers.get('x-total-count')
          },
          status: res.status,
          code: `ORGANISATION_ALL_REPORTS_${res.status}`,
          message:
            res.status < 300
              ? 'Successfully fetched organisation reports'
              : 'Failed to fetch organisation reports'
        }
      };
    }
  });
};

export default withSentry(AllReportsApi);
