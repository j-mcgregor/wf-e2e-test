import { useTranslations } from 'use-intl';
import { SummaryInfo } from '../../../types/report';

interface SummaryDetails {
  info: SummaryInfo;
}

const SummaryDetails = ({ info }: SummaryDetails) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col bg-white border shadow-sm rounded h-full">
      <div className="flex justify-between h-1/4 border-b border-bg ">
        <div className="border-r border-bg p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('registration number')}</p>
          <p className="py-1 font-bold ">{info?.regNumber}</p>
        </div>

        <div className="p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('industry sector')}</p>
          <p className="py-1 font-bold">{info?.sector}</p>
        </div>
      </div>

      <div className="flex justify-between border-b border-bg h-1/4">
        <div className="border-r border-bg p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1 text-primary">{t('incorporation date')}</p>
          <p className="py-1 font-bold">{info?.incorporationDate}</p>
        </div>

        <div className="p-3 w-1/2 flex flex-col justify-center">
          <p className="py-1">{t('last filed date')}</p>
          <p className="py-1 font-bold text-primary">{info?.lastAccountDate}</p>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-start first-line:border h-1/2">
        <p className="py-2 text-primary">{t('company description')}</p>
        <p>{info?.description}</p>
      </div>
    </div>
  );
};

export default SummaryDetails;
