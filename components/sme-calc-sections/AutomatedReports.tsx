import { useTranslations } from 'use-intl';
import SelectMenu from '../elements/SelectMenu';
import SearchBox from '../elements/SearchBox';

const AutomatedReports = () => {
  const t = useTranslations();

  return (
    <div className="text-sm">
      <div className="py-4">
        <p className="text-3xl font-semibold py-2">{t('automated_reports')}</p>
        <p>{t('access_our_powerful_credit_risk_assessment')}</p>
      </div>

      <div className="bg-white rounded-sm shadow-sm px-8 py-4">
        <p className="text-2xl font-semibold py-4">{t('find_the_company')}</p>

        <div className="flex justify-between">
          <div className="py-2">
            <p className="text-lg font-semibold py-1">{t('country')}</p>
            <p>{t('the_country_where_the_company_is_based')}</p>
          </div>
          <div className="w-1/3">
            <SelectMenu />
          </div>
        </div>

        <div className="py-2">
          <p className="text-lg font-semibold py-1">{t('company_search')}</p>
          <p>{t('search_the_registered_companies_by_name')}</p>
        </div>
        <SearchBox placeholder={t('enter_company_name')} />
      </div>
    </div>
  );
};

export default AutomatedReports;
