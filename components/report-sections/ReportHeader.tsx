/* eslint-disable no-case-declarations */
import { BookmarkIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Button from '../elements/Button';
import FaviconWithFallback from '../elements/FaviconWithFallback';
import useBookmark from '../../hooks/useBookmark';
import WFLogoSmall from '../../public/images/logos/wf-logo.svg';

interface ReportHeaderProps {
  company: string;
  created: string;
  reportId: string;
  website: string;
  snippet: {
    bond_rating_equivalent: string;
    sme_z_score: number;
    probability_of_default_1_year: number;
  };
}
const ReportHeader = ({
  company,
  created,
  reportId,
  website,
  snippet
}: ReportHeaderProps) => {
  const firstLetter = company?.charAt(0);

  const { handleBookmark, isBookMarked } = useBookmark(reportId, {
    id: reportId,
    bond_rating_equivalent: snippet?.bond_rating_equivalent,
    sme_z_score: snippet?.sme_z_score,
    probability_of_default_1_year: snippet?.probability_of_default_1_year,
    company_name: company,
    created_at: created
  });

  const t = useTranslations();

  // format to UK format
  const formattedDate = new Date(created).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="flex sm:flex-row flex-col w-full only-of-type:justify-between">
      {/* top right logo header for print only */}
      <div className="print:absolute hidden print:flex items-center top-2 right-2 space-x-3 text-sm">
        <p> {t('risk_assessment_report')}</p>
        <div className="flex items-center font-semibold space-x-2">
          <Image
            alt={'Wiserfunding Logo'}
            layout="fixed"
            width={50}
            height={50}
            src={WFLogoSmall}
          />
          <p>WiserFunding</p>
        </div>
      </div>
      <div className="flex flex-col order-2 sm:order-1 ">
        <p className="text-xl pb-4 print:hidden">
          {t('wiserfunding_risk_assessment_report')}
        </p>

        <h1 className="text-3xl font-medium pb-4">{company}</h1>
        <p>
          {t('created')}: {formattedDate}
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
          id="bookmark-button"
          onClick={() =>
            handleBookmark(isBookMarked ? 'REMOVE' : 'ADD', company)
          }
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
