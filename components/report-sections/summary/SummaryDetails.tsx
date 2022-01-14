import { useTranslations } from 'next-intl';
import countryCodes from '../../../lib/data/countryCodes.json';

export type SummaryDetailsProps = {
  regNumber: string;
  sector: string | null;
  naceName: string | null;
  description?: string | null;
  incorporationDate: number | string | null;
  lastAccountDate: number | string;
  country?: string;
  currency?: string;
  naceCode?: string;
};

const SummaryDetails = ({
  regNumber,
  sector,
  naceName,
  incorporationDate,
  lastAccountDate,
  description,
  country,
  naceCode
}: SummaryDetailsProps) => {
  const t = useTranslations();

  const currency = countryCodes.find(
    (countryCode: any) => countryCode.code === country
  )?.currency_code;

  return (
    <div className="flex flex-col bg-white border  shadow-sm rounded h-full print:shadow-none print:border-2 prose-h4:font-bold">
      {/* ===== Row 1 ===== */}
      <div className="flex justify-between h-1/4 border-b print:border-b-2">
        <div
          className="border-r print:border-r-2 last-of-type:p-3 w-1/2 flex flex-col justify-center print:px-3 p-3 space-y-2"
          role="group"
        >
          <h4>{t('company_identifier')}</h4>
          <p>{regNumber || t('na')}</p>
        </div>

        <div
          className="p-3 w-1/2 flex flex-col justify-center space-y-2"
          role="group"
        >
          <h4>{t('industry_sector')}</h4>
          <p>{sector || t('na')}</p>
        </div>
      </div>

      {/* ===== Row 2 ===== */}
      <div
        className="flex justify-between border-b print:border-b-2 h-1/4 "
        role="group"
      >
        <div className="border-r print:border-r-2 p-3 w-1/2 flex flex-col justify-center space-y-2">
          <h4>{t('incorporation_date')}</h4>
          <p>
            {/*
            So apparently this renders Jun 20, 2006 on Node 12 but 20 jun 2006 on Node 15.
            Will disable the test for now but good to know (issue picked up by Github Actions)
            */}
            {incorporationDate
              ? new Date(incorporationDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : t('na')}
          </p>
        </div>

        <div
          className="p-3 w-1/2 flex flex-col justify-center space-y-2"
          role="group"
        >
          <h4>{t('last_filed_dates')}</h4>
          <p>{lastAccountDate || t('na')}</p>
        </div>
      </div>
      {/* ===== Row 3 ===== */}
      <div className="flex justify-between h-1/4 border-b print:border-b-2">
        <div
          className="border-r print:border-r-2 last-of-type:p-3 w-1/2 flex flex-col justify-center print:px-3 p-3 space-y-2"
          role="group"
        >
          <h4>{t('country')}</h4>
          <p>{country || t('na')}</p>
        </div>

        <div
          className="p-3 w-1/2 flex flex-col justify-center space-y-2"
          role="group"
        >
          <h4>{t('currency')}</h4>
          <p>{currency || t('na')}</p>
        </div>
      </div>
      {/* ===== Row 4  ===== */}
      <div className="flex justify-between h-1/4 border-b print:border-b-2">
        <div
          className="border-r print:border-r-2 last-of-type:p-3 w-1/2 flex flex-col justify-center print:px-3 p-3 space-y-2"
          role="group"
        >
          <h4>{t('nace_code')}</h4>
          <p>{naceCode || t('na')}</p>
        </div>

        <div
          className="p-3 w-1/2 flex flex-col justify-center space-y-2"
          role="group"
        >
          <h4>{t('nace_sector')}</h4>
          <p>{naceName || t('na')}</p>
        </div>
      </div>

      {/* ===== Description ===== */}

      <div
        className="p-3 flex flex-col justify-start first-line:border print:first-line:border-2  min-h-1/2 space-y-2"
        role="group"
      >
        <h4>{t('company_description')}</h4>
        <p>{description || t('na')}</p>
      </div>
    </div>
  );
};

export default SummaryDetails;
