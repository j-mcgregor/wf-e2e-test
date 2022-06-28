import {
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  SearchIcon
} from '@heroicons/react/outline';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';
import * as Sentry from '@sentry/nextjs';

import useOutsideClick from '../../hooks/useOutsideClick';
import fetcher from '../../lib/utils/fetcher';
import { CompanyType } from '../../types/global';
import ResultCompany from '../elements/ResultCompany';
import LoadingIcon from '../svgs/LoadingIcon';
import { isJsonString } from '../../lib/utils/json-helpers';

interface SearchBoxProps {
  disabled?: boolean;
  countryCode?: string;
  setChosenResult: (e: CompanyType | null) => void;
}

const AlternativeSearchBox = ({
  disabled,
  countryCode,
  setChosenResult
}: SearchBoxProps) => {
  const t = useTranslations();

  const [searchHasFocus, setSearchHasFocus] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>('');

  const [inputValue, setInputValue] = useState('');

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
    if (e.code === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = (): void => {
    if (inputValue.length > 0) {
      setSearchHasFocus(true);
      setSearchValue(inputValue);
    }
  };

  const { data } = useSWR(
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

  const disableSearch =
    inputValue.length === 0 || (!!searchValue && !data?.data);

  // handle the closing of the dropdown so that state can be set
  const containerRef = useRef<HTMLDivElement>(null);

  const isLoading = searchValue && !data?.data;

  useOutsideClick(containerRef, () => setSearchHasFocus(false));

  return (
    <div ref={containerRef}>
      <div className="mt-1 relative rounded-md shadow-sm flex flex-col sm:flex-row items-center">
        <div className="absolute inset-y-0 left-0 pl-3 h-10 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>

        <input
          disabled={disabled}
          type="text"
          ref={inputRef}
          onKeyUp={handleKeyUp}
          name="search-companies"
          id="search-companies"
          className="focus:ring-highlight focus:border-highlight block w-full pl-10 text-sm border-primary rounded bg-bg pr-56"
          placeholder={`${t('enter_company_name')}`}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setSearchHasFocus(true)}
        />
        {data && data?.data?.length > 0 && (
          <label className="absolute right-5 top-2 sm:right-[8.5rem]">
            {data?.data?.length} results
          </label>
        )}

        <button
          disabled={disableSearch}
          className={`sm:absolute block right-0 bg-primary h-full sm:!w-[120px] py-2 sm:py-0 w-full text-white text-base mt-2 sm:mt-0 sm:rounded-l-none rounded-md ${
            disableSearch && 'opacity-75 pointer-events-none'
          } `}
          onClick={() => handleSearch()}
        >
          {t('search')}
        </button>
      </div>

      {/* Handles pre results, searching and no data */}
      {searchHasFocus && (
        <div className="relative">
          {searchHasFocus && (
            <div className="px-4 border border-primary rounded h-[100px] absolute w-full z-10 bg-white flex flex-col space-x-6 justify-center items-center text-xl">
              {isLoading ? (
                // shows if there is searchValue but no data (loading)
                <>
                  <LoadingIcon className="mb-1 w-6 h-6" aria-hidden="true" />
                  {loadingText}
                </>
              ) : !data || (!searchValue && data?.data?.length === 0) ? (
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
              <h4 className="text-2xl ">Error fetching company data</h4>
              <p>Please contact support.</p>
            </div>
          )}

          {/* Displays the results */}
          {data && data?.data?.length > 0 && (
            <ul className="px-4 border border-primary rounded overflow-y-scroll pt-4 space-y-4 max-h-[400px] min-h-[120px] absolute w-full z-10 bg-white">
              {data?.data?.map((company: CompanyType) => {
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
                    />
                  </button>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AlternativeSearchBox;
