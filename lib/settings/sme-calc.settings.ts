import countryCodeJSON from '../data/countryCodes.json';
import currencyJSON from '../data/countryCurrency.json';
import { createCurrencyString } from '../utils/text-helpers';

// export const supportedCountries = countryCodeJSON.map(country => ({
//   optionName: country.name,
//   optionValue: country.code,
//   code: country.code,
// }));
// export const supportedCurrencies = currencyJSON.map(currency => ({
//   optionValue: createCurrencyString(currency),
//   code: currency.Code,
//   optionName: currency.CountryName
// }));

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

export const manualUploadValidators = [
  {
    header: 'year',
    validate: (x: string) => !x && 'A value for "Year" is required'
  },
  {
    header: 'total_shareholder_equity',
    validate: (x: string) =>
      !x && 'A value for "Total shareholder" equity is required'
  },
  {
    header: 'total_assets',
    validate: (x: string) => !x && 'A value for "Total assets" is required'
  },
  {
    header: 'total_liabilities'
  },
  {
    header: 'turnover',
    validate: (x: string) => !x && 'A value for "Turnover" is required'
  },
  {
    header: 'production_costs'
  },
  {
    header: 'short_term_debt',
    validate: (x: string) => !x && 'A value for "Short term" debt is required'
  },
  {
    header: 'long_term_debt',
    validate: (x: string) => !x && 'A value for "Long term" debt is required'
  },
  {
    header: 'total_debt',
    validate: (x: string) => !x && 'A value for "Total debt" is required'
  },
  {
    header: 'cash',
    validate: (x: string) => !x && 'A value for "Cash" is required'
  },
  {
    header: 'working_capital',
    validate: (x: string) => !x && 'A value for "Working capital" is required'
  },
  {
    header: 'tangible_assets',
    validate: (x: string) => !x && 'A value for "Tangible assets" is required'
  },
  {
    header: 'intangible_assets',
    validate: (x: string) => !x && 'A value for "Intangible assets" is required'
  },
  {
    header: 'interest_expenses',
    validate: (x: string) => !x && 'A value for "Interest expenses" is required'
  },
  {
    header: 'ebitda',
    validate: (x: string) => !x && 'A value for "EBITDA" is required'
  },
  {
    header: 'depreciation'
  },
  {
    header: 'ebit',
    validate: (x: string) => !x && 'A value for "EBIT" is required'
  },
  {
    header: 'net_income',
    validate: (x: string) => !x && 'A value for "Net income" is required'
  },
  {
    header: 'retained_earnings',
    validate: (x: string) => !x && 'A value for "Retained earnings" is required'
  },
  {
    header: 'number_directors'
  },
  {
    header: 'number_employees'
  }
];

// // these headers are valid in the CSV
// export const validReportHeaders = [
//   'year',
//   'total_shareholder_equity',
//   'total_assets',
//   'total_liabilities',
//   'turnover',
//   'production_costs',
//   'short_term_debt',
//   'long_term_debt',
//   'total_debt',
//   'cash',
//   'working_capital',
//   'tangible_assets',
//   'intangible_assets',
//   'interest_expenses',
//   'ebitda',
//   'depreciation',
//   'ebit',
//   'net_income',
//   'retained_earnings',
//   'number_directors',
//   'number_employees'
// ];

// // these values are required in the CSV
// export const requiredReportValues = [
//   'year',
//   'total_shareholder_equity',
//   'total_assets',
//   'turnover',
//   'short_term_debt',
//   'long_term_debt',
//   'total_debt',
//   'cash',
//   'working_capital',
//   'tangible_assets',
//   'intangible_assets',
//   'interest_expenses',
//   'ebitda',
//   'ebit',
//   'net_income',
//   'retained_earnings'
// ];

export const orbisAvailableSearchCountries = [
  'AL',
  'AT',
  'BY',
  'BE',
  'BA',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'KV',
  'LV',
  'LI',
  'LT',
  'LU',
  'MT',
  'MD',
  'MC',
  'NL',
  'MK',
  'NO',
  'PL',
  'PT',
  'RO',
  'RU',
  'RS',
  'SK',
  'SI',
  'ES',
  'SE',
  'CH',
  'TR',
  'UA'
];
