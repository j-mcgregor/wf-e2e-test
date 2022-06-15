import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';

const useOrganisation = (fetch = true) => {
  const { user } = useRecoilValue(appState);
  const orgId = user?.organisation_id || null;

  const { data: reports, mutate: mutateOrg } = useSWR(
    fetch && orgId && `/api/organisation/${orgId}/total-reports`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const { data: orgDetails } = useSWR(
    fetch && `/api/organisation/${orgId}`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

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

  const isLoading = !data;

  return {
    organisation,
    mutateOrg,
    mutateUsers,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useOrganisation;
