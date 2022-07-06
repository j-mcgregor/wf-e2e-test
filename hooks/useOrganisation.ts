import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';

import {
  OrganisationFeaturesObject,
  OrganisationType
} from '../types/organisations';

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

  const { data: organisationReportsRequest, mutate: mutateOrg } = useSWR(
    fetch && orgId && `/api/organisation/${orgId}/total-reports`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const { data: orgDetails, isValidating } = useSWR<{
    error: boolean;
    data: OrganisationType;
  }>(fetch && orgId && `/api/organisation/${orgId}`, fetcher, {
    revalidateOnMount: true
  });

  const { data: orgTotalUsersRequest, mutate: mutateUsers } = useSWR(
    fetch && orgId && `/api/organisation/${orgId}/users?limit=1`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const organisation = {
    name: user?.organisation_name,
    id: user?.organisation_id,
    totalUsers:
      (orgTotalUsersRequest && orgTotalUsersRequest?.data?.total) || 0,
    totalOrganisationReports:
      organisationReportsRequest?.data?.totalOrganisationReports,
    ...(orgDetails && orgDetails?.data)
  };

  const features: OrganisationFeaturesObject =
    organisation?.features?.reduce((allFeatures, currentFeature) => {
      allFeatures[currentFeature.name] = currentFeature;
      return allFeatures;
    }, {} as OrganisationFeaturesObject) || {};

  React.useEffect(() => {
    if (orgDetails?.data?.id && !isValidating) {
      setState({ user, organisation });
    }
  }, [orgTotalUsersRequest, orgDetails]);

  const isLoading = !orgTotalUsersRequest;

  const error = [
    orgTotalUsersRequest?.error,
    organisationReportsRequest?.error,
    orgDetails?.error
  ].some(isError => isError);

  return {
    organisation,
    features,
    mutateOrg,
    mutateUsers,
    loading: isLoading,
    error,
    message: orgTotalUsersRequest?.message
  };
};

export default useOrganisation;
