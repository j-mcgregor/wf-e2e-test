import { FileContentType, ValidCSVType } from '../types/report';

const useCSVValidator = (
  file: File | null,
  fileContent: FileContentType,
  requiredValues: ValidCSVType
) => {
  // validate headers
  // get headers & values as array from content
  // convert csv content to string & remove carriage returns ('\r')

  const contentString = fileContent?.toString().replace(/[\r]/g, '');
  const contentSplit = contentString?.split('\n');

  const reportHeaders = contentSplit?.[0]?.split(',');

  const reportValues = contentSplit
    ?.slice(1, contentSplit.length)
    .map(value => value.split(','));

  // create object from headers / values
  const reportObject =
    reportValues &&
    reportHeaders?.reduce((acc, curr: string, i) => {
      const row = reportValues.map(x => x[i]);
      return {
        ...acc,
        [curr]: row
      };
    }, {});

  const invalidValues =
    reportObject && requiredValues.valueValidation
      ? Object.keys(reportObject).flatMap(key => {
          const values = reportObject[key];

          // find the validator for the header
          const validatorArray = requiredValues.valueValidation.find(
            item => item.header === key
          );
          // access the validator function in valueValidation
          const validator = validatorArray?.validate
            ? validatorArray.validate
            : null;
          // create array of invalid values
          return (
            validator &&
            values.map((value: any) => validator(value)).filter((x: any) => x)
          );
        })
      : [];

  // missing required header errors
  const headerErrors =
    reportObject &&
    requiredValues.valid_report_headers
      .map(header =>
        Object.keys(reportObject).indexOf(header) > -1 ? null : header
      )
      .filter(x => x);

  // validate required report values

  const requiredErrors =
    reportObject &&
    Object.entries(reportObject)
      .map(key => {
        const reportObjectKey = key[0];
        const reportObjectValue = key[1];

        if (requiredValues.required_report_values.includes(reportObjectKey)) {
          return !reportObjectValue ? reportObjectKey : null;
        }
      })
      .filter(x => x);

  const isCSV = file?.type === 'text/csv' ? true : false;

  const isValid = headerErrors?.length === 0 && requiredErrors?.length === 0;

  return {
    isCSV,
    headerErrors,
    requiredErrors,
    isValid,
    invalidValues
  };
};

export default useCSVValidator;
