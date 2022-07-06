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

  const { data: reports, mutate: mutateOrg } = useSWR(
    fetch && orgId && `/api/organisation/${orgId}/total-reports`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const { data: orgDetails, isValidating } = useSWR<{
    data: { organisation: OrganisationType };
  }>(fetch && orgId && `/api/organisation/${orgId}`, fetcher, {
    revalidateOnMount: true
  });

  const { data, mutate: mutateUsers } = useSWR(
    fetch && orgId && `/api/organisation/${orgId}/users?limit=1`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const organisation = {
    name: user?.organisation_name,
    id: user?.organisation_id,
    totalUsers: (data && data?.data?.total) || 0,
    totalOrganisationReports: reports?.data?.totalOrganisationReports,
    ...(orgDetails && orgDetails?.data?.organisation)
  };

  const features: OrganisationFeaturesObject =
    organisation?.features?.reduce((allFeatures, currentFeature) => {
      allFeatures[currentFeature.name] = currentFeature;
      return allFeatures;
    }, {} as OrganisationFeaturesObject) || {};

  React.useEffect(() => {
    if (orgDetails?.data.organisation?.id && !isValidating) {
      setState({ user, organisation });
    }
  }, [data, orgDetails]);

  const isLoading = !data;

  return {
    organisation,
    features,
    mutateOrg,
    mutateUsers,
    loading: isLoading,
    error: data?.isError,
    message: data?.message
  };
};

export default useOrganisation;
