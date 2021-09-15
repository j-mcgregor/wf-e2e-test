import { useTranslations } from 'use-intl';



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
        <div className="border-r border-bg p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('registration number')}</p>
          <p className="py-1 font-bold ">{regNumber}</p>
        </div>

        <div className="p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('industry sector')}</p>
          <p className="py-1 font-bold">{sector}</p>
        </div>
      </div>

      <div className="flex justify-between border-b border-bg h-1/4">
        <div className="border-r border-bg p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('incorporation date')}</p>
          <p className="py-1 font-bold">
            {new Date(incorporationDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>

        <div className="p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1">{t('last filed date')}</p>
          <p className="py-1 font-bold text-primary">{lastAccountDate}</p>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-start first-line:border h-1/2">
        <p className="py-2 text-primary">{t('company description')}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SummaryDetails;
