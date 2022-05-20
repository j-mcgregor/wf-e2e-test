/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable sonarjs/no-duplicate-string */
import countryCodeJSON from '../../lib/data/countryCodes.json';
import localisationJSON from '../../lib/data/localisation.json';
import { createCurrencyString } from '../utils/text-helpers';

const supportedLocales = localisationJSON.map(value => {
  return { optionValue: value.code, optionName: value.locale };
});

const supportedCountries = countryCodeJSON.map(country => ({
  optionName: country.name,
  optionValue: country.code,
  code: country.code
}));

const supportedCurrencies = countryCodeJSON.map(country => ({
  optionName: createCurrencyString({
    name: country.name,
    currency_symbol: country.currency_symbol,
    currency_code: country.currency_code
  }),
  optionValue: country.name,
  code: country.currency_code
}));

export const getCurrencyByIsoCode = (iso_code: string, defaultCode = 'GBP') => {
  const currency_code = countryCodeJSON.find(
    country => country.code === iso_code
  )?.currency_code;

  if (currency_code) return currency_code;

  return defaultCode;
};

/**
 * used to set the currency as an option when provided with an iso_code
 * see implementation below
 */
const getCurrencyOptionByIsoCode = (iso_code: string) => {
  // get country by iso_code from countryCodeJSON
  const country = countryCodeJSON.find(country => country.code === iso_code);
  // turn that country into an option
  if (country) {
    const option = {
      optionName: createCurrencyString({
        name: country.name,
        currency_symbol: country.currency_symbol,
        currency_code: country.currency_code
      }),
      optionValue: country.name,
      code: country.currency_code
    };
    return option;
  }
};

const SettingsSettings = {
  dashboardOptionValues: [
    'dashboard',
    'reports',
    'single_report',
    'multiple_reports'
  ],
  preferences: {
    defaults: {
      locale: 'en-GB',
      currency: 'United Kingdom',
      home_page: 'dashboard',
      reporting_country: 'GB'
    }
  },
  supportedLocales,
  supportedCountries,
  supportedCurrencies,
  getCurrencyByIsoCode,
  getCurrencyOptionByIsoCode
};

export default SettingsSettings;

/**
 * implementation of getCurrencyOptionByIsoCode
 */

// useEffect(() => {
//   if (isAutoOrManual.iso_code) {
//     const autoBatchCurrency = Settings.getCurrencyOptionByIsoCode(
//       isAutoOrManual.iso_code
//     );

//     if (autoBatchCurrency) {
//       setCurrency(autoBatchCurrency);
//     }
//   }
// }, [isAutoOrManual.iso_code]);
