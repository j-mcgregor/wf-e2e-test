/* eslint-disable sonarjs/cognitive-complexity */
import { useTranslations } from 'next-intl';

import { getUniqueStringsFromArray } from '../lib/utils/text-helpers';
import { ReportTypeEnum } from '../types/global';

import type {
  CsvReport,
  CsvReportUploadHeaders,
  CsvValueValidation
} from '../types/report';

const BATCH_MAX_COMPANIES = 1000;
const MAX_ERRORS = 500;

export const useFileValidators = ({
  fileData,
  validators,
  fileValues,
  totalCompanies = 0,
  type
}: {
  fileData?: CsvReport | null;
  validators?: CsvValueValidation[];
  fileValues: string[][];
  totalCompanies?: number;
  type?: ReportTypeEnum;
}) => {
  const t = useTranslations();
  const isBatch = type === 'BATCH_AUTO' || type === 'BATCH_MANUAL';
  const isManualBatch = type === 'BATCH_MANUAL';
  const isManualSingle = type === 'REPORT_MANUAL';

  let errors: Array<string | boolean> = [];
  if (fileValues?.length === 0) {
    errors.push('File has no values');
  }

  const uniqueCompanies = getUniqueStringsFromArray(
    isManualBatch || isManualSingle
      ? fileData?.details_name
      : fileData?.company_id
  );

  const tooManyCompaniesBatch = isBatch && totalCompanies > BATCH_MAX_COMPANIES;
  // if too many companies, add error
  if (tooManyCompaniesBatch) {
    errors.push(
      t('max_companies', {
        max_companies: BATCH_MAX_COMPANIES,
        total_companies: totalCompanies
      })
    );
  }

  // checks the reportObject for the headers that are required
  // returns an array of missing header names
  const missingHeaders =
    validators &&
    Object.entries(validators)
      .map(([_index, { header, required }]) => {
        const isPresent = fileData?.[header as CsvReportUploadHeaders];
        return isPresent ? null : required ? null : header;
      })
      .filter(x => x);

  const isValid = errors?.length === 0 && missingHeaders?.length === 0;

  if (uniqueCompanies.indexOf('') !== -1) {
    if (isManualBatch) {
      errors.push('All rows must have a company name');
    } else {
      errors.push('All rows must have a company ID');
    }
  }

  // if we limit errors to eg 100, we need to be able to break the loop of
  // fileData entries which isn't possible with Array methods like forEach, map or flatMap
  // or Object.entries
  // it's more verbose this way but won't keep running if theres thousands of errors
  if (
    !tooManyCompaniesBatch &&
    fileData &&
    validators &&
    errors.length < MAX_ERRORS
  ) {
    // loop 1: fileData object properties
    for (const i in fileData) {
      const key = i as CsvReportUploadHeaders;

      // check property exists
      if (Object.prototype.hasOwnProperty.call(fileData, key)) {
        const values = fileData[key];

        // find the validators for the header
        const columnHeader = validators.find(item => item.header === key);

        // access the validators function in valueValidation
        const validatorFunctions = columnHeader?.validate ?? null;

        // loop 2: values
        // generates 99% of the errors, so push directly into errors
        // otherwise errors can reach thouands before being checked outside
        for (let rowNum = 0; rowNum < values.length; rowNum++) {
          if (validatorFunctions) {
            // loop 3: validators
            for (let j = 0; j < validatorFunctions.length; j++) {
              const res = validatorFunctions[j](
                values[rowNum]?.trim(),
                rowNum + 1
              );

              // too many errors, break the loop
              if (errors.length >= MAX_ERRORS) {
                break;
              }
              res && errors.push(res);
            }
          }
          // check for error length here too
          if (errors.length >= MAX_ERRORS) {
            errors.push(
              `Too many errors (max ${MAX_ERRORS}). Please check your CSV.`
            );
            break;
          }
        }

        // filter out falsy error entries
        errors = errors.filter(Boolean);
      }
      // and here just to be sure
      if (errors.length > MAX_ERRORS) {
        break;
      }
    }
  }

  // remove any duplicates (bit expensive but since errors are limited to whatever is set to MAX_ERRORS its fine)
  errors = [...new Set(errors)];

  return {
    errors,
    isValid,
    missingHeaders,
    numberOfCompanies: totalCompanies
  };
};
