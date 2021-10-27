/* eslint-disable sonarjs/no-duplicate-string */
import localisationJSON from '../../lib/data/localisation.json';
import currencyJSON from '../../lib/data/countryCurrency.json';
import countryCodeJSON from '../../lib/data/countryCodes.json';
import { createCurrencyString } from '../utils/text-helpers';

const SettingsSettings = {
  dashboardOptionValues: ['dashboard', 'reports', 'sme_calc', 'sme_prospector'],
  supportedLocales: localisationJSON.map(value => {
    return { optionValue: value.locale };
  }),
  supportedCountries: countryCodeJSON.map(country => ({
    optionValue: country.name,
    code: country.code
  })),
  supportedCurrencies: currencyJSON.map(currency => ({
    optionValue: createCurrencyString(currency),
    code: currency.Code
  })),

  defaultOptions: {
    preferences: {
      localisation: 'en-GB',
      default_currency: 'GBP',
      default_login_screen: 'dashboard',
      default_reporting_country: 'GB'
    }
  }
};

export default SettingsSettings;
