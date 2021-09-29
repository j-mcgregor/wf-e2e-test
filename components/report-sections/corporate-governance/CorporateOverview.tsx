import { useTranslations } from 'next-intl';

interface CorporateOverviewProps {
  ceo: string;
  cfo: string;
  chairman: string;
  directors: number;
  seniorManagement: number;
  shareholders: number;
}

const CorporateOverview = ({
  ceo,
  cfo,
  chairman,
  directors,
  seniorManagement,
  shareholders
}: CorporateOverviewProps) => {
  const t = useTranslations();

  return (
    <div className="bg-white shadow-sm rounded-sm mx-4 sm:mx-0">
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 ">
        <div className="p-4 border-b border-r">
          <p className="font-bold">{ceo}</p>
          <p>{t('ceo')}</p>
        </div>
        <div className="p-4 border-b md:border-r">
          <p className="font-bold">{cfo}</p>
          <p>{t('cfo')}</p>
        </div>
        <div className="p-4 border-b border-r md:border-r-0">
          <p className="font-bold">{chairman}</p>
          <p>{t('chairman')}</p>
        </div>
        <div className="p-4 border-b md:border-r">
          <p className="font-bold">{directors}</p>
          <p>{t('directors')}</p>
        </div>
        <div className="p-4 border-r">
          <p className="font-bold">{shareholders}</p>
          <p>{t('shareholders')}</p>
        </div>
        <div className="p-4 ">
          <p className="font-bold">{seniorManagement}</p>
          <p>{t('senior management')}</p>
        </div>
      </div>
    </div>
  );
};

export default CorporateOverview;
