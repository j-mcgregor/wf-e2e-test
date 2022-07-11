/* eslint-disable sonarjs/cognitive-complexity */
import { useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import appState, { UserReports } from '../lib/appState';
import { fetchMockData } from '../lib/mock-data/helpers';
import fetcher from '../lib/utils/fetcher';
import { ReportSnippetType, UserType } from '../types/global';
import useSWRWithToasts from './useSWRWithToasts';

const useUser = (fetch: boolean = true) => {
  const { user, organisation } = useRecoilValue(appState);
  const setState = useSetRecoilState(appState);

  const { data: sessionUser } = useSession();

  // if no user then revalidate onMount to prevent blank page
  const { data: userRequest, isValidating } = useSWRWithToasts<{
    user: UserType;
  }>(
    fetch && '/api/user',
    fetcher,
    // fetchMockData(403, 'USER', 'USER_403'),
    {
      revalidateOnMount: !user?.id,
      revalidateOnFocus: false
    }
  );

  const { data: reportRequest, isValidating: isValidatingReports } =
    useSWRWithToasts<{ reports: UserReports; total: number }>(
      fetch && '/api/user/reports',
      fetcher,
      // fetchMockData(500, 'USER_REPORTS', 'USER_REPORTS_500'),
      {
        revalidateOnMount: !user?.id,
        revalidateOnFocus: false
      }
    );

  const { data: bookmarksRequest, isValidating: isValidatingBookmarks } =
    useSWRWithToasts<ReportSnippetType[]>(
      fetch && '/api/user/bookmarks',
      fetcher,
      {
        revalidateOnMount: !user?.id,
        revalidateOnFocus: false
      }
    );

  // handling the loading states
  const isLoadingUser = !userRequest && isValidating;
  const isLoadingReports = !reportRequest && isValidatingReports;
  const isLoadingBookmarks = !bookmarksRequest && isValidatingBookmarks;
  const isLoading = isLoadingUser || isLoadingReports || isLoadingBookmarks;

  const is_sso = sessionUser?.user?.is_sso;

  React.useEffect(() => {
    setState({
      ...appState,
      organisation,
      user: {
        ...user,
        ...{
          ...userRequest?.data?.user,
          is_sso,
          reports: reportRequest?.data?.reports,
          total: reportRequest?.data?.total,
          bookmarked_reports: bookmarksRequest?.data
        }
      }
    });
  }, [userRequest, reportRequest, bookmarksRequest]);

  const isAdmin = user?.organisation_role === 'Admin';

  return {
    user: user?.id ? user : null,
    isAdmin,
    loading: isLoading,
    isError: userRequest?.isError,
    error: {
      message: userRequest?.isError ? userRequest?.message : false,
      status: userRequest?.status
    },
    message: userRequest?.message
  };
};

export default useUser;
