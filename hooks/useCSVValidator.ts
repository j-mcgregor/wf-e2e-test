/* eslint-disable sonarjs/cognitive-complexity */
import { useState } from 'react';
import { CSVValueValidation, FileContentType } from '../types/report';

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

  // extract the required headers
  const validatorHeaders = validators.map(validator => validator.header);

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

  // create object from headers / values
  const reportObject: { [index: string]: [] } =
    csvValues &&
    csvHeaders?.reduce((acc, curr: string, i) => {
      const row = csvValues.map(x => x[Number(i)]);
      return {
        ...acc,
        [curr]: row
      };
    }, {});

  // create an array of errors based on the validator functions
  const errors =
    reportObject && validators
      ? Object.keys(reportObject).flatMap(key => {
          const values = reportObject[`${key}`];

          // find the validator for the header
          const validatorArray = validators.find(item => item.header === key);

          // access the validator function in valueValidation
          const validator = validatorArray?.validate
            ? validatorArray.validate
            : false;

          // create array of invalid values
          return [
            ...(validator
              ? values
                  // calls the validation function and then filters out truthy values
                  // these are going to be the error messages if there are any
                  .map((value: string) => validator(value))
              : // if there is no validator function it returns false
                // which is filtered and removed from the array
                [false])
          ].filter((x: ErrorType) => !!x);
        })
      : [];

  // checks the reportObject for the headers that are required
  // returns an array of missing header names
  const missingHeaders = validatorHeaders
    .map(header => (reportObject[header] ? null : `${header}`))
    .filter(x => x);

  // check for CSV validity
  const isCSV = file?.type === 'text/csv' ? true : false;

  // determine the full validity of the file
  const isValid = errors?.length === 0 && missingHeaders.length === 0;

  return {
    isCSV,
    errors,
    isValid,
    missingHeaders,
    csvData: reportObject,
    totalRows: csvValues?.length || 0,
    fileName
  };
};

export default useCSVValidator;
