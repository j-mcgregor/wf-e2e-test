import {
  ArrowNarrowUpIcon,
  DocumentReportIcon
} from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { createReportTitle } from '../../lib/utils/text-helpers';

import Link from '../elements/Link';

interface BookmarkCardProps {
  linkTo: string;
  companyName: string;
  smeZscore: number;
  bondRating: string;
  pdRatio: number;
  key: string;
  createdAt: string;
}

const BookmarkCard = ({
  companyName,
  smeZscore,
  bondRating,
  pdRatio,
  linkTo,
  createdAt
}: BookmarkCardProps) => {
  const t = useTranslations();

  const reportTitle = createReportTitle(companyName, createdAt);

  const renderpdRatio =
    pdRatio &&
    new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(pdRatio * 100);

  return (
    <Link linkTo={linkTo}>
      <div className="bg-white shadow hover:shadow-2xl transition-shadow duration-300 rounded w-full flex flex-col">
        <div className="flex w-full justify-between p-2 ">
          <div className="bg-highlight p-1 rounded-sm">
            <DocumentReportIcon className="h-5 w-5 text-white" />
          </div>

          <ArrowNarrowUpIcon className="h-7 w-7 rotate-45 text-gray-400 cursor-pointer" />
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
  );
};

export default BookmarkCard;
