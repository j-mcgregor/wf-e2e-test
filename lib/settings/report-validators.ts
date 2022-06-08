/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/prefer-immediate-return */
import countryCodes from '../../lib/data/countryCodes.json';

import type { BatchAutoUploadHeaders } from '../../types/batch-reports';
import type { CSVValidationHeaderProps } from '../../types/global';
import type {
  CsvReportUploadHeaders,
  CsvValueValidation
} from '../../types/report';
import { dateIsValid } from '../utils/date-helpers';

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

const validateCompanyType = (company_type: string) => {
  if (
    company_type === 'Large' ||
    company_type === 'Medium' ||
    company_type === 'Small'
  ) {
    return true;
  }
  return false;
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
  /**
   * *********************************
   * DETAILS
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
  details_company_type: {
    required: (x: string) =>
      (!x || !validateCompanyType(x)) &&
      `"details_company_type" must be 'Large', 'Medium' or 'Small'`,
    formatted: 'Company Type'
  },
  // not required but if there, validated as a website
  details_website: {
    required: false,
    formatted: 'Details website',
    validator: (x: string) => {
      const website = x?.trim();
      if (website) {
        // need to improve the website error validation here
        // should be a regex to test full url formation
        // provide details on what is wrong with it to the user
        return website.startsWith('http') || website.startsWith('www')
          ? false
          : `"${website}" is not a valid website address.`;
      }
      return false;
    }
  },
  /**
   * *********************************
   * FINANCIALS
   * *********************************
   */
  number_of_directors: {
    required: false,
    formatted: 'Number of directors'
  },
  number_of_subsidiaries: {
    required: false,
    formatted: 'Number of subsidiaries'
  },
  net_income: {
    required: false,
    formatted: 'Net Income'
  },
  number_of_employees: {
    required: false,
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
    required: false,
    formatted: 'EBIT'
  },
  ebitda: {
    required: false,
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
      !dateIsValid(x) && 'Period must be in a YYYY-MM-DD format',
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
    required: (x: string) =>
      !x && `A value for "non_current_liabilities" is required`,
    formatted: 'Non Current Liabilities'
  },
  other_non_current_liabilities: {
    required: (x: string) =>
      !x && `A value for "other_non_current_liabilities" is required`,
    formatted: 'Other Non Current Liabilities'
  },
  current_assets: {
    required: (x: string) => !x && `A value for "current_assets" is required`,
    formatted: 'Current assets'
  },
  current_liabilities: {
    required: (x: string) =>
      !x && `A value for "current_liabilities" is required`,
    formatted: 'Current liabilities'
  },
  company_age: {
    required: (x: string) => !x && `A value for "company_age" is required`,
    formatted: 'Company Age'
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
  let validators = [];

  if (required) {
    validators.push(required);
  }
  if (validator) {
    validators.push(validator);
  }

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
