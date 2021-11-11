import { ValidCSVType } from '../../types/report';
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

export const validCSVValues: ValidCSVType = {
  valid_report_headers: [
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
  ],
  required_report_values: [
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
  ],
  valueValidation: [
    {
      header: 'iso',
      validate: (value: any) =>
        (typeof value !== 'string' || value.length !== 2) &&
        `${value} is not a valid ISO two letter code.`
    },
    {
      header: 'company_id',
      validate: (value: any) =>
        !value && 'There must be valid header called company_id.'
    }
  ]
};

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

type CsvValidation = {
  headerName: string;
  colNum: number;
  rowNum: number;
};

export const csvConfig = (
  msg1: (headerName: string, rowNum: number, colNum: number) => string
) => {
  return {
    isHeaderNameOptional: true, // default (optional)
    headers: [
      {
        inputName: 'Year',
        name: 'year',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Total Shareholder Equity',
        name: 'total_shareholder_equity',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Total Assets',
        name: 'total_assets',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Total Liabilities',
        name: 'total_liabilities',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Turnover',
        name: 'turnover',
        required: false,
        optional: true,
        validateError: (headerName: string, rowNum: number, colNum: number) => {
          return msg1(headerName, rowNum, colNum);
        }
      },
      {
        inputName: 'Production Costs',
        name: 'production_costs',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Short Term Debt',
        name: 'short_term_debt',
        required: false,
        optional: true,
        validateError: (headerName: string, rowNum: number, colNum: number) => {
          return msg1(headerName, rowNum, colNum);
        }
      },
      {
        inputName: 'Long Term Debt',
        name: 'long_term_debt',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Total Debt',
        name: 'total_debt',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Cash',
        name: 'cash',
        required: false,
        optional: true,
        // uniqueError: function (headerName: string) {
        //   return `${headerName} - test unique error`;
        // },
        // requiredError: function (
        //   headerName: string,
        //   rowNumber: number,
        //   columnNumber: number
        // ) {
        //   return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        // },
        validate: function (value: string): boolean {
          return !!value;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
        // headerError: function (
        //   headerName: string,
        //   rowNumber: number,
        //   columnNumber: number
        // ) {
        //   return `test header error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        // }
      },
      {
        inputName: 'Working Capital',
        name: 'working_capital',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Tangible Assets',
        name: 'tangible_assets',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Intangible Assets',
        name: 'intangible_assets',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Interest Expenses',
        name: 'interest_expenses',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'ebitda',
        name: 'ebitda',
        required: false,
        optional: true,
        validateError: (
          headerName: string,
          rowNumber: number,
          colNumber: number
        ) => {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${colNumber} column`;
        }
      },
      {
        inputName: 'depreciation',
        name: 'depreciation',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'ebit',
        name: 'ebit',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Net Income',
        name: 'net_income',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Retained Earnings',
        name: 'retained_earnings',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Number of Directors',
        name: 'number_directors',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      },
      {
        inputName: 'Number of Employees',
        name: 'number_employees',
        required: false,
        optional: true,
        uniqueError: function (headerName: string) {
          return `${headerName} - test unique error`;
        },
        requiredError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test required error: ${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
        },
        validateError: function (
          headerName: string,
          rowNumber: number,
          columnNumber: number
        ) {
          return `test validate error: ${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
        }
      }
    ]
  };
};
