import {
  ArrowNarrowUpIcon,
  DocumentReportIcon
} from '@heroicons/react/outline';
import { useTranslations } from 'use-intl';

import Link from '../elements/Link';

interface BookmarkCardProps {
  linkTo: string;
  company_name: string;
  sme_zscore: number;
  bond_rating: string;
  pd_ratio: number;
  key: number;
}

const BookmarkCard = ({
  company_name,
  sme_zscore,
  bond_rating,
  pd_ratio,
  linkTo
}: BookmarkCardProps) => {
  const t = useTranslations();
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
          <p className="font-semibold px-2 py-2 truncate">{company_name}</p>

          <div className="flex bg-primary text-white bg-opacity-75 rounded-b mt-2 text-sm">
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 w-full">
              <p className="font-bold py-1">{sme_zscore}</p>
              <p className="text-[10px]">{t('sme score')}</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 border-l border-r border-gray-300 w-full">
              <p className="font-bold py-1">{bond_rating}</p>
              <p className="text-[10px]">{t('bond rating')}</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 w-full">
              <p className="font-bold py-1">{pd_ratio}%</p>
              <p className="text-[10px]">{t('pd ratio')}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookmarkCard;
