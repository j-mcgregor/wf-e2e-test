/* eslint-disable sonarjs/no-duplicate-string */
import localisationJSON from '../../lib/data/localisation.json';
import currencyJSON from '../../lib/data/countryCurrency.json';
import countryCodeJSON from '../../lib/data/countryCodes.json';
import { createCurrencyString } from '../utils/text-helpers';

const SettingsSettings = {
  dashboardOptionValues: ['dashboard', 'reports', 'sme_calculator'],
  supportedLocales: localisationJSON.map(value => {
    return { optionValue: value.code, optionName: value.locale };
  }),

  supportedCountries: countryCodeJSON.map(country => ({
    optionName: country.name,
    optionValue: country.code,
    code: country.code
  })),

  supportedCurrencies: countryCodeJSON.map(country => ({
    optionName: createCurrencyString({
      name: country.name,
      currency_symbol: country.currency_symbol,
      currency_code: country.currency_code
    }),
    optionValue: country.name,
    code: country.currency_code
  })),

  preferences: {
    defaults: {
      locale: 'en-GB',
      currency: 'GBP',
      home_page: 'dashboard',
      reporting_country: 'GB'
    }
  }
};

export default SettingsSettings;
