import { useEffect, useState } from 'react';
import { DocumentReportIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { createReportTitle } from '../../lib/utils/text-helpers';
import BookmarkDropdown from '../elements/BookmarkDropdown';
// import * as Sentry from '@sentry/nextjs';
// import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
// import { UserReports, userReports } from '../../lib/appState';
// import fetcher from '../../lib/utils/fetcher';
import useBookmark from '../../hooks/useBookmark';

import Link from '../elements/Link';
import { isDisabled } from '@testing-library/user-event/dist/utils';

interface BookmarkCardProps {
  linkTo: string;
  companyName: string;
  smeZscore: number;
  bondRating: string;
  pdRatio: number;
  key: string;
  createdAt: string;
  reportId: string;
}

const BookmarkCard = ({
  companyName,
  smeZscore,
  bondRating,
  pdRatio,
  linkTo,
  createdAt,
  reportId
}: BookmarkCardProps) => {
  const t = useTranslations();

  // state to toggle disabling the link when mouse is over/clicks the delete button
  const [disableLink, setDisableLink] = useState(false);

  const reportTitle = createReportTitle(companyName, createdAt);
  const { isBookMarked, handleBookmark } = useBookmark(reportId);

  const renderpdRatio =
    pdRatio &&
    new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(pdRatio * 100);

  return isBookMarked ? (
    <Link
      disabled={disableLink}
      linkTo={linkTo}
      className={`${disableLink ? 'pointer-events-none' : ''}`}
    >
      <div
        className={`bg-white shadow hover:shadow-2xl transition-shadow duration-300 rounded w-full flex flex-col relative `}
      >
        <div className="flex w-full justify-between p-2 ">
          <div className="bg-highlight p-1 rounded-sm">
            <DocumentReportIcon className="h-5 w-5 text-white" />
          </div>

          <div
            onMouseEnter={() => setDisableLink(true)}
            onMouseLeave={() => setDisableLink(false)}
            className="absolute top-0 right-0  h-12 w-12 flex justify-center items-center z-50 "
          >
            <BookmarkDropdown deleteBookmark={() => handleBookmark('REMOVE')} />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold px-2 py-2 truncate">{reportTitle}</p>

          <div className="flex bg-primary text-white bg-opacity-75 rounded-b mt-2 text-xs sm:text-sm">
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 w-full">
              <p className="font-bold py-1">
                {smeZscore ? `${smeZscore}` : t('na')}
              </p>
              <p className="text-[10px]">{t('sme_z-score')}</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 border-l border-r border-gray-300 w-full">
              <p className="font-bold py-1">
                {bondRating ? `${bondRating}` : t('na')}
              </p>
              <p className="text-[10px]">{t('bre')}</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 w-full">
              <p className="font-bold py-1">
                {renderpdRatio ? `${renderpdRatio}%` : t('na')}
              </p>
              <p className="text-[10px]">{t('pd_ratio')}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
};

export default BookmarkCard;
