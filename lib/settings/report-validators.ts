/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/prefer-immediate-return */
import countryCodes from '../../lib/data/countryCodes.json';

import type { BatchAutoUploadHeaders } from '../../types/batch-reports';
import type { CSVValidationHeaderProps } from '../../types/global';
import type {
  CsvReportUploadHeaders,
  CsvValueValidation
} from '../../types/report';

const validStatusList = [
  'Active',
  'Distressed',
  'Active (protection)',
  'Active (dormant)',
  'Bankrupt',
  'In liquidation',
  'Dissolved',
  'Inactive',
  'N.A.'
];

/**
 * @param strArr "['Active','Inactive']"
 * @returns string[] ['Active', 'Inactive']
 */
export const convertStringArrayToArrayOfStrings = (
  strArr: string
): { value: string[]; isValid: boolean } => {
  // the cell might start with either '"' or '['
  // check string has opening and closing brackets
  const startsWith = strArr.startsWith('[') || strArr.startsWith('"[');
  const endsWith = strArr.endsWith(']') || strArr.endsWith(']"');

  const isStringifiedArray = startsWith && endsWith;
  if (!isStringifiedArray) {
    return { value: [], isValid: false };
  }

  // remove brackets and any quotations from around the values
  // eg "['Active','Inactive']" => "Active,Inactive"
  const valuesFromString = strArr.replace(/"|'|\[|\]/g, '');

  // "Active,Inactive" => ['Active','Inactive']
  const splitValues = valuesFromString.split(',');

  return { value: splitValues, isValid: true };
};

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
    required: (x: string, i?: number) =>
      !x && `A value for "details_name" is required in row ${i}`,
    formatted: 'Company Name'
  },
  details_nace_code: {
    required: (x: string) =>
      !x && `A value for "details_nace_code" is required`,
    formatted: 'NACE Code'
  },
  // details_status: {
  //   required: (x: string) =>
  //     !x && `A value for "details_status" is required (eg "['Active']")`,
  //   formatted: 'Status',
  //   validator: (x: string) => {
  //     // CSV dowwnload gives "['Active']" (string with brackets)
  //     // CSV upload requires ['Active'] (string[])
  //     if (!x) return `A value for "details_status" is required`;

  //     const { value, isValid } = convertStringArrayToArrayOfStrings(x);

  //     if (!isValid) {
  //       return `Value is not convertable to array (eg "['Active']")`;
  //     }

  //     if (value.length === 0) {
  //       return `A value for "details_status" is required (eg "['Active']")`;
  //     }

  //     // if value contains values that aren't 'active' or 'inactive' (including empty strings)

  //     for (let i = 0; i < value.length; i++) {
  //       const isPermitted = validStatusList.some(
  //         permitted => permitted.toLowerCase() === value[i].toLowerCase()
  //       );
  //       if (!isPermitted) {
  //         return `Value ${value[i]} not permitted`;
  //       }
  //     }

  //     if (
  //       !value.every(
  //         val =>
  //           val.toLowerCase() === 'active' || val.toLowerCase() === 'inactive'
  //       )
  //     ) {
  //       return 'Values must be either "Active" or "Inactive"';
  //     }

  //     return false;
  //   }
  // },
  // details_status_change_date: {
  //   required: false,
  //   formatted: 'Details Status change date'
  // },
  details_website: {
    required: false,
    formatted: 'Details website',
    validator: (x: string) => {
      // CSV dowwnload gives "['example.com']" (string with brackets)
      // CSV upload requires ['example.com'] (string[])
      if (!x)
        return `A value for "details_websites" is required (eg "['example.com']")`;

      const { value, isValid } = convertStringArrayToArrayOfStrings(x);

      if (!isValid) {
        return `Value is not convertable to array (eg "['example.com']")`;
      }

      if (value.length === 0) {
        return `A value for "details_websites" is required (eg "['example.com']")`;
      }

      return false;
    }
  },
  details_number_of_directors: {
    required: (x: string) =>
      !x && `A value for "details_number_of_directors" is required`,
    formatted: 'Details number of directors'
  },
  // details_number_of_employees: {
  //   required: (x: string) =>
  //     !x && `A value for "details_number_of_employees" is required`,
  //   formatted: 'Details number of employees'
  // },
  details_number_of_subsidiaries: {
    required: (x: string) =>
      !x && `A value for "details_number_of_subsidiaries" is required`,
    formatted: 'Details number of subsidiaries'
  },
  /**
   * *********************************
   * FINANCIALS
   * *********************************
   */
  net_income: {
    required: (x: string) => !x && `A value for "net_income" is required`,
    formatted: 'Net Income'
  },
  number_of_employees: {
    required: false,
    // required: (x: string) =>
    //   !x && `A value for "number_of_employees" is required`,
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
  period: {
    required: (x: string) => !x && `A value for "period" is required`,
    validator: (x: string) =>
      Number(x).toString().length !== 4 &&
      'Period must be a year with 4 digits',
    formatted: 'Period'
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
   * Default values are set in in useCsvValidators > makeReqBody > financials
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
  other_non_current_liabilities: {
    required: false,
    formatted: 'Other Non Current Liabilities'
  },
  net_debt: {
    required: false,
    formatted: 'Net Debt'
  },
  current_assets: {
    required: (x: string) => !x && `A value for "current_assets" is required`,
    formatted: 'Current assets'
  },
  current_liabilities: {
    required: (x: string) =>
      !x && `A value for "current_liabilities" is required`,
    formatted: 'Current liabilities'
  }
};

export const batchAutoCsvHeaders: Record<
  BatchAutoUploadHeaders,
  CSVValidationHeaderProps
> = {
  iso_code: uploadReportCSVHeaders.iso_code,
  company_id: uploadReportCSVHeaders.company_id
};

export const mapValidators = ([header, { required, validator }]: [
  string,
  CSVValidationHeaderProps
]): CsvValueValidation => {
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
};

export const manualUploadValidators: CsvValueValidation[] = Object.entries(
  uploadReportCSVHeaders
).map(mapValidators);

export const autoBatchUploadValidators: CsvValueValidation[] =
  Object.entries(batchAutoCsvHeaders).map(mapValidators);
