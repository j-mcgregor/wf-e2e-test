import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { UserIndexApi } from '../pages/api/user';

const useUser = (fetch: boolean = true) => {
  const { user } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  // if no user then revalidate onMount to prevent blank page
  const { data, isValidating } = useSWR<UserIndexApi>(
    fetch && '/api/user',
    fetcher,
    {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    }
  );

  const isLoading = !data;
  React.useEffect(() => {
    if (data?.user && !isValidating) {
      setState({ ...appState, user: { ...data?.user } });
    }
  }, [data]);

  const isAdmin = user?.organisation_role === 'Admin';

  return {
    user: user ? user : null,
    isAdmin,
    loading: isLoading,
    isError: data?.is_error,
    error: {
      message: data?.is_error ? data?.message : false,
      status: data?.status
    },
    message: data?.message
  };
};

export default useUser;
