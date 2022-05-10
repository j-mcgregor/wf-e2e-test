import { number } from 'prop-types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { OrganisationTypeApi } from '../pages/api/organisation/[orgId]/[type]';

interface OrganisationHookObject {
  name?: string;
  id?: string;
  totalUsers?: number;
  quota?: {
    quota_used: number;
  };
}

const useOrganisation = (fetch = true) => {
  const { user } = useRecoilValue(appState);
  const orgId = user?.organisation_id || null;

  const { data } = useSWR<OrganisationTypeApi>(
    fetch && orgId && `/api/organisation/${orgId}/users?limit=1`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const organisation: OrganisationHookObject = {
    name: user?.organisation_name,
    id: user?.organisation_id,
    totalUsers: (data && data?.total) || 0
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
