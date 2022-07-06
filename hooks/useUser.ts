/* eslint-disable sonarjs/cognitive-complexity */
import { useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useSWR from 'swr';
import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';

const useUser = (fetch: boolean = true) => {
  const { user, organisation } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  const { data: sessionUser } = useSession();

  // if no user then revalidate onMount to prevent blank page
  const { data: userRequest, isValidating } = useSWR(
    fetch && '/api/user',
    fetcher,
    {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    }
  );

  const { data: reportRequest, isValidating: isValidatingReports } = useSWR(
    fetch && '/api/user/reports',
    fetcher,
    {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    }
  );

  const { data: bookmarksRequest, isValidating: isValidatingBookmarks } =
    useSWR(fetch && '/api/user/bookmarks', fetcher, {
      revalidateOnMount: !user,
      revalidateOnFocus: false
    });

  // handling the loading states
  const isLoadingUser = !userRequest && isValidating;
  const isLoadingReports = !reportRequest && isValidatingReports;
  const isLoadingBookmarks = !bookmarksRequest && isValidatingBookmarks;
  const isLoading = isLoadingUser || isLoadingReports || isLoadingBookmarks;

  const is_sso = sessionUser?.user?.is_sso;

  React.useEffect(() => {
    let newUser = { ...userRequest?.data?.user, is_sso };

    if (userRequest?.data?.user && !isValidating) {
      setState({
        ...appState,
        organisation,
        user: { ...userRequest?.data.user, is_sso }
      });
    }

    if (bookmarksRequest?.data && !isValidatingBookmarks) {
      newUser = { ...newUser, bookmarked_reports: bookmarksRequest.data };
      setState({ ...appState, organisation, user: { ...user, ...newUser } });
    }

    if (reportRequest?.data && !isValidatingReports) {
      newUser = {
        ...newUser,
        reports: reportRequest.data.reports,
        total: reportRequest.data.total
      };
      setState({ ...appState, organisation, user: { ...user, ...newUser } });
    }
  }, [userRequest, bookmarksRequest, reportRequest, sessionUser]);

  const isAdmin = user?.organisation_role === 'Admin';

  return {
    user: user ? user : null,
    isAdmin,
    loading: isLoading,
    isError: userRequest?.error,
    error: {
      message: userRequest?.error ? userRequest?.message : false,
      status: userRequest?.status
    },
    message: userRequest?.message
  };
};

export default useUser;
