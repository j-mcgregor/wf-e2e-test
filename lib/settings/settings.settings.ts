/* eslint-disable sonarjs/no-duplicate-string */
import localisationJSON from '../../lib/data/localisation.json';
import currencyJSON from '../../lib/data/countryCurrency.json';

const createCurrencyString = ({
  Symbol,
  Currency,
  CountryName
}: {
  Symbol: string;
  Currency: string;
  CountryName: string;
}) => {
  return `${CountryName} - ${Currency} (${Symbol})`;
};

const SettingsSettings = {
  dashboardOptionValues: ['dashboard', 'reports', 'sme_calc', 'sme_prospector'],
  supportedLocales: localisationJSON.map(value => {
    return { optionValue: value.locale };
  }),
  supportedCountries: currencyJSON.map(currency => ({
    optionValue: currency.CountryName
  })),
  supportedCurrencies: currencyJSON.map(currency => ({
    optionValue: createCurrencyString(currency)
  })),
  defaultOptions: {
    preferences: {
      localisation: 'English (GB)',
      default_currency: 'United Kingdom - Pound (£)',
      default_login_screen: 'dashboard',
      default_reporting_country: 'United Kingdom'
    }
  }
};

export default SettingsSettings;
