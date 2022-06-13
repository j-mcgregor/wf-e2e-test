import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  SearchIcon
} from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';

import useOutsideClick from '../../hooks/useOutsideClick';
import debounce from '../../lib/utils/debounce';
import fetcher from '../../lib/utils/fetcher';
import { isJsonString } from '../../lib/utils/json-helpers';
import { CompanyType } from '../../types/global';
import ResultCompany from '../elements/ResultCompany';
import LoadingIcon from '../svgs/LoadingIcon';

interface SearchBoxProps {
  disabled?: boolean;
  countryCode?: string;
  setChosenResult: (e: CompanyType | null) => void;
}

const SearchBox = ({
  disabled,
  countryCode,
  setChosenResult
}: SearchBoxProps) => {
  const t = useTranslations();

  const [searchHasFocus, setSearchHasFocus] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>('');

  const loadingText = t('loading');
  const searchStartText = t('search_start');
  const noResultsFoundText = t('no_results_found');

  const handleClick = (option: CompanyType) => {
    setChosenResult(option);
    return setSearchHasFocus(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      inputRef?.current?.blur();
      return setSearchHasFocus(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const companySearch = debounce(() => setSearchValue(e.target.value), 1000);
    companySearch();
  };

  const { data } = useSWR<{
    data: CompanyType[];
    error?: string;
    message?: string;
  }>(
    searchValue &&
      searchHasFocus &&
      `/api/search-companies?query=${searchValue}&country=${countryCode}`,
    fetcher
  );

  useEffect(() => {
    if (data?.error) {
      Sentry.captureException(new Error(data.error), {
        extra: {
          data:
            data.message && isJsonString(data.message)
              ? JSON.parse(data.message)
              : data.message
        }
      });
    }
  }, [data]);

  // handle the closing of the dropdown so that state can be set
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setSearchHasFocus(false));

  return (
    <div ref={containerRef}>
      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>

        <input
          disabled={disabled}
          onFocus={() => setSearchHasFocus(true)}
          type="text"
          ref={inputRef}
          onKeyUp={handleKeyUp}
          name="search-companies"
          id="search-companies"
          className="focus:ring-highlight focus:border-highlight block w-full pl-10 text-sm border-primary rounded bg-bg"
          placeholder={`${t('enter_company_name')}`}
          onChange={e => handleChange(e)}
        />
        {data && data.data.length > 0 && (
          <label className="absolute right-5">
            {data?.data.length} results
          </label>
        )}
      </div>

      {/* Handles pre results, searching and no data */}
      {searchHasFocus && (
        <div className="relative">
          {searchHasFocus && (
            <div className="px-4 border border-primary rounded h-[100px] absolute w-full z-10 bg-white flex flex-col space-x-6 justify-center items-center text-xl">
              {searchValue && !data ? (
                // shows if there is searchValue but no data (loading)
                <>
                  <LoadingIcon className="mb-1 w-6 h-6" aria-hidden="true" />
                  {loadingText}
                </>
              ) : !data || (!searchValue && data?.data.length === 0) ? (
                // shows if there is no data at all (initial stage)
                // also shows if there is no text input and the search data has a length of 0
                <>
                  <SearchIcon className="mb-1 w-6 h-6" aria-hidden="true" />
                  {searchStartText}
                </>
              ) : (
                // shows if there is searchValue
                // is overridden and hidden by the component below
                // which shows when there is data
                <>
                  <QuestionMarkCircleIcon
                    className="mb-1 w-6 h-6"
                    aria-hidden="true"
                  />
                  {noResultsFoundText}
                </>
              )}
            </div>
          )}

          {data?.error && (
            <div className="px-4 border border-primary text-red-600 rounded overflow-y-scroll pt-4 h-[120px] text-center absolute w-full z-10 bg-white">
              <ExclamationCircleIcon className="h-6 w-6 mx-auto" />
              <h4 className="text-2xl ">
                Error when searching company details. Please try again later
              </h4>
              <p>If the problem persists please contact support.</p>
            </div>
          )}

          {/* Displays the results */}
          {data && data?.data.length > 0 && (
            <ul className="px-4 border border-primary rounded overflow-y-scroll pt-4 space-y-4 max-h-[400px] min-h-[120px] absolute w-full z-10 bg-white">
              {data?.data.map(company => {
                return (
                  <button
                    key={company.company_number}
                    className="flex justify-between hover:bg-bg hover:text-highlight cursor-pointer w-full"
                    onClick={() => handleClick(company)}
                  >
                    <ResultCompany
                      name={company.title}
                      company_id={company.company_number}
                      registered_address={company.address_snippet}
                      registration_date={company.date_of_creation}
                    />
                  </button>
                );
              })}
              {data?.data.length === 20 && (
                <button
                  type="button"
                  className="w-full flex justify-center pb-4 font-medium"
                >
                  {t('load_more')}
                </button>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
