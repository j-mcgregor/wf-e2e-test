/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { useState } from 'react';

import {
  CsvReportUploadHeaders,
  CSVValueValidation,
  FileContentType
} from '../types/report';

export type ErrorType = string | boolean | null;
export type ErrorArray = ErrorType[];

const readFile = (
  file: File | null,
  setFile: (file: string | ArrayBuffer | null | undefined) => void
) => {
  if (typeof FileReader !== 'undefined') {
    const reader = new FileReader();
    reader.onload = function (file) {
      setFile(file.target?.result);
    };

    if (file) {
      reader.readAsText(file);
    } else {
      return '';
    }
  } else {
    return '';
  }
};

const useCSVValidator = (
  file: File | null,
  validators: CSVValueValidation[]
) => {
  const [fileContent, setFileContent] = useState<FileContentType>('');
  const [fileName, setFileName] = useState<string>('');

  // extract the file name
  if (fileName !== file?.name) {
    file?.name && setFileName(file.name);
  }

  // read the file and set the content
  readFile(file, setFileContent);

  // get headers & values as array from content
  // convert csv content to string & remove carriage returns ('\r')
  const csvString = fileContent?.toString().replace(/[\r]/g, '');

  // split out the rows from the csv string
  const contentSplit = csvString?.split('\n');

  // create a safe array
  const safeContent = Array.isArray(contentSplit) ? contentSplit : [];

  // get the first row of headers from the string
  const csvHeaders = safeContent?.[0]?.split(',') || [];

  // split the rows and then map over to split the cells
  const csvValues = Array.isArray(contentSplit)
    ? contentSplit?.slice(1, contentSplit.length).map(value => value.split(','))
    : [];

  const noSecondRow = contentSplit?.length && contentSplit.length < 2;

  // create object from headers / values
  const reportObject =
    csvValues &&
    csvHeaders?.reduce((acc, curr: string, i) => {
      //
      const row = csvValues.map(x => x[Number(i)]);
      return {
        ...acc,
        [curr]: row
      };
    }, {} as { [K in CsvReportUploadHeaders]: string[] });

  // create an array of errors based on the validator functions
  const valueAndHeaderErrors =
    reportObject && validators
      ? Object.keys(reportObject).flatMap(key => {
          const values = reportObject[`${key as CsvReportUploadHeaders}`];

          // find the validator for the header
          const columnHeader = validators.find(item => item.header === key);

          // access the validator function in valueValidation
          const validatorFunctions = columnHeader?.validate
            ? columnHeader.validate
            : false;

          // create array of invalid values
          return [
            ...(validatorFunctions
              ? values
                  // calls the validation function and then filters out truthy values
                  // these are going to be the error messages if there are any
                  .flatMap((value: string) =>
                    validatorFunctions.map(
                      validator => value && validator(value?.trim())
                    )
                  )
              : // if there is no validator function it returns false
                // which is filtered and removed from the array
                [false])
          ].filter((x: ErrorType) => !!x);
        })
      : [];

  const errors = noSecondRow
    ? ['This CSV file has no data', ...valueAndHeaderErrors]
    : valueAndHeaderErrors;
  // checks the reportObject for the headers that are required
  // returns an array of missing header names
  // TODO : fix test since Sam changed the entries object
  const missingHeaders = Object.entries(validators)
    .map(([header, { required }]) => {
      const isPresent = reportObject[header as CsvReportUploadHeaders];
      return isPresent ? null : required ? header : null;
    })
    .filter(x => x);

  // check for CSV validity
  const isCSV = file?.type === 'text/csv' ? true : false;
  // determine the full validity of the file
  const isValid =
    errors?.length === 0 &&
    missingHeaders.length === 0 &&
    !noSecondRow &&
    isCSV;

  return {
    csvData: reportObject,
    csvValues,
    errors,
    fileName,
    isCSV,
    isValid,
    missingHeaders,
    totalRows: csvValues?.length || 0
  };
};

export default useCSVValidator;
