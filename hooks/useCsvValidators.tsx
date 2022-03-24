/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable security/detect-object-injection */
import { useTranslations } from 'next-intl';
import { getUniqueStringsFromArray } from '../lib/utils/text-helpers';

import type {
  CsvReport,
  CsvReportUploadHeaders,
  CsvValueValidation
} from '../types/report';

const MAX_COMPANIES = 50;
const MAX_ERRORS = 500;

export const useCsvValidators = (
  csvData: CsvReport,
  validators: CsvValueValidation[],
  csvValues: string[][]
) => {
  const t = useTranslations();
  let errors: Array<string | boolean> = [];

  if (csvValues?.length === 0) {
    errors.push('CSV has no values');
  }

  const uniqueCompanies = getUniqueStringsFromArray(csvData?.details_name);
  const numberOfCompanies = uniqueCompanies.filter(Boolean);
  const tooManyCompanies = numberOfCompanies.length > MAX_COMPANIES;

  // if too many companies, add error
  // if (tooManyCompanies) {
  //   errors.push(
  //     t('max_companies', {
  //       max_companies: MAX_COMPANIES,
  //       total_companies: numberOfCompanies.length
  //     })
  //   );
  // }

  // checks the reportObject for the headers that are required
  // returns an array of missing header names
  const missingHeaders = Object.entries(validators)
    .map(([_index, { header, required }]) => {
      const isPresent = csvData[header as CsvReportUploadHeaders];
      return isPresent ? null : required ? null : header;
    })
    .filter(x => x);

  const isValid = errors?.length === 0 && missingHeaders.length === 0;

  if (uniqueCompanies.indexOf('') !== -1) {
    errors.push('All rows must have a company name');
  }

  // if we limit errors to eg 100, we need to be able to break the loop of
  // csvData entries which isn't possible with Array methods like forEach, map or flatMap
  // or Object.entries
  // it's more verbose this way but won't keep running if theres thousands of errors
  if (
    !tooManyCompanies &&
    csvData &&
    validators &&
    errors.length < MAX_ERRORS
  ) {
    // loop 1: csvData object properties
    for (const i in csvData) {
      const key = i as CsvReportUploadHeaders;

      // check property exists
      if (Object.prototype.hasOwnProperty.call(csvData, key)) {
        const values = csvData[key];

        // find the validator for the header
        const columnHeader = validators.find(item => item.header === key);

        // access the validator function in valueValidation
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
    numberOfCompanies: numberOfCompanies.length
  };
};
