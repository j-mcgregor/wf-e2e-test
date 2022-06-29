import { useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';

const useUser = (fetch: boolean = true) => {
  const { user } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  const { data: sessionUser } = useSession();

  // if no user then revalidate onMount to prevent blank page
  const { data, isValidating } = useSWR(fetch && '/api/user', fetcher, {
    revalidateOnMount: !user,
    revalidateOnFocus: false
  });

  const { data: reports, isValidating: isValidatingReports } = useSWR(
    fetch && '/api/user/reports',
    fetcher,
    {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    }
  );

  const { data: bookmarks, isValidating: isValidatingBookmarks } = useSWR(
    fetch && '/api/user/bookmarks',
    fetcher,
    {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    }
  );
  const is_sso = sessionUser?.user?.is_sso;
  const isLoading = !data;
  React.useEffect(() => {
    let user = {};

    if (data?.data?.user && !isValidating) {
      setState({ ...appState, user: { ...data?.data.user, is_sso } });
      user = { ...data.data.user };
    }

    if (bookmarks?.data && !isValidatingBookmarks) {
      user = { ...user, bookmarked_reports: bookmarks.data };
    }

    if (reports?.data && !isValidatingReports) {
      user = {
        ...user,
        reports: reports.data.reports,
        total: reports.data.total
      };
    }

    setState({ ...appState, user: { ...user } });
  }, [data, bookmarks, reports, sessionUser]);

  const isAdmin = user?.organisation_role === 'Admin';

  return {
    user: user ? user : null,
    isAdmin,
    loading: isLoading,
    isError: data?.error,
    error: {
      message: data?.error ? data?.message : false,
      status: data?.status
    },
    message: data?.message
  };
};

export default useUser;
