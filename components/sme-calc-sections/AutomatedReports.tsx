import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { XIcon } from '@heroicons/react/outline';
import SelectMenu from './SelectMenu';
import SearchBox from '../elements/SearchBox';
import Button from '../elements/Button';
import SettingsSettings from '../../lib/settings/settings.settings';
import { countries } from '../../lib/settings/sme-calc-settings.settings';

type Value = {
  optionValue: string;
};

const AutomatedReports = () => {
  const defaultCountry =
    SettingsSettings.defaultOptions.preferences.default_reporting_country;

  const defaultCountryIndex = countries.findIndex(e => {
    return e.optionValue === defaultCountry ? true : null;
  });

  const [searchValue, setSearchValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Value>(
    countries[defaultCountryIndex]
  );

  const t = useTranslations();

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleSelectCountry = (value: Value): void => {
    setSelectedCountry(value);
  };

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
            <SelectMenu
              values={countries}
              defaultValue={defaultCountry}
              selectedValue={selectedCountry}
              setSelectedValue={handleSelectCountry}
            />
          </div>
        </div>

        <div className="opacity-50 ">
          <div className="py-2">
            <p className="text-lg font-semibold py-1">{t('company_search')}</p>
            <p>{t('search_the_registered_companies_by_name')}</p>
          </div>

          <SearchBox
            disabled={defaultCountry !== 'United Kingdom'}
            placeholder={t('enter_company_name')}
            onChange={e => handleSearchValue(e)}
            value={searchValue}
          />
        </div>

        {/* TEMP PLACEHOLDER - WILL SPLIT OUT AND USE SEARCH TO GENERATE */}
        <div className="bg-bg flex w-full p-6 my-4 justify-between">
          <p className="font-semibold">Seabird Limited Company</p>
          <div className="flex items-center">
            <p>1232334345</p>
            <XIcon className="w-5 h-5 ml-4 cursor-pointer hover:opacity-80" />
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="highlight" className="text-primary rounded-none">
            {t('generate_report')}
          </Button>
          <p className="mx-4">{t('advanced_search')}</p>
        </div>
      </div>

      <div className="flex flex-col w-1/3">
        <p className="font-semibold py-4 mt-4">
          {t('cant_find_the_company_you_were_looking_for')}
        </p>
        <Button variant="alt" className="rounded-none font-normal">
          {t('provide_own_data')}
        </Button>
      </div>
    </div>
  );
};

export default AutomatedReports;
