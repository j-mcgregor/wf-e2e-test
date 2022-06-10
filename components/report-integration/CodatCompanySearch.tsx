import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import React, { KeyboardEventHandler, useMemo, useRef, useState } from 'react';

import useOutsideClick from '../../hooks/useOutsideClick';
import debounce from '../../lib/utils/debounce';
import { convertToDateString } from '../../lib/utils/text-helpers';
import { CodatCompanyType } from '../../types/report';
import LoadingIcon from '../svgs/LoadingIcon';

interface ICodatCompanySearchProps {
  disabled: boolean;
  data: CodatCompanyType[];
  searchFunction: (searchValue: CodatCompanyType) => void;
  setChosenResult: (option: CodatCompanyType) => void;
  selectedResult: CodatCompanyType | null;
}

const CodatCompanySearch = ({
  disabled,
  data = [],
  selectedResult,
  setChosenResult
}: ICodatCompanySearchProps) => {
  const t = useTranslations();

  const [searchHasFocus, setSearchHasFocus] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredData = useMemo(() => {
    if (!searchValue || searchValue === '') {
      return data;
    }
    const preRegex = `${searchValue?.toLowerCase()?.trim()}`;
    const searchRegex = new RegExp(preRegex);

    return data.filter(item => {
      return searchRegex.test(item.company_name.toLowerCase());
    });
  }, [searchValue, data]);

  const loadingText = t('loading');
  const searchStartText = t('search_start');
  const noResultsFoundText = t('no_results_found');

  const handleClick = (option: CodatCompanyType) => {
    setChosenResult(option);
    return setSearchHasFocus(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Escape') {
      inputRef?.current?.blur();
      return setSearchHasFocus(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const companySearch = debounce(() => setSearchValue(e.target.value), 1000);
    companySearch();
  };

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
        {filteredData && filteredData.length > 0 && (
          <label className="absolute right-5">
            {filteredData?.length} results
          </label>
        )}
      </div>
      {searchHasFocus && !selectedResult && (
        <div className="flex flex-col gap-4 mt-4 max-h-96 overflow-y-scroll">
          {searchValue && !data ? (
            // shows if there is searchValue but no data (loading)
            <>
              <LoadingIcon className="mb-1 w-6 h-6" aria-hidden="true" />
              {loadingText}
            </>
          ) : !filteredData || (!searchValue && filteredData?.length === 0) ? (
            // shows if there is no data at all (initial stage)
            // also shows if there is no text input and the search data has a length of 0
            <>
              <SearchIcon className="mb-1 w-6 h-6" aria-hidden="true" />
              {searchStartText}
            </>
          ) : (
            searchValue &&
            filteredData?.length === 0 && (
              // shows if there is searchValue
              // is overridden and hidden by the component below
              // which shows when there is data
              <div className="flex justify-center space-x-2 flex-col items-center py-4">
                <QuestionMarkCircleIcon
                  className="mb-1 w-6 h-6"
                  aria-hidden="true"
                />
                <p>{noResultsFoundText}</p>
              </div>
            )
          )}

          {filteredData
            .sort((a: CodatCompanyType, b: CodatCompanyType) =>
              a.company_name.localeCompare(b.company_name)
            )
            .map((option, index) => (
              <button
                key={option.company_id + `${index}`}
                className="bg-bg w-full p-5 text-left flex flex-col md:flex-row justify-between gap-4"
                onClick={() => handleClick(option)}
              >
                <div>
                  <p className="font-bold">{option.company_name}</p>
                  <p>{option.company_id}</p>
                </div>
                <div className="md:text-right">
                  <p className="font-bold">Data availability</p>
                  <p className="text-sm">{`${convertToDateString(
                    option.first
                  )} - ${convertToDateString(option.last)}`}</p>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CodatCompanySearch;
