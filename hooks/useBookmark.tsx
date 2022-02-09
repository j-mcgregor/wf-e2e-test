/* eslint-disable sonarjs/cognitive-complexity */
import * as Sentry from '@sentry/nextjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserReports, userReports } from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { ReportSnippetType } from '../types/global';

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
  const [isBookMarked, setIsBookmarked] = useState<boolean>(false);
  const setReportBookmarks = useSetRecoilState(userReports);
  const { bookmarkedReports } = useRecoilValue<UserReports>(userReports);

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

  const optimisticallyRemoveBookMark = () =>
    setReportBookmarks(reports => ({
      ...reports,
      bookmarkedReports: reports.bookmarkedReports.filter(
        bookmark => bookmark.id !== reportId
      )
    }));

  const optimisticallyAddBookMark = (report: ReportSnippetType | undefined) =>
    setReportBookmarks(reports => ({
      ...reports,
      bookmarkedReports: report
        ? [...reports.bookmarkedReports, report]
        : reports.bookmarkedReports
    }));

  const handleBookmark = useRecoilCallback(
    () => async (action: 'ADD' | 'REMOVE') => {
      try {
        // optimistically update bookmark state
        // this is in reports
        setIsBookmarked(!isBookMarked);

        // optimistically update global state
        if (action === 'REMOVE') {
          optimisticallyRemoveBookMark();
        }
        // optimistically update global state
        if (action === 'ADD') {
          optimisticallyAddBookMark(reportSnippet);
        }

        // turn and action into an API method
        const method = action === 'REMOVE' ? 'DELETE' : 'POST';

        // added return_all so that we can return the bookmarks in the same request
        const updater = await fetcher(
          `/api/user/bookmarks?reportId=${reportId}&return_all=true`,
          method
        );

        // if error
        if (!updater.ok) {
          // if fails to save, revert to previous state
          setIsBookmarked(!isBookMarked);

          // if errors undo global state changes
          if (action === 'ADD') {
            optimisticallyRemoveBookMark();
          } else if (action === 'REMOVE') {
            optimisticallyAddBookMark(reportSnippet);
          }
        }

        if (updater.ok && updater.bookmarks) {
          // recoil requires that what comes out of state is the same as what goes in,
          // but that is in efficient and problematic
          // we're working around it for now
          // @ts-ignore
          setReportBookmarks(reports => ({
            ...reports,
            bookmarkedReports: updater.bookmarks
          }));
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