import { FileContentType, ValidCSVType } from '../../types/report';

export const useCSVValidator = (
  file: File | null,
  fileContent: FileContentType,
  requiredValues: ValidCSVType
) => {
  // validate headers
  // get headers & values as array from content
  // convert csv content to string & remove carriage returns ('\r')
  const contentString = fileContent?.toString().replace(/[\r]/g, '');
  const reportHeaders = contentString?.split('\n')[0]?.split(',');
  const reportValues = contentString?.split('\n')[1]?.split(',');

  // create object from headers / values
  const reportObject =
    reportValues &&
    reportHeaders?.reduce(
      (acc, curr: string, i) => ({ ...acc, [curr]: reportValues[Number(i)] }),
      {}
    );

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
    isValid
  };
};
