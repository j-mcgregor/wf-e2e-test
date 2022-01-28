import { CsvReportUploadHeaders, CSVValueValidation } from '../../types/report';
import countryCodes from '../../lib/data/countryCodes.json';
import { CSVValidationHeaderProps } from '../../types/global';
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
    templateLink: '/download-templates/WF-Manual-Upload-Template.csv',
    backgroundColor: 'bg-highlight bg-opacity-50'
  },
  {
    title: 'excel_full_template',
    templateLink: '/download-templates/WF-Manual-Upload-Template.xlsx',
    backgroundColor: 'bg-highlight-3 bg-opacity-50'
  }
];

/**
 * Used to validate user-uploaded CSV report data
 */
export const uploadReportCSVHeaders: {
  [K in CsvReportUploadHeaders]: CSVValidationHeaderProps;
} = {
  /**
   * *********************************
   * MAIN
   * *********************************
   */
  currency: {
    required: (x: string) => !x && `A value for "currency" is required`,
    formatted: 'Currency',
    validator: (x: string) =>
      countryCodes.find(country => country.currency_code === x)
        ? false
        : `"${x}" is not a valid currency code`
  },
  iso_code: {
    required: (x: string) => !x && `A value for "iso_code" is required`,
    validator: (x: string) =>
      countryCodes.find(country => country.code === x)
        ? false
        : `"${x}" is not a valid ISO code`,
    formatted: 'ISO Code'
  },
  company_id: {
    required: false,
    formatted: 'Company ID'
  },

  // default to 0, rather than require
  accounts_type: {
    required: (x: string) => !x && `A value for "accounts_type" is required`,
    formatted: 'Accounts type',
    validator: (x: string) =>
      x === '0' || x === '1'
        ? false
        : `"${x}" is not a valid value for "accounts_type"`
  },
  /**
   * *********************************
   * DETAILS
   * "name": "Small Business Ltd",
   * *********************************
   */

  details_industry_sector_code: {
    required: (x: string) =>
      !x && `A value for "details_industry_sector_code" is required`,
    formatted: 'Industry Sector Code'
  },
  details_name: {
    required: (x: string) => !x && `A value for "company_name" is required`,
    formatted: 'Company Name'
  },
  details_nace_code: {
    required: (x: string) => !x && `A value for "nace_code" is required`,
    formatted: 'NACE Code'
  },
  details_status: {
    required: (x: string) => !x && `A value for "status" is required`,
    formatted: 'Status',
    validator: (x: string) =>
      x.toLowerCase() !== 'active' && `"${x}" is not a valid value for "status"`
  },
  /**
   * *********************************
   * FINANCIALS
   * *********************************
   */
  address_region: {
    required: (x: string) => !x && `A value for "address_region" is required`,
    formatted: 'Address Region'
  },
  net_income: {
    required: (x: string) => !x && `A value for "net_income" is required`,
    formatted: 'Net Income'
  },
  number_of_employees: {
    required: (x: string) =>
      !x && `A value for "number_of_employees" is required`,
    formatted: 'Number of Employees'
  },
  cash_and_equivalents: {
    required: (x: string) =>
      !x && `A value for "cash_and_equivalents" is required`,
    formatted: 'Cash'
  },
  total_assets: {
    required: (x: string) => !x && `A value for "total_assets" is required`,
    formatted: 'Total Assets'
  },
  depreciation: {
    required: false,
    formatted: 'Depreciation'
  },
  ebit: {
    required: (x: string) => !x && `A value for "ebit" is required`,
    formatted: 'EBIT'
  },
  ebitda: {
    required: (x: string) => !x && `A value for "ebitda" is required`,
    formatted: 'EBITDA'
  },
  tangible_fixed_assets: {
    required: (x: string) =>
      !x && `A value for "tangible_fixed_assets" is required`,
    formatted: 'Tangible Fixed Assets'
  },
  intangible_fixed_assets: {
    required: (x: string) =>
      !x && `A value for "intangible_fixed_assets" is required`,
    formatted: 'Intangible Fixed Assets'
  },
  interest_expenses: {
    required: (x: string) =>
      !x && `A value for "interest_expenses" is required`,
    formatted: 'Interest Expenses'
  },
  long_term_debt: {
    required: (x: string) => !x && `A value for "long_term_debt" is required`,
    formatted: 'Long Term Debt'
  },
  number_of_directors: {
    required: false,
    formatted: 'Number of Directors'
  },
  period: {
    required: (x: string) => !x && `A value for "period" is required`,
    validator: (x: string) =>
      Number(x).toString().length !== 4 &&
      'Period must be a year with 4 digits',
    formatted: 'Period'
  },
  production_costs: {
    required: false,
    formatted: 'Production Costs'
  },
  retained_earnings: {
    required: (x: string) =>
      !x && `A value for "retained_earnings" is required`,
    formatted: 'Retained Earnings'
  },
  short_term_debt: {
    required: (x: string) => !x && `A value for "short_term_debt" is required`,
    formatted: 'Short Term Debt'
  },
  total_debt: {
    required: (x: string) => !x && `A value for "total_debt" is required`,
    formatted: 'Total Debt'
  },
  total_liabilities: {
    required: (x: string) =>
      !x && `A value for "total_liabilities" is required`,
    formatted: 'Total Liabilities'
  },
  total_shareholder_equity: {
    required: (x: string) =>
      !x && `A value for "total_shareholder_equity" is required`,
    formatted: 'Total Shareholder Equity'
  },
  turnover: {
    required: (x: string) => !x && `A value for "turnover" is required`,
    formatted: 'Turnover'
  },
  working_capital: {
    required: (x: string) => !x && `A value for "working_capital" is required`,
    formatted: 'Working Capital'
  },
  /**
   * *********************************
   * FINANCIALS OTHER - in API request but not CSV
   * Default values are set in in useCSVValidator > makeReqBody > financials
   * *********************************
   */
  management_experience: {
    required: false,
    formatted: 'Management Experience'
  },
  creditors: {
    required: false,
    formatted: 'Creditors'
  },
  debtors: {
    required: false,
    formatted: 'Debtors'
  },
  fixed_assets: {
    required: false,
    formatted: 'Fixed Assets'
  },
  inventory: {
    required: false,
    formatted: 'Inventory'
  },
  loans: {
    required: false,
    formatted: 'Loans'
  },
  non_current_liabilities: {
    required: false,
    formatted: 'Non Current Liabilities'
  },
  number_of_subsidiaries: {
    required: false,
    formatted: 'Number of Subsidiaries'
  },
  other_non_current_liabilities: {
    required: false,
    formatted: 'Other Non Current Liabilities'
  },
  net_debt: {
    required: false,
    formatted: 'Net Debt'
  }
};

export const manualUploadValidators: Array<CSVValueValidation> = Object.entries(
  uploadReportCSVHeaders
).map(([header, { required, validator }]) => {
  const validators = required
    ? validator
      ? [required, validator]
      : [required]
    : [];
  return {
    header,
    ...((required || validator) && {
      validate: validators
    })
  };
});

export const orbisAvailableSearchCountries = [
  'al',
  'at',
  'by',
  'be',
  'ba',
  'bg',
  'hr',
  'cy',
  'cz',
  'dk',
  'ee',
  'fi',
  'fr',
  'de',
  'gr',
  'hu',
  'is',
  'ie',
  'it',
  'kv',
  'lv',
  'li',
  'lt',
  'lu',
  'mt',
  'md',
  'mc',
  'nl',
  'mk',
  'no',
  'pl',
  'pt',
  'ro',
  'ru',
  'rs',
  'sk',
  'si',
  'es',
  'se',
  'ch',
  'tr',
  'ua'
];
