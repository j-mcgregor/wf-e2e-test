import { useTranslations } from 'next-intl';

interface CorporateOverviewProps {
  ceo: string;
  cfo: string;
  chairman: string;
  directors: number;
  shareholders: number;
  employees: number;
  subsidiaries: number;
  seniorManagement?: number;
}

const CorporateOverview = ({
  ceo,
  cfo,
  chairman,
  directors,
  shareholders,
  employees,
  subsidiaries,
  seniorManagement
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

        {/* ===== middle row ===== */}
        <div
          className={`${reverseTextPrint} p-4 print:border-b-2 border-b md:border-r print:border-t-2 print:border-r-2`}
          data-testid="corp-directors-testid"
        >
          <p className="font-bold">{directors || t('na')}</p>
          <p>{t('directors')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 border-r border-b print:border-b-2 print:border-t-2`}
        >
          <p className="font-bold">{seniorManagement || t('na')}</p>
          <p>{t('senior_management')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 print:border-b-2 print:border-t-2 print:border-r-2 border-b `}
          data-testid="corp-snr-mgmt-testid"
        >
          <p className="font-bold">{employees || t('na')}</p>
          <p>{t('employees')}</p>
        </div>

        {/* ===== new row  */}
        <div
          className={`${reverseTextPrint} p-4 print:border-b-2 border-r border-b md:border-b-0 print:border-t-2 print:border-r-2`}
        >
          <p className="font-bold">{subsidiaries || t('na')}</p>
          <p>{t('subsidiaries')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 border-r border-b print:border-b-2 print:border-t-2`}
          data-testid="corp-shareholders-testid"
        >
          <p className="font-bold">{shareholders || t('na')}</p>
          <p>{t('shareholders')}</p>
        </div>
        <div
          className={`${reverseTextPrint} p-4 print:border-b-2 print:border-t-2 print:border-r-2`}
        >
          {/* <p className="font-bold">{employees || t('na')}</p>
          <p>{t('placeholder')}</p> */}
        </div>
      </div>
    </div>
  );
};

export default CorporateOverview;
