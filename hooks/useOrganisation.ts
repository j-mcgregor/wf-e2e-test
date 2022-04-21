import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { OrganisationIndexApi } from '../pages/api/organisation/[orgId]';
import { OrganisationTypeApi } from '../pages/api/organisation/[orgId]/[type]';

const useOrganisation = (fetch: boolean = true) => {
  const { user } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  const orgId = user?.organisation_id || null;

  const { data, isValidating } = useSWR<OrganisationIndexApi>(
    fetch && `/api/organisation/${orgId}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  const { data: result } = useSWR<OrganisationTypeApi>(
    fetch && `/api/organisation/${orgId}/users?limit=1`,
    fetcher
  );

  const organisation = {
    ...(data && data?.organisation),
    totalUsers: result && result?.total
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
