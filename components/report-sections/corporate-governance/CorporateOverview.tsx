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

  const reverseTextPrint = 'print:flex print:flex-col-reverse';

  return (
    <div className="bg-white shadow-sm rounded-sm mx-4 sm:mx-0 print:mx-0 print:shadow-none ">
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 print:grid-cols-6 print:text-sm print:text-center ">
        <div
          className={`p-4 border-b border-r print:border-t-2 print:border-l-2 print:border-b-2 ${reverseTextPrint}`}
          data-testid="corp-ceo-testid"
        >
          <p className="font-bold">{ceo || t('na')}</p>
          <p>{t('ceo')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 border-b md:border-r print:border-t-2 print:border-r-2 print:border-b-2`}
          data-testid="corp-cfo-testid"
        >
          <p className="font-bold">{cfo || t('na')}</p>
          <p>{t('cfo')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 border-b border-r md:border-r-0 print:border-t-2 print:border-b-2`}
          data-testid="corp-chairman-testid"
        >
          <p className="font-bold">{chairman || t('na')}</p>
          <p>{t('chairman')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 print:border-b-2 md:border-r print:border-t-2 print:border-r-2`}
          data-testid="corp-directors-testid"
        >
          <p className="font-bold">{directors || 0}</p>
          <p>{t('directors')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 border-r print:border-b-2 print:border-t-2`}
          data-testid="corp-shareholders-testid"
        >
          <p className="font-bold">{shareholders || 0}</p>
          <p>{t('shareholders')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 print:border-b-2 print:border-t-2 print:border-r-2`}
          data-testid="corp-snr-mgmt-testid"
        >
          <p className="font-bold">{seniorManagement || 0}</p>
          <p>{t('senior_management')}</p>
        </div>
      </div>
    </div>
  );
};

export default CorporateOverview;
