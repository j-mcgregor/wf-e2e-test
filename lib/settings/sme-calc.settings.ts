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

// these headers are valid in the CSV
export const validReportHeaders = [
  'year',
  'total_shareholder_equity',
  'total_assets',
  'total_liabilities',
  'turnover',
  'production_costs',
  'short_term_debt',
  'long_term_debt',
  'total_debt',
  'cash',
  'working_capital',
  'tangible_assets',
  'intangible_assets',
  'interest_expenses',
  'ebitda',
  'depreciation',
  'ebit',
  'net_income',
  'retained_earnings',
  'number_directors',
  'number_employees'
];

// these values are required in the CSV
export const requiredReportValues = [
  'year',
  'total_shareholder_equity',
  'total_assets',
  'turnover',
  'short_term_debt',
  'long_term_debt',
  'total_debt',
  'cash',
  'working_capital',
  'tangible_assets',
  'intangible_assets',
  'interest_expenses',
  'ebitda',
  'ebit',
  'net_income',
  'retained_earnings'
];
