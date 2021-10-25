import React from 'react';
import SearchBox from './SearchBox';
import { useTranslations } from 'next-intl';
import SettingsSettings from '../../lib/settings/settings.settings';
import SelectMenu from '../elements/SelectMenu';

export type SimpleValue = {
  optionValue: string;
};

type AdvancedSearchType = {
  handleSearchReg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectCountry: (value: SimpleValue) => void;
  handleSelectCurrency: (SimpleValue: SimpleValue) => void;
  selectedCurrency: SimpleValue;
};
const AdvancedSearch = ({
  handleSearchReg,
  handleSelectCountry,
  selectedCurrency,
  handleSelectCurrency
}: AdvancedSearchType) => {
  // list of all currencies
  const currencies: SimpleValue[] = SettingsSettings.supportedCurrencies;

  const t = useTranslations();
  return (
    <form>
      <div className="my-4 flex justify-between items-center">
        <div className="py-2 w-1/2">
          <p className="text-lg font-semibold py-1">
            {t('company_registration')}
          </p>
          <p>{t('the_identification_number_for_the_company')}</p>
        </div>
        <div className="w-1/3">
          <SearchBox
            required={true}
            placeholder="123456789"
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
            defaultValue={t('account_type')}
            setSelectedValue={handleSelectCountry}
          />
        </div>
      </div>

      <div className="my-4 flex justify-between items-center">
        <div className="py-2 w-1/2">
          <p className="text-lg font-semibold py-1">{t('currency')}</p>
          <p>{t('will_switch_based_on_country_selected')}</p>
        </div>

        <div className="w-1/3">
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
