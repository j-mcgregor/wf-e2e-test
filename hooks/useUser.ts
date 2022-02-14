import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';

const useUser = (fetch: boolean = true) => {
  const { user } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  // if no user then revalidate onMount to prevent blank page
  const { data, isValidating } = useSWR(fetch && '/api/user', fetcher, {
    revalidateOnMount: !user,
    revalidateOnFocus: false
  });

  const isLoading = !data;
  React.useEffect(() => {
    if (data?.data && !isValidating) {
      setState({ ...appState, user: { ...data?.data } });
    }
  }, [data]);

  return {
    user: user ? user : null,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useUser;
