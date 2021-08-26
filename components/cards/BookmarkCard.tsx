import { useTranslations } from 'use-intl';
import {
  DocumentReportIcon,
  ArrowNarrowUpIcon
} from '@heroicons/react/outline';
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
  linkTo,
  key
}: BookmarkCardProps) => {
  const t = useTranslations();
  return (
    <Link linkTo={linkTo}>
      <div key={key} className="bg-white shadow rounded w-full flex flex-col">
        <div className="flex w-full justify-between p-2 ">
          <Link linkTo={linkTo}>
            <div className="bg-highlight p-1 rounded-sm">
              <DocumentReportIcon className="h-5 w-5 text-white" />
            </div>
          </Link>

          <Link>
            <ArrowNarrowUpIcon className="h-7 w-7 rotate-45 text-gray-400 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold px-2 pb-1 truncate">{company_name}</p>

          <div className="flex bg-bg rounded m-2 text-sm">
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 w-full">
              <p className="font-bold py-1">{sme_zscore}</p>
              <p className="text-[10px]">{t('sme score')}</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-0.5 py-2 border-l-2 border-r-2 border-gray-300 w-full">
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
