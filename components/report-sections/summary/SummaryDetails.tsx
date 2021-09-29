import { useTranslations } from 'next-intl';

export type SummaryDetailsProps = {
  regNumber: string;
  sector: string;
  description?: string | null;
  incorporationDate: number | string;
  lastAccountDate: number | string;
};

const SummaryDetails = ({
  regNumber,
  sector,
  incorporationDate,
  lastAccountDate,
  description
}: SummaryDetailsProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col bg-white border shadow-sm rounded h-full">
      <div className="flex justify-between h-1/4 border-b border-bg ">
        <div
          className="border-r border-bg p-3 w-1/2 flex flex-col justify-center"
          role="group"
        >
          <p className="py-1 text-primary">{t('registration_number')}</p>
          <p className="py-1 font-bold ">{regNumber}</p>
        </div>

        <div className="p-3 w-1/2 flex flex-col justify-center" role="group">
          <p className="py-1 text-primary">{t('industry_sector')}</p>
          <p className="py-1 font-bold">{sector}</p>
        </div>
      </div>

      <div
        className="flex justify-between border-b border-bg h-1/4"
        role="group"
      >
        <div className="border-r border-bg p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('incorporation_date')}</p>
          <p className="py-1 font-bold">
            {/* 
            So apparently this renders Jun 20, 2006 on Node 12 but 20 jun 2006 on Node 15. 
            Will disable the test for now but good to know (issue picked up by Github Actions) 
            */}
            {new Date(incorporationDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>

        <div className="p-3 w-1/2 flex flex-col justify-center" role="group">
          <p className="py-1">{t('last_filed_date')}</p>
          <p className="py-1 font-bold text-primary">{lastAccountDate}</p>
        </div>
      </div>

      <div
        className="p-3 flex flex-col justify-start first-line:border h-1/2"
        role="group"
      >
        <p className="py-2 text-primary">{t('company_description')}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SummaryDetails;
