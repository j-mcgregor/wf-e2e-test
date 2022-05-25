import { number } from 'prop-types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { OrganisationIndexApi } from '../pages/api/organisation/[orgId]';
import { OrganisationTypeApi } from '../pages/api/organisation/[orgId]/[type]';

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
  const orgId = user?.organisation_id || null;

  const { data: reports, mutate: mutateOrg } = useSWR<OrganisationIndexApi>(
    fetch && orgId && `/api/organisation/${orgId}?reports=true&limit=1`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const { data: orgDetails } = useSWR<OrganisationIndexApi>(
    fetch && `/api/organisation/${orgId}`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const { data, mutate: mutateUsers } = useSWR<OrganisationTypeApi>(
    fetch && orgId && `/api/organisation/${orgId}/users?limit=1`,
    fetcher,
    {
      revalidateOnMount: true
    }
  );

  const organisation = {
    name: user?.organisation_name,
    id: user?.organisation_id,
    totalUsers: (data && data?.total) || 0,
    totalOrganisationReports: reports?.totalOrganisationReports,
    ...(orgDetails && orgDetails?.organisation)
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
