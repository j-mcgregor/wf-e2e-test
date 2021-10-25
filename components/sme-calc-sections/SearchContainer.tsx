import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import SettingsSettings from '../../lib/settings/settings.settings';
import Button from '../elements/Button';
import debounce from '../../lib/utils/debounce';
import useSWR from 'swr';
import fetcher from '../../lib/utils/fetcher';
import AdvancedSearch, { SimpleValue } from './AdvancedSearch';
import { CompanyType } from '../../types/global';
import BasicSearch from './BasicSearch';
import SearchBox from './SearchBox';

interface AutomatedReportsProps {
  disabled: boolean;
}

const AutomatedReports = ({ disabled }: AutomatedReportsProps) => {
  const t = useTranslations();

  const currencies: SimpleValue[] = SettingsSettings.supportedCurrencies;
  const countries: SimpleValue[] = SettingsSettings.supportedCountries;
  // default country taken from user profile (settings)
  const defaultCountry =
    SettingsSettings.defaultOptions.preferences.default_reporting_country;

  // helper function to get index of an optionValue
  const getIndex = (item: SimpleValue, array: SimpleValue[]) => {
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
  const [companies, setCompanies] = useState<CompanyType[] | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<SimpleValue>(
    countries[Number(defaultIndex)]
  );
  const [selectedCurrency, setSelectedCurrency] = useState<SimpleValue>(
    currencies[Number(defaultIndex)]
  );
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(
    null
  );
  const isUK = selectedCountry.optionValue === 'United Kingdom';
  const [advancedSearch, setAdvancedSearch] = useState(isUK ? false : true);
  const selectedCountryIndex = getIndex(selectedCountry, countries);

  //? some useEffect hooks for controlling rendering of various options

  const countryCode = 'GB';

  const { data } = useSWR(
    `/api/search-companies?query=${companySearchValue}&country=${countryCode}`,
    fetcher
  );

  // run useEffect to set companies to result of SWR api request, via debounce function to delay typed results
  useEffect(() => {
    const debounceCompanySearch = debounce(() => setCompanies(data), 500);
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
  const handleSelectCountry = (value: SimpleValue): void => {
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

  const handleSelectCurrency = (value: SimpleValue): void => {
    const currency = getIndex(value, currencies);
    setSelectedCurrency(currencies[Number(currency)]);
  };

  return (
    <div className=" text-sm my">
      <div className="py-4">
        <p className="text-3xl font-semibold py-2">{t('sme_calculator')}</p>
        <p className="max-w-xl leading-loose">
          {t('access_our_powerful_credit_risk_assessment')}
        </p>
      </div>
      <div
        className={`${
          disabled && 'opacity-20 pointer-events-none'
        } text-primary bg-white rounded-sm shadow-sm px-8 py-4`}
      >
        <p className="text-2xl font-semibold py-4">{t('find_the_company')}</p>

        <BasicSearch
          selectedCompany={selectedCompany}
          isUsingAdvanceSearch={advancedSearch}
          selectedCountry={selectedCountry}
          clearCompanySelection={() => setSelectedCompany(null)}
          handleSelectCountry={handleSelectCountry}
        >
          <SearchBox
            disabled={advancedSearch}
            placeholder={t('enter_company_name')}
            onChange={e => handleSearchCompany(e)}
            value={companySearchValue}
            resetValue={handleResetSearchValue}
            options={companies}
            setOption={(company: CompanyType | null) =>
              setSelectedCompany(company)
            }
          />
        </BasicSearch>

        {/* SEARCH OPTIONS TO ONLY SHOW IF NOT UK */}
        {advancedSearch && (
          <AdvancedSearch
            handleSearchReg={handleSearchReg}
            handleSelectCountry={handleSelectCountry}
            selectedCurrency={selectedCurrency}
            handleSelectCurrency={handleSelectCurrency}
          />
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
