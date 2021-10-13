import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import { XIcon } from '@heroicons/react/outline';
import SettingsSettings from '../../lib/settings/settings.settings';
import SelectMenu from '../elements/SelectMenu';
import SearchBox from '../elements/SearchBox';
import Button from '../elements/Button';

type Value = {
  optionValue: string;
};

const AutomatedReports = () => {
  const t = useTranslations();

  // arrays taken from settings
  const currencies: Value[] = SettingsSettings.supportedCurrencies;
  const countries: Value[] = SettingsSettings.supportedCountries;

  // default country taken from user profile (settings)
  const defaultCountry =
    SettingsSettings.defaultOptions.preferences.default_reporting_country;

  // helper function to get index of an optionValue
  const getIndex = (item: Value, array: Value[]) => {
    return array.findIndex(e => {
      return e.optionValue === item.optionValue ? true : null;
    });
  };

  // default index for country upon initial render
  const defaultIndex = countries.findIndex(e => {
    return e.optionValue === defaultCountry ? true : null;
  });

  //* STATE
  // state for input search box
  const [searchValue, setSearchValue] = useState('');
  // state for country selection dropdown
  const [selectedCountry, setSelectedCountry] = useState<Value>(
    countries[defaultIndex]
  );
  // state for currency selection dropdown
  const [selectedCurrency, setSelectedCurrency] = useState<Value>(
    currencies[defaultIndex]
  );

  // state for company selection dropdown
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // re-render currency when new country is selected from dropdown
  useEffect(() => {
    setSelectedCurrency(currencies[selectedCountryIndex]);
  }, [selectedCountry]);

  // get index of selected country for rendering currency in useEffect hook
  const selectedCountryIndex = getIndex(selectedCountry, countries);

  // variable if country is UK - for conditionally rendering extra selection inputs
  const isUK = selectedCountry.optionValue === 'United Kingdom';

  //* EVENT HANDLERS
  const handleSelectCountry = (value: Value): void => {
    setSearchValue('');
    setSelectedCountry(value);
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleSelectCurrency = (value: Value): void => {
    const currency = getIndex(value, currencies);
    setSelectedCurrency(currencies[currency]);
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

        <div className={`${!isUK && 'opacity-20'}`}>
          <div className="py-2">
            <p className="text-lg font-semibold py-1">{t('company_search')}</p>
            <p>{t('search_the_registered_companies_by_name')}</p>
          </div>

          <SearchBox
            disabled={!isUK}
            placeholder={t('enter_company_name')}
            onChange={e => handleSearchValue(e)}
            value={searchValue}
          />
        </div>

        {/* CARD TO ONLY SHOW WHEN COMPANY IS SELECTED FROM DROPDOWN */}
        {selectedCompany && (
          <div className="bg-bg flex w-full p-6 my-4 justify-between">
            <p className="font-semibold">Seabird Limited Company</p>
            <div className="flex items-center">
              <p>1232334345</p>
              <XIcon className="w-5 h-5 ml-4 cursor-pointer hover:opacity-80" />
            </div>
          </div>
        )}

        {/* SEARCH OPTIONS TO ONLY SHOW IF NOT UK */}

        {!isUK && (
          <div>
            <div className="my-4">
              <div className="py-2">
                <p className="text-lg font-semibold py-1">
                  {t('company_registration')}
                </p>
                <p>{t('the_identification_number_for_the_company')}</p>
              </div>

              <SearchBox
                placeholder="123456789"
                onChange={e => handleSearchValue(e)}
              />
            </div>
            <div className="my-4">
              <div className="py-2">
                <p className="text-lg font-semibold py-1">
                  {t('account_type')}
                </p>
                <p>{t('choose_the_type_of_accounts_to_generate')}</p>
              </div>

              <SelectMenu
                values={countries}
                defaultValue={defaultCountry}
                selectedValue={selectedCountry}
                setSelectedValue={handleSelectCountry}
              />
            </div>
            <div className="my-4">
              <div className="py-2">
                <p className="text-lg font-semibold py-1">{t('currency')}</p>
                <p>{t('will_switch_based_on_country_selected')}</p>
              </div>

              <SelectMenu
                values={currencies}
                defaultValue={selectedCurrency}
                selectedValue={selectedCurrency}
                setSelectedValue={handleSelectCurrency}
              />
            </div>
          </div>
        )}

        <div className="flex items-center my-6">
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
