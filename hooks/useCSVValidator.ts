import { CSVValueValidation, FileContentType } from '../types/report';

const useCSVValidator = (
  file: File | null,
  fileContent: FileContentType,
  validators: CSVValueValidation[]
) => {
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
            : null;

          // create array of invalid values
          return (
            validator &&
            // calls the validation function and then filters out truthy values
            // these are going to be the error messages if there are any
            values.map((value: any) => validator(value)).filter((x: any) => x)
          );
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
    missingHeaders
  };
};

export default useCSVValidator;
