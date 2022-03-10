/* eslint-disable no-console */
import { useState } from 'react';

import { readFile } from '../lib/utils/file-helpers';
import { isBatchAutoOrManual } from '../lib/utils/report-helpers';
import { getUniqueStringsFromArray } from '../lib/utils/text-helpers';

// have to handle all possible mime types
// see this issue https://christianwood.net/posts/csv-file-upload-validation/
// and this SO https://stackoverflow.com/questions/7076042/what-mime-type-should-i-use-for-csv#answer-42140178
const csvFileTypes = [
  'text/x-csv',
  'application/vnd.ms-excel',
  'application/csv',
  'application/x-csv',
  'text/csv',
  'text/comma-separated-values',
  'text/x-comma-separated-values'
];

import type { CsvReport, FileContentType } from '../types/report';

export const useCSV = (file: File | null) => {
  const [fileContent, setFileContent] = useState<FileContentType>();
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
  // but if comma is in between [] then ignore
  const csvValues = Array.isArray(contentSplit)
    ? contentSplit?.slice(1, contentSplit.length).map(value => {
        return value.split(/(?=[^']),(?!')/g);
      })
    : [];

  // Remove empty rows (the download csv process can sometimes add an empty row)
  const filteredValues = csvValues.filter(row => {
    // if some cells are truthy || all cells are not empty
    if (row.every(cell => !cell)) {
      return;
    }
    return row;
  });

  // create object from headers / values
  const csvData =
    csvValues &&
    csvHeaders?.reduce((acc, header: string, i) => {
      // map csvValues to get the array of values for each header
      const row = filteredValues.map(cell => cell[Number(i)]);

      return {
        ...acc,
        [header]: row
      };
    }, {} as CsvReport);

  // handle excels bullshit
  const isCSV = csvFileTypes.includes(`${file?.type}`) || false;
  const isAutoOrManual = isBatchAutoOrManual(csvData);

  let totalCompanies: string[] = [];

  switch (isAutoOrManual.type) {
    case 'BATCH_AUTO':
      totalCompanies = getUniqueStringsFromArray(csvData?.company_id).filter(
        Boolean
      );
      break;
    case 'BATCH_MANUAL':
      totalCompanies = getUniqueStringsFromArray(csvData?.details_name).filter(
        Boolean
      );
      break;
  }

  return {
    csvData,
    csvValues: filteredValues,
    fileName,
    isCSV,
    isAutoOrManual,
    totalRows: csvValues?.length || 0,
    totalCompanies: totalCompanies?.length || 0
  };
};
