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
      <div className="bg-white shadow p-4 rounded w-full">
        <div className="flex w-full justify-between pb-2">
          <Link linkTo="#">
            <div className="bg-yellow-100 p-1">
              <DocumentReportIcon className="h-5 w-5" />
            </div>
          </Link>

          <Link>
            <ArrowNarrowUpIcon className="h-6 w-6 rotate-45 text-gray-400 cursor-pointer" />
          </Link>
        </div>
        <p className="font-semibold pb-4">{company_name}</p>

        <div className="flex bg-bg rounded my-2">
          <div className="flex flex-col items-center justify-center text-center p-3">
            <p className="font-bold text-lg py-1">{sme_zscore}</p>
            <p className="text-sm">{t('sme score')}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-3 border-l-2 border-r-2 border-gray-300">
            <p className="font-bold text-lg py-1">{bond_rating}</p>
            <p className="text-sm">{t('bond rating')}</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-3">
            <p className="font-bold text-lg py-1">{pd_ratio}%</p>
            <p className="text-sm">{t('pd ratio')}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookmarkCard;
