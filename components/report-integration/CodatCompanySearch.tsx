import { QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import React, { KeyboardEventHandler, useMemo, useRef, useState } from 'react';

import useOutsideClick from '../../hooks/useOutsideClick';
import debounce from '../../lib/utils/debounce';
import { CodatCompanyType } from '../../types/report';
import LoadingIcon from '../svgs/LoadingIcon';

interface ICodatCompanySearchProps {
  disabled: boolean;
  data: any[];
  searchFunction: (searchValue: CodatCompanyType) => void;
  setChosenResult: (option: CodatCompanyType) => void;
  selectedResult: CodatCompanyType | null;
}

const data: CodatCompanyType[] = [
  {
    company_id: '7d7fd6ee-2d8e-4038-963c-839381eea4d2',
    connection_id: '449d32fc-a354-44c5-a122-3e0abc0484d2',
    company_name: 'Large UK Company - Sandbox'
  },
  {
    company_id: '3244dba1-5e79-40be-8128-7e4172a9356b',
    connection_id: 'b8835617-1445-47f2-9aef-08083db7cfc1',
    company_name: 'Xero USD UAT-1'
  },
  {
    company_id: '7d7fd6ee-2d8e-4038-963c-839381eea4d2',
    connection_id: '449d32fc-a354-44c5-a122-3e0abc0484d2',
    company_name: 'Large UK Company - Sandbox'
  },
  {
    company_id: '3244dba1-5e79-40be-8128-7e4172a9356b',
    connection_id: 'b8835617-1445-47f2-9aef-08083db7cfc1',
    company_name: 'Xero USD UAT-1'
  },
  {
    company_id: '7d7fd6ee-2d8e-4038-963c-839381eea4d2',
    connection_id: '449d32fc-a354-44c5-a122-3e0abc0484d2',
    company_name: 'Large UK Company - Sandbox'
  },
  {
    company_id: '3244dba1-5e79-40be-8128-7e4172a9356b',
    connection_id: 'b8835617-1445-47f2-9aef-08083db7cfc1',
    company_name: 'Xero USD UAT-1'
  }
];

const CodatCompanySearch = ({
  disabled,
  // data = [],
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

    return data.filter(
      item =>
        item.company_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.company_id.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.connection_id.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

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
              <>
                <QuestionMarkCircleIcon
                  className="mb-1 w-6 h-6"
                  aria-hidden="true"
                />
                {noResultsFoundText}
              </>
            )
          )}

          {filteredData
            .sort((a: CodatCompanyType, b: CodatCompanyType) =>
              a.company_name.localeCompare(b.company_name)
            )
            .map((option, index) => (
              <button
                key={option.company_id + `${index}`}
                className="bg-bg w-full p-5 text-left"
                onClick={() => handleClick(option)}
              >
                <p className="font-bold">{option.company_name}</p>
                <p>{option.company_id}</p>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CodatCompanySearch;
