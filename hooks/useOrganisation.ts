import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { OrganisationApi } from '../pages/api/organisation/[orgId]';

const useOrganisation = (fetch: boolean = true) => {
  const { user } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  const orgId = user?.organisation_id || null;

  const { data, isValidating } = useSWR<OrganisationApi>(
    fetch && `/api/organisation/${orgId}`,
    fetcher,
    {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    }
  );

  const isLoading = !data;

  return {
    organisation: data && data?.organisation ? data.organisation : null,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useOrganisation;
