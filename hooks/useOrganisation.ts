import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { OrganisationIndexApi } from '../pages/api/organisation/[orgId]';
import { OrganisationTypeApi } from '../pages/api/organisation/[orgId]/[type]';

const useOrganisation = (fetch: boolean = true) => {
  const { user } = useRecoilValue(appState);
  const orgId = user?.organisation_id || null;

  const { data } = useSWR<OrganisationIndexApi>(
    fetch && `/api/organisation/${orgId}`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const { data: result } = useSWR<OrganisationTypeApi>(
    fetch && `/api/organisation/${orgId}/users?limit=1`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const organisation = {
    ...(data && data?.organisation),
    totalUsers: (result && result?.total) || 0
  };

  const isLoading = !data;

  return {
    organisation,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useOrganisation;
