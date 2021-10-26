import countryCodeJSON from '../data/countryCodes.json';
import currencyJSON from '../data/countryCurrency.json';
import { createCurrencyString } from '../utils/text-helpers';

export const supportedCountries = countryCodeJSON.map(country => ({
  optionValue: country.name,
  code: country.code
}));
export const supportedCurrencies = currencyJSON.map(currency => ({
  optionValue: createCurrencyString(currency),
  code: currency.Code,
  name: currency.CountryName
}));

export const validCountryCodes = ['GB'];

// matches the names in the translation json
export const templateText = [
  {
    title: 'full_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'financials_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'excel_full_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight-3 bg-opacity-50'
  },
  {
    title: 'excel_financials_template',
    templateLink: '#',
    backgroundColor: 'bg-highlight-3 bg-opacity-50'
  }
];
