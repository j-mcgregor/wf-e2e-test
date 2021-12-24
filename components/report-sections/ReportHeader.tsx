/* eslint-disable no-case-declarations */
import { BookmarkIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { UserReports, userReports } from '../../lib/appState';
import fetcher from '../../lib/utils/fetcher';
import { ReportSnippetType } from '../../types/global';
import Button from '../elements/Button';
import FaviconWithFallback from '../elements/FaviconWithFallback';

interface ReportHeaderProps {
  company: string;
  created: string;
  reportId: string | number;
  website: string;
}
const ReportHeader = ({
  company,
  created,
  reportId,
  website
}: ReportHeaderProps) => {
  const [isBookMarked, setIsBookMarked] = useState<boolean>();

  const { bookmarkedReports } = useRecoilValue<UserReports>(userReports);
  const setReportBookmarks = useSetRecoilState(userReports);

  const firstLetter = company?.charAt(0);

  useEffect(() => {
    const isMarked = bookmarkedReports?.find(
      (x: ReportSnippetType) => `${x.id}` === `${reportId}`
    );

    setIsBookMarked(!!isMarked);
  }, [bookmarkedReports]);

  const handleBookmark = useRecoilCallback(() => async () => {
    try {
      const method = isBookMarked ? 'DELETE' : 'POST';
      const updater = await fetcher(
        `/api/user/bookmarks?reportId=${reportId}`,
        method
      );

      if (updater.ok) {
        setIsBookMarked(!isBookMarked);

        const updatedReports = await fetcher(
          `/api/user/bookmarks?reportId=${reportId}`,
          'GET'
        );

        if (updatedReports.ok) {
          // recoil requires that what comes out of state is the same as what goes in,
          // but that is in efficient and problematic
          // we're working around it for now
          // @ts-ignore
          setReportBookmarks(reports => ({
            ...reports,
            bookmarkedReports: updatedReports.bookmarks
          }));
        }
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  });

  const t = useTranslations();
  return (
    <div className="flex sm:flex-row flex-col w-full only-of-type:justify-between">
      <div className="flex flex-col order-2 sm:order-1">
        <p className="text-xl pb-4">{t('risk_assessment_report')}</p>
        <h1 className="text-3xl font-medium pb-4">{company}</h1>
        <p>
          {t('created')}: {created}
        </p>
      </div>

      <div className="flex order-1 sm:order-2">
        <div className="print:w-24 print:h-24 w-12 h-12 relative">
          {/* icon.horse url to grab companies icon - currently fetching small images without paid api */}

          <FaviconWithFallback
            src={`https://logo.clearbit.com/${website}`}
            fallbackLetter={firstLetter}
            alt={`${company} logo`}
          />
        </div>
        <Button
          variant="none"
          newClassName="border-none self-start ml-auto mr-2 sm:mr-0 sm:ml-4 print:hidden"
          onClick={handleBookmark}
        >
          <BookmarkIcon
            className={`w-10 ${isBookMarked ? 'fill-current' : ''}`}
          />
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader;
