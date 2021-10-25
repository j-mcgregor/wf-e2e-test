import React, { ReactNode } from 'react';
import SelectMenu from '../elements/SelectMenu';
import { XIcon } from '@heroicons/react/outline';
import { SimpleValue } from './AdvancedSearch';
import SettingsSettings from '../../lib/settings/settings.settings';
import { useTranslations } from 'next-intl';
import { CompanyType } from '../../types/global';

type BasicSearchType = {
  selectedCompany: CompanyType | null;
  isUsingAdvanceSearch: boolean;
  selectedCountry: SimpleValue;
  clearCompanySelection: () => void;
  handleSelectCountry: (v: SimpleValue) => void;
  children?: ReactNode;
};

const BasicSearch = ({
  selectedCompany,
  isUsingAdvanceSearch,
  selectedCountry,
  handleSelectCountry,
  clearCompanySelection,
  children
}: BasicSearchType) => {
  const countries: SimpleValue[] = SettingsSettings.supportedCountries;
  // default country taken from user profile (settings)
  const defaultCountry =
    SettingsSettings.defaultOptions.preferences.default_reporting_country;
  const t = useTranslations();
  return (
    <>
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

      <div
        className={`${
          isUsingAdvanceSearch ? 'opacity-20' : null
        } text-primary `}
      >
        <div className="py-2">
          <p className="text-lg font-semibold py-1">{t('company_search')}</p>
          <p>{t('search_the_registered_companies_by_name')}</p>
        </div>

        {/* Search Box Renders here */}
        {children}
      </div>

      {selectedCompany && (
        <div className="bg-bg flex w-full p-6 my-4 justify-between">
          <p className="font-bold">{selectedCompany.title}</p>
          <div className="flex items-center">
            <p>{selectedCompany.company_number}</p>
            <button onClick={clearCompanySelection}>
              <XIcon className="w-5 h-5 ml-4 cursor-pointer hover:opacity-80" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicSearch;
