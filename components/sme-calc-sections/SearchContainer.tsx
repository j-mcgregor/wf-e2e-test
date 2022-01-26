import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslations } from 'use-intl';

import appState, { userReports } from '../../lib/appState';
import SettingsSettings from '../../lib/settings/settings.settings';
import {
  orbisAvailableSearchCountries,
  validCountryCodes
} from '../../lib/settings/sme-calc.settings';
import fetcher from '../../lib/utils/fetcher';
import { CompanyType } from '../../types/global';
import Button from '../elements/Button';
import ErrorMessage from '../elements/ErrorMessage';
import AdvancedSearch, { SimpleValue } from './AdvancedSearch';
import AlternativeSearchBox from './AlternativeSearchBox';
import BasicSearch from './BasicSearch';
import SearchBox from './SearchBox';

interface SearchContainerProps {
  disabled: boolean;
}

const SearchContainer = ({ disabled }: SearchContainerProps) => {
  const t = useTranslations();
  const router = useRouter();

  const currencies: SimpleValue[] = SettingsSettings.supportedCurrencies;

  const countries: SimpleValue[] = SettingsSettings.supportedCountries;

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });

  const [regSearchValue, setRegSearchValue] = useState<string | null>();

  const [selectedCountry, setSelectedCountry] = useState<
    SimpleValue | undefined
  >(undefined);

  const [selectedCurrency, setSelectedCurrency] = useState<
    SimpleValue | undefined
  >(undefined);

  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(
    null
  );

  // toggle the advance search
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);

  // NEW - Matches if selected country is in the alternative countries array
  const isOrbisSearchCountry = orbisAvailableSearchCountries.filter(
    x => x === selectedCountry?.code?.toLowerCase()
  );

  // determine if the country has a search API from list
  // list in sme-calc.settings.ts
  const countryHasSearchAPI =
    validCountryCodes.indexOf(`${selectedCountry?.code}`) > -1 ||
    isOrbisSearchCountry.length !== 0;

  useEffect(() => {
    const country = countries.find(x => x.code === defaultCountry);
    setSelectedCountry(country);

    // const currency = countries.find(x => x.currency_code === defaultCurrency);
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
      x => x.optionValue === selectedCountry?.optionName
    );

    matchedCurrency && setSelectedCurrency(matchedCurrency);

    // if the country does not have a search API then open advance search
    !countryHasSearchAPI && setShowAdvanceSearch(true);

    // if the country has a search API close advance search to encourage basic search
    countryHasSearchAPI && setShowAdvanceSearch(false);

    // if it is an active alternative search country, set advance search to false
    isOrbisSearchCountry.length !== 0 && setShowAdvanceSearch(false);
  }, [selectedCountry]);

  // validate the generate report button
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

  const setReports = useSetRecoilState(userReports);

  const handleGenerateReport = async (): Promise<void> => {
    setLoading(true);

    const params = {
      iso_code: selectedCountry?.optionValue,
      company_id: selectedCompany?.company_number || regSearchValue,
      currency: selectedCurrency?.code,
      accounts_type: 0
    };

    const sentryExtraInfo = {
      data: {
        body: {
          ...params,
          country: selectedCountry?.optionName,
          company_name: selectedCompany?.title
        }
      }
    };

    try {
      const createReportRes = await fetcher(
        '/api/reports/report',
        'POST',
        params
      );

      // update state on creation of report with the new total list of reports from the API
      const fetchReportsRes = await fetcher('/api/user/reports');

      if (createReportRes?.reportId) {
        // set the global state to the new list of reports
        if (fetchReportsRes.ok) {
          setReports(reports => ({
            ...reports,
            allReports: fetchReportsRes.data
          }));
        }
        // redirect to the report page
        router.push(`/report/${createReportRes.reportId}`);
      }

      if (!createReportRes?.reportId) {
        Sentry.captureException(new Error(createReportRes.error), {
          extra: {
            data: {
              ...sentryExtraInfo.data,
              ok: createReportRes.ok
            }
          }
        });

        setError({
          error: createReportRes.error,
          message: createReportRes.message
        });
        setLoading(false);
      }
    } catch (err) {
      Sentry.captureException(err, {
        extra: sentryExtraInfo
      });
    }
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
          {/* show original search box when UK is selected  */}
          {selectedCountry?.code === 'GB' && (
            <SearchBox
              disabled={showAdvanceSearch}
              countryCode={selectedCountry?.optionValue}
              setChosenResult={(company: CompanyType | null) =>
                setSelectedCompany(company)
              }
            />
          )}

          {isOrbisSearchCountry.length !== 0 && (
            <AlternativeSearchBox
              disabled={showAdvanceSearch}
              countryCode={selectedCountry?.optionValue}
              setChosenResult={(company: CompanyType | null) =>
                setSelectedCompany(company)
              }
            />
          )}
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

        {(error.error || error.message) && (
          <div className="py-4 px-2 border-2 rounded-md border-red-400 bg-red-50 my-2">
            {error.error && <ErrorMessage text={t(`${error.error}`)} />}
            {error.message && (
              <ErrorMessage className="font-bold mt-2" text={error.message} />
            )}
          </div>
        )}

        <div className="flex sm:flex-row flex-col items-center my-6">
          <Button
            variant="highlight"
            className="text-primary rounded-none w-full mb-2 sm:mb-0 sm:max-w-[200px]"
            disabled={!canGenerateReport || loading}
            loading={loading}
            onClick={handleGenerateReport}
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
