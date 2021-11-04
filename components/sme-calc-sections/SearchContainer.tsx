import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import Button from '../elements/Button';
import AdvancedSearch, { SimpleValue } from './AdvancedSearch';
import { CompanyType } from '../../types/global';
import BasicSearch from './BasicSearch';
import SearchBox from './SearchBox';
import { useRecoilValue } from 'recoil';
import appState from '../../lib/appState';
import {
  supportedCountries,
  supportedCurrencies,
  validCountryCodes
} from '../../lib/settings/sme-calc.settings';

interface SearchContainerProps {
  disabled: boolean;
}

const SearchContainer = ({ disabled }: SearchContainerProps) => {
  const t = useTranslations();

  const currencies: (SimpleValue & { name: string })[] = supportedCurrencies;
  const countries: SimpleValue[] = supportedCountries;

  const { user } = useRecoilValue(appState);
  // default country taken from user profile (settings)
  const defaultCountry = user?.preferences?.defaults?.reporting_country;
  const defaultCurrency = user?.preferences?.defaults?.currency;
  // helper function to get index of an optionValue
  const getIndex = (item: SimpleValue, array: SimpleValue[]) => {
    return array.findIndex(e => {
      return e.optionValue === item?.optionValue ? true : null;
    });
  };

  const [regSearchValue, setRegSearchValue] = useState<string | null>();

  const [selectedCountry, setSelectedCountry] = useState<
    SimpleValue | undefined
  >(undefined);

  // get the country code for the search API
  const countryCode = selectedCountry?.code;

  const [selectedCurrency, setSelectedCurrency] = useState<
    SimpleValue | undefined
  >(undefined);

  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(
    null
  );

  // determine if the country has a search API from list
  // list in sme-calc.settings.ts
  const countryHasSearchAPI =
    validCountryCodes.indexOf(`${selectedCountry?.code}`) > -1;

  // toggle the advance search
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);

  useEffect(() => {
    const country = countries.find(x => x.code === defaultCountry);
    setSelectedCountry(country);
    const currency = currencies.find(x => x.code === defaultCurrency);
    setSelectedCurrency(currency);
  }, [user]);

  // hides the advance search when disabled
  useEffect(() => {
    disabled && setShowAdvanceSearch(false);
  }, [disabled]);

  // re-render currency when new country is selected from dropdown & open advanced search if country is not UK
  useEffect(() => {
    // TO DO: this is not an effective way to match the two data sets
    // it is just being used as a placeholder till we create a list of
    // countries that WF operates in can use
    const matchedCurrency = currencies.find(
      x => x.name === selectedCountry?.optionValue
    );
    matchedCurrency && setSelectedCurrency(matchedCurrency);

    // if the country does not have a search API then open advance search
    !countryHasSearchAPI && setShowAdvanceSearch(true);

    // if the country has a search API close advance search to encourage basic search
    countryHasSearchAPI && setShowAdvanceSearch(false);
  }, [selectedCountry]);

  // validate the generate report bu  tton
  const canGenerateReport = selectedCompany || regSearchValue;

  //? event handlers
  const handleSelectCountry = (value: SimpleValue): void => {
    return setSelectedCountry(value);
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
          isUsingAdvanceSearch={showAdvanceSearch}
          selectedCountry={selectedCountry}
          clearCompanySelection={() => setSelectedCompany(null)}
          handleSelectCountry={handleSelectCountry}
        >
          <SearchBox
            disabled={showAdvanceSearch}
            countryCode={countryCode}
            setChosenResult={(company: CompanyType | null) =>
              setSelectedCompany(company)
            }
          />
        </BasicSearch>

        {/* SEARCH OPTIONS TO ONLY SHOW IF NOT UK */}
        {showAdvanceSearch && (
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
            disabled={!canGenerateReport}
          >
            {t('generate_report')}
          </Button>
          <button
            disabled={disabled}
            onClick={() => {
              setShowAdvanceSearch(!showAdvanceSearch);
              setSelectedCompany(null);
            }}
            className={`${!countryHasSearchAPI && 'hidden'} ${
              disabled ? 'cursor-default' : 'cursor-pointer'
            } mx-4 hover:opacity-80`}
          >
            {!showAdvanceSearch ? t('advanced_search') : t('basic_search')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
