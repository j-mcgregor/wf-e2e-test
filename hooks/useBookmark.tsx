/* eslint-disable sonarjs/cognitive-complexity */
import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { mutate } from 'swr';

import { UserReports, userReports } from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { ReportSnippetType } from '../types/global';
import { useToast } from './useToast';

// hook to use bookmarks
// takes a report object to optimistically add to state whilst waiting for request
// uses the reportId to find out if its bookmarked already

const useBookmark = (
  reportId: string,
  reportSummary?: ReportSnippetType
): {
  isBookMarked: boolean;
  handleBookmark: (action: 'ADD' | 'REMOVE') => Promise<void>;
  setIsBookmarked: Dispatch<SetStateAction<boolean>>;
} => {
  const t = useTranslations();
  const [isBookMarked, setIsBookmarked] = useState<boolean>(false);
  const setReportBookmarks = useSetRecoilState(userReports);
  const { bookmarkedReports } = useRecoilValue<UserReports>(userReports);
  const { triggerToast, getToastTextFromResponse } = useToast();

  const [reportSnippet, setReportSnippet] = useState<
    ReportSnippetType | undefined
  >(reportSummary);

  useEffect(() => {
    if (reportId) {
      const globalBookmark = bookmarkedReports.find(
        report => report.id === reportId
      );

      // save the current report object
      if (globalBookmark) {
        setReportSnippet(globalBookmark);
      }
      if (globalBookmark && !isBookMarked) {
        setIsBookmarked(true);
      } else if (!globalBookmark && isBookMarked) {
        setIsBookmarked(false);
      }
    }
  }, [bookmarkedReports]);

  const handleBookmark = useRecoilCallback(
    () => async (action: 'ADD' | 'REMOVE') => {
      try {
        // optimistically update bookmark state
        // this is in reports
        setIsBookmarked(!isBookMarked);

        // turn and action into an API method
        const method = action === 'REMOVE' ? 'DELETE' : 'POST';

        // added return_all so that we can return the bookmarks in the same request
        const updater = await fetch(
          `/api/user/bookmarks?reportId=${reportId}`,
          { method }
        );

        // if error
        if (!updater.ok) {
          setIsBookmarked(!isBookMarked);

          const json = await updater.json();
          const toastText = getToastTextFromResponse(json);

          // if fails to save, revert to previous state
          toastText &&
            triggerToast({
              title: toastText.title,
              description: toastText.description,
              toastId: 'bookmark-updated-error',
              toastType: 'error',
              dismiss: 'corner'
            });
        }

        if (updater.ok) {
          // if successful revalidate the useUser hook to fetch updated user object
          mutate('/api/user/bookmarks');

          triggerToast({
            title: action === 'REMOVE' ? 'Bookmark removed' : 'Bookmark added',
            toastId: `bookmark-updated-${method}`,
            status: updater.status
          });
        }
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  );

  return {
    handleBookmark,
    isBookMarked,
    setIsBookmarked
  };
};

export default useBookmark;
