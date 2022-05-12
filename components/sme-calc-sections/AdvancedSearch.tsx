import React from 'react';
import { useTranslations } from 'next-intl';
import SettingsSettings from '../../lib/settings/settings.settings';
import SelectMenu from '../elements/SelectMenu';
import Input from '../elements/Input';
import { accountTypes } from '../../lib/settings/report.settings';

export type SimpleValue = {
  optionValue: string;
  code?: string;
  optionName?: string;
};

type AdvancedSearchType = {
  handleSearchReg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectCountry: (value: SimpleValue) => void;
  handleSelectAccountType: (value: SimpleValue) => void;
  handleSelectCurrency: (SimpleValue: SimpleValue) => void;
  selectedCurrency?: SimpleValue;
};

const AdvancedSearch = ({
  handleSearchReg,
  handleSelectAccountType,
  selectedCurrency,
  handleSelectCurrency
}: AdvancedSearchType) => {
  // list of all currencies
  const currencies: SimpleValue[] = SettingsSettings.supportedCurrencies;

  const t = useTranslations();

  return (
    <form>
      <div className="my-4 flex sm:flex-row flex-col justify-between items-center">
        <div className="py-2 sm:w-1/2">
          <p className="text-lg font-semibold py-1">
            {t('company_registration')}
          </p>
          <p>{t('the_identification_number_for_the_company')}</p>
        </div>
        <div className="w-full sm:w-1/3">
          <Input
            name="company_number"
            className="appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black bg-bg"
            placeholder="123456789"
            type={'text'}
            onChange={e => handleSearchReg(e)}
          />
        </div>
      </div>

      <div className="my-4 flex justify-between items-center">
        <div className="py-2 w-1/2">
          <p className="text-lg font-semibold py-1">{t('account_type')}</p>
          <p>{t('choose_the_type_of_accounts_to_generate')}</p>
        </div>

        <div className="w-1/3">
          <SelectMenu
            values={accountTypes}
            defaultValue={accountTypes[0]}
            selectedValue={accountTypes[0]}
            setSelectedValue={handleSelectAccountType}
          />
        </div>
      </div>

      <div className="my-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="py-2 sm:w-1/2 w-full">
          <p className="text-lg font-semibold py-1">{t('currency')}</p>
          <p>{t('will_switch_based_on_country_selected')}</p>
        </div>

        <div className="sm:w-1/3 w-full">
          <SelectMenu
            values={currencies}
            defaultValue={selectedCurrency}
            selectedValue={selectedCurrency}
            setSelectedValue={handleSelectCurrency}
          />
        </div>
      </div>
    </form>
  );
};

export default AdvancedSearch;
