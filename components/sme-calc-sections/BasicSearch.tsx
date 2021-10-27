import React, { ReactNode } from 'react';
import SelectMenu from '../elements/SelectMenu';
import { XIcon } from '@heroicons/react/outline';
import { SimpleValue } from './AdvancedSearch';
import SettingsSettings from '../../lib/settings/settings.settings';
import { useTranslations } from 'next-intl';
import { CompanyType } from '../../types/global';
import ResultCompany from '../elements/ResultCompany';

type BasicSearchType = {
  selectedCompany: CompanyType | null;
  isUsingAdvanceSearch: boolean;
  selectedCountry?: SimpleValue;
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
        <div className="pb-4">
          <p className="text-lg font-semibold py-1">{t('country')}</p>
          <p>{t('the_country_where_the_company_is_based')}</p>
        </div>

        <div className="w-1/3 pt-2">
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
        } text-primary mb-4 `}
      >
        <div className="py-2">
          <p className="text-lg font-semibold py-1">{t('company_search')}</p>
          <p>{t('search_the_registered_companies_by_name')}</p>
        </div>

        {/* Search Box Renders here */}
        {children}
      </div>

      {selectedCompany && (
        <ResultCompany
          name={selectedCompany.title}
          company_id={selectedCompany.company_number}
          registered_address={selectedCompany.address_snippet}
          registration_date={selectedCompany.date_of_creation}
          clearSelection={clearCompanySelection}
        />
      )}
    </>
  );
};

export default BasicSearch;
