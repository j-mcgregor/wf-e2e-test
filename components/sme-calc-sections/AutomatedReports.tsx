import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import { XIcon } from '@heroicons/react/outline';
import SettingsSettings from '../../lib/settings/settings.settings';
import SelectMenu from '../elements/SelectMenu';
import SearchBox from './SearchBox';
import Button from '../elements/Button';
import debounce from '../../lib/utils/debounce';
import useSWR from 'swr';
import fetcher from '../../lib/utils/fetcher';
import { Company } from '../../types/global';

type Value = {
  optionValue: string;
};

interface AutomatedReportsProps {
  disabled: boolean;
}

const AutomatedReports = ({ disabled }: AutomatedReportsProps) => {
  const t = useTranslations();

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

  const [companySearchValue, setCompanySearchValue] = useState('');
  const [regSearchValue, setRegSearchValue] = useState<string | null>();
  const [companies, setCompanies] = useState<Company[] | []>([]);
  const [selectedCountry, setSelectedCountry] = useState<Value>(
    countries[Number(defaultIndex)]
  );
  const [selectedCurrency, setSelectedCurrency] = useState<Value>(
    currencies[Number(defaultIndex)]
  );
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const isUK = selectedCountry.optionValue === 'United Kingdom';
  const [advancedSearch, setAdvancedSearch] = useState(isUK ? false : true);
  const selectedCountryIndex = getIndex(selectedCountry, countries);

  //? some useEffect hooks for controlling rendering of various options
  // query to mock companies api - value as query parameter
  const { data } = useSWR(
    `/api/search-companies?query=${companySearchValue}`,
    fetcher
  );

  // run useEffect to set companies to result of SWR api request, via debounce function to delay typed results
  useEffect(() => {
    const debounceCompanySearch = debounce(() => setCompanies(data), 200);
    debounceCompanySearch();
  }, [companySearchValue]);

  useEffect(() => {
    disabled && setAdvancedSearch(false);
  }, [disabled]);
  // re-render currency when new country is selected from dropdown & open advanced search if country is not UK
  useEffect(() => {
    setSelectedCurrency(currencies[Number(selectedCountryIndex)]);
    !isUK && setAdvancedSearch(true);
  }, [selectedCountry]);

  // if default is UK when 'basic search' is selected, reset country to UK
  useEffect(() => {
    !advancedSearch &&
      !isUK &&
      setSelectedCountry(countries[Number(selectedCountryIndex)]);
  }, [advancedSearch]);

  const isValid = selectedCompany || regSearchValue ? true : false;

  //? event handlers
  const handleSelectCountry = (value: Value): void => {
    setCompanySearchValue('');
    setSelectedCountry(value);
  };

  const handleSearchCompany = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCompanySearchValue(e.target.value);
  };

  const handleResetSearchValue = () => {
    setCompanySearchValue('');
  };

  const handleSearchReg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegSearchValue(e.target.value);
  };

  const handleSelectCurrency = (value: Value): void => {
    const currency = getIndex(value, currencies);
    setSelectedCurrency(currencies[Number(currency)]);
  };

  return (
    <div className="text-sm my">
      <div className="py-4">
        <p className="text-3xl font-semibold py-2">{t('automated_reports')}</p>
        <p>{t('access_our_powerful_credit_risk_assessment')}</p>
      </div>
      <div
        className={`${
          disabled && 'text-opacity-20'
        } text-primary bg-white rounded-sm shadow-sm px-8 py-4`}
      >
        <p className="text-2xl font-semibold py-4">{t('find_the_company')}</p>

        <div className="flex justify-between">
          <div className="py-2">
            <p className="text-lg font-semibold py-1">{t('country')}</p>
            <p>{t('the_country_where_the_company_is_based')}</p>
          </div>

          <div className="w-1/3">
            <SelectMenu
              disabled={disabled}
              values={countries}
              defaultValue={defaultCountry}
              selectedValue={selectedCountry}
              setSelectedValue={handleSelectCountry}
            />
          </div>
        </div>

        <div
          className={`${
            disabled === true || advancedSearch === true ? 'opacity-20' : null
          } text-primary `}
        >
          <div className="py-2">
            <p className="text-lg font-semibold py-1">{t('company_search')}</p>
            <p>{t('search_the_registered_companies_by_name')}</p>
          </div>

          <SearchBox
            disabled={advancedSearch === true || disabled === true}
            placeholder={t('enter_company_name')}
            onChange={e => handleSearchCompany(e)}
            value={companySearchValue}
            resetValue={handleResetSearchValue}
            options={companies}
            setOption={(company: Company | null) => setSelectedCompany(company)}
          />
        </div>

        {selectedCompany && (
          <div className="bg-bg flex w-full p-6 my-4 justify-between">
            <p className="font-semibold">{selectedCompany.name}</p>
            <div className="flex items-center">
              <p>1232334345</p>
              <XIcon className="w-5 h-5 ml-4 cursor-pointer hover:opacity-80" />
            </div>
          </div>
        )}

        {/* SEARCH OPTIONS TO ONLY SHOW IF NOT UK */}
        {advancedSearch && (
          <div>
            <div className="my-4 flex justify-between items-center">
              <div className="py-2 w-1/2">
                <p className="text-lg font-semibold py-1">
                  {t('company_registration')}
                </p>
                <p>{t('the_identification_number_for_the_company')}</p>
              </div>
              <div className="w-1/3">
                <SearchBox
                  placeholder="123456789"
                  onChange={e => handleSearchReg(e)}
                />
              </div>
            </div>

            <div className="my-4 flex justify-between items-center">
              <div className="py-2 w-1/2">
                <p className="text-lg font-semibold py-1">
                  {t('account_type')}
                </p>
                <p>{t('choose_the_type_of_accounts_to_generate')}</p>
              </div>

              <div className="w-1/3">
                <SelectMenu
                  defaultValue={t('account_type')}
                  setSelectedValue={handleSelectCountry}
                />
              </div>
            </div>

            <div className="my-4 flex justify-between items-center">
              <div className="py-2 w-1/2">
                <p className="text-lg font-semibold py-1">{t('currency')}</p>
                <p>{t('will_switch_based_on_country_selected')}</p>
              </div>

              <div className="w-1/3">
                <SelectMenu
                  values={currencies}
                  defaultValue={selectedCurrency}
                  selectedValue={selectedCurrency}
                  setSelectedValue={handleSelectCurrency}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center my-6">
          <Button
            variant="highlight"
            className="text-primary rounded-none"
            disabled={!isValid}
          >
            {t('generate_report')}
          </Button>
          <button
            disabled={disabled}
            onClick={() => setAdvancedSearch(!advancedSearch)}
            className={`${!isUK && 'hidden'} ${
              disabled ? 'cursor-default' : 'cursor-pointer'
            } mx-4 hover:opacity-80`}
          >
            {!advancedSearch ? t('advanced_search') : t('basic_search')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomatedReports;
