/* eslint-disable sonarjs/prefer-immediate-return */

import {
  CsvReportUploadHeaders,
  ReportUploadRequestBody
} from '../../types/report';

// adds blank objects to the array to make it the same length as the other arrays
export const addBlankObjects = (array: any[], lengthRequired: number) => {
  const length = array.length;
  if (length < lengthRequired + 1) {
    const blankArrayLength = 5 - length;
    const blankArrayArray = Array(blankArrayLength).fill({});
    return [...array, ...blankArrayArray];
  }
  return array;
};

// clunky first attempt: it works but can do with some refactoring
export const makeUploadReportReqBody = (
  reportObject: {
    [key in CsvReportUploadHeaders]: string[];
  },
  csvValues: string[][]
): ReportUploadRequestBody => {
  // setter functions
  const setNumberValue = (key: CsvReportUploadHeaders, i: number) =>
    Number(reportObject[key]?.[i] ?? 0);

  const setStringValue = (key: CsvReportUploadHeaders, i: number) =>
    reportObject[key]?.[i]?.toString() ?? '';

  return {
    // MAIN
    iso_code: setStringValue('iso_code', 0),
    company_id: setStringValue('company_id', 0),
    currency: setStringValue('currency', 0),
    accounts_type: setNumberValue('accounts_type', 0),
    // DETAILS
    details: {
      name: setStringValue('details_name', 0),
      nace_code: setNumberValue('details_nace_code', 0),
      industry_sector_code: setNumberValue('details_industry_sector_code', 0),
      status: setStringValue('details_status', 0)
    },
    // FINANCIALS
    // multiple years per report are mapped here
    financials: csvValues.map((_, i) => {
      return {
        /**
         * *********************************************
         * Following financials are expected in API body
         * but aren't present in the user-uploaded CSV data.
         * Will put as empty / 0 for the time being
         * *********************************************
         */

        creditors: setNumberValue('creditors', i),
        debtors: setNumberValue('debtors', i),
        fixed_assets: setNumberValue('fixed_assets', i),
        inventory: setNumberValue('inventory', i),
        loans: setNumberValue('loans', i),
        non_current_liabilities: setNumberValue('non_current_liabilities', i),
        number_of_subsidiaries: setNumberValue('number_of_subsidiaries', i),
        other_non_current_liabilities: setNumberValue(
          'other_non_current_liabilities',
          i
        ),
        net_debt: setNumberValue('net_debt', i),
        management_experience:
          setStringValue('management_experience', i) || 'Medium',

        /* ********************************************* */

        cash_and_equivalents: setNumberValue('cash_and_equivalents', i),
        current_assets: setNumberValue('total_assets', i),
        current_liabilities: setNumberValue('total_liabilities', i),
        ebit: setNumberValue('ebit', i),
        ebitda: setNumberValue('ebitda', i),
        intangible_fixed_assets: setNumberValue('intangible_fixed_assets', i),
        interest_expenses: setNumberValue('interest_expenses', i),
        long_term_debt: setNumberValue('long_term_debt', i),
        net_income: setNumberValue('net_income', i),
        number_of_directors: setNumberValue('number_of_directors', i),
        number_of_employees: setNumberValue('number_of_employees', i),
        period: setStringValue('period', i),
        retained_earnings: setNumberValue('retained_earnings', i),
        short_term_debt: setNumberValue('short_term_debt', i),
        tangible_fixed_assets: setNumberValue('tangible_fixed_assets', i),
        total_assets: setNumberValue('total_assets', i),
        total_debt: setNumberValue('total_debt', i),
        total_liabilities: setNumberValue('total_liabilities', i),
        total_shareholder_equity: setNumberValue('total_shareholder_equity', i),
        turnover: setNumberValue('turnover', i),
        working_capital: setNumberValue('working_capital', i)
      };
    })
  };
};

// extract for testing
export const calculateSMEZScoreMax = (x: number) => {
  let max: number;

  if (x >= 900) {
    max = Math.min(1.0, 0.9 + (x - 900) / 1000);
  } else if (x >= 700) {
    max = Math.min(0.9, 0.8 + (x - 700) / 2000);
  } else if (x >= 500) {
    max = Math.min(0.8, 0.7 + (x - 500) / 2000);
  } else if (x >= 400) {
    max = Math.min(0.7, 0.6 + (x - 400) / 1000);
  } else if (x >= 270) {
    max = Math.min(0.6, 0.5 + (x - 270) / 1300);
  } else if (x >= 100) {
    max = Math.min(0.5, 0.2 + (x - 100) / 1700);
  } else {
    max = Math.min(0.2, x / 500);
  }
  return max;
};

export const calculateSMEZScoreRotation = (value: number) => {
  const max = calculateSMEZScoreMax(value);

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = max * 260 - 130;
  return angle;
};

// extract to test
export const calculatePoDRatio = (x: number) => {
  let ratio: number;

  // x needs to be converted to a percentage
  const val = x;

  if (val <= 10) {
    ratio = Math.min(0.2, val / 50);
  } else if (val <= 12) {
    ratio = Math.min(0.5, 0.2 + (0.3 * (val - 10)) / 2);
  } else if (val <= 50) {
    ratio = Math.min(0.9, 0.5 + (0.4 * (val - 12)) / 38);
  } else {
    ratio = Math.min(1.0, 0.9 + (0.1 * (x - 50)) / 50);
  }

  return ratio;
};

export const calculatePoDRotation = (value: number) => {
  // if value zero set to default
  if (value === 0) return 130;

  let ratio = calculatePoDRatio(value);

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = ratio * 260 - 130;

  return Number.parseFloat(angle.toFixed(4));
};

export const calculateLGDPercent = (x: number) => {
  let percent: number;

  // calculations performed on percentage
  const val = x;

  if (val <= 20) {
    percent = Math.min(0.2, val / 100);
  } else if (val <= 40) {
    percent = Math.min(0.5, 0.2 + (0.3 * (val - 20)) / 20);
  } else if (val <= 90) {
    percent = Math.min(0.9, 0.5 + (0.4 * (val - 40)) / 50);
  } else {
    percent = Math.min(1.0, (0.1 * (val - 90)) / 10);
  }

  return percent;
};

export const calculateLGDRotation = (value: number) => {
  const percent = calculateLGDPercent(value);
  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = percent * 260 - 130;

  return angle;
};
