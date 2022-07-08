import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import {
  ApiHandlerResponse,
  ErrorResponseType,
  SuccessResponseType
} from '../lib/api-handler/api-handler';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';

import {
  OrganisationFeaturesObject,
  OrganisationType,
  OrganisationUser,
  OrganisationUserReport
} from '../types/organisations';
import useSWRWithToasts from './useSWRWithToasts';

// interface OrganisationHookObject {
//   name?: string;
//   id?: string;
//   totalUsers?: number;
//   quota?: {
//     quota_used: number;
//   };
//   totalOrganisationReports?: string | null;
// }

const useOrganisation = (fetch = true) => {
  const { user } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  const orgId = user?.organisation_id || null;

  const { data: orgDetailsRequest, isValidating: orgDetailsRequestValidating } =
    useSWRWithToasts<OrganisationType>(
      fetch && orgId && `/api/organisation/${orgId}`,
      fetcher,
      {
        revalidateOnMount: true
      }
    );

  const {
    data: orgReportsRequest,
    isValidating: orgReportsRequestValidating,
    mutate: mutateOrg
  } = useSWRWithToasts<{
    totalOrganisationReports: number;
  }>(fetch && orgId && `/api/organisation/${orgId}/total-reports`, fetcher, {
    revalidateOnMount: true
  });

  const {
    data: orgTotalUsersRequest,
    isValidating: orgTotalUsersRequestValidating,
    mutate: mutateUsers
  } = useSWRWithToasts<{
    users: OrganisationUser[];
    total: number;
  }>(fetch && orgId && `/api/organisation/${orgId}/users?limit=1`, fetcher, {
    revalidateOnMount: true
  });

  const orgDetailsRequestLoading =
    !orgDetailsRequest && orgDetailsRequestValidating;
  const orgReportsRequestLoading =
    !orgReportsRequest && orgReportsRequestValidating;
  const orgTotalUsersRequestLoading =
    !orgTotalUsersRequest && orgTotalUsersRequestValidating;

  const isLoading =
    orgDetailsRequestLoading ||
    orgReportsRequestLoading ||
    orgTotalUsersRequestLoading;

  const organisation = {
    name: user?.organisation_name,
    id: user?.organisation_id,
    totalUsers:
      (orgTotalUsersRequest && orgTotalUsersRequest?.data?.total) || 0,
    totalOrganisationReports: orgReportsRequest?.data?.totalOrganisationReports,
    ...(orgDetailsRequest && orgDetailsRequest?.data)
  };

  const features: OrganisationFeaturesObject =
    organisation?.features?.reduce((allFeatures, currentFeature) => {
      allFeatures[currentFeature.name] = currentFeature;
      return allFeatures;
    }, {} as OrganisationFeaturesObject) || {};

  React.useEffect(() => {
    if (orgDetailsRequest?.data?.id && !orgDetailsRequestLoading) {
      setState({ user, organisation });
    }
  }, [orgTotalUsersRequest, orgDetailsRequest]);

  return {
    organisation,
    features,
    mutateOrg,
    mutateUsers,
    loading: isLoading,
    error: orgDetailsRequest?.isError,
    message: orgDetailsRequest?.message
  };
};

export default useOrganisation;
