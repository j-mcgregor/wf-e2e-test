/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { readExcelFile, readFile } from '../lib/utils/file-helpers';
import { isBatchAutoOrManual } from '../lib/utils/report-helpers';
import { getUniqueStringsFromArray } from '../lib/utils/text-helpers';
import type {
  CsvReport,
  CsvReportUploadHeaders,
  FileContentType
} from '../types/report';
import * as Excel from 'xlsx';

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

const excelFileTypes = [
  // Excel Files 2007+ (.xlsx)
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // Excel Files 97-2003 (.xls)
  'application/vnd.ms-excel'
];

export const useManualReportUploadFile = (file: File | null) => {
  const [fileContent, setFileContent] = useState<FileContentType | Excel.Sheet>(
    null
  );
  const [fileContentCsv, setFileContentCsv] = useState<
    FileContentType | Excel.Sheet
  >(null);

  const fileType = csvFileTypes.includes(`${file?.type}`)
    ? 'csv'
    : excelFileTypes.includes(`${file?.type}`)
    ? 'excel'
    : null;

  useEffect(() => {
    return () => {
      setFileContent(null);
      setFileContentCsv(null);
    };
  }, [file]);

  if (fileType === 'csv') {
    // read the file and set the content
    readFile(!fileContent ? file : null, setFileContentCsv);
    return handleCSV(fileContentCsv as FileContentType, file?.name);
  }

  if (fileType === 'excel') {
    console.log('Reading file', file?.name);
    readExcelFile(!fileContent ? file : null, setFileContent);
    return handleExcel(fileContent as Excel.Sheet, file?.name);
  }

  if (file !== null && !file) {
    setFileContent(null);
  }

  return {
    data: {}
  };
};

const handleExcel = (file: Excel.Sheet | null, fileName?: string) => {
  if (file?.Sheets) {
    const firstSheetName = file?.SheetNames?.[0];

    const firstSheet = file?.Sheets[firstSheetName];

    // pass headers: 1 to access the headers
    // format returned is [[headers], [data], [data]] // similar to CSV
    const firstSheetJson = Excel.utils.sheet_to_json(firstSheet, {
      header: 1,
      raw: false
    });

    // first row is headers
    const headers = firstSheetJson?.[0];
    const data =
      firstSheetJson?.slice(1, firstSheetJson.length) || ([] as string[]);

    console.log('firstSheet', firstSheet);
    console.log('firstSheetJson', firstSheetJson);
    console.log('headers', headers);
    console.log('data', data);

    // Remove empty rows (the download csv process can sometimes add an empty row)
    const filteredValues = data.filter((row: string[]) => {
      // if some cells are truthy || all cells are not empty
      if (row.every((cell: string) => !cell)) {
        return;
      }
      return row;
    });

    // create object from headers / values
    const csvData =
      data &&
      headers?.reduce((acc, header: string, i) => {
        // map csvValues to get the array of values for each header
        const row = data.map(cell => cell[Number(i)]);

        return {
          ...acc,
          [header]: row
        };
      }, {} as CsvReport);

    console.log('csvData', csvData);
    // handle excels bullshit
    // const isCSV = csvFileTypes.includes(`${fileContent?.type}`) || false;
    const isAutoOrManual = isBatchAutoOrManual(csvData);

    let totalCompanies: string[] = [];

    switch (isAutoOrManual.type) {
      case 'BATCH_AUTO':
        totalCompanies = getUniqueStringsFromArray(csvData?.company_id).filter(
          Boolean
        );
        break;
      case 'BATCH_MANUAL':
        totalCompanies = getUniqueStringsFromArray(
          csvData?.details_name
        ).filter(Boolean);
        break;
    }
    return {
      data: csvData || [],
      values: filteredValues,
      fileName,
      fileType: 'xlsx',
      isCSV: false,
      isExcel: true,
      isAutoOrManual,
      totalRows: data?.length || 0,
      totalCompanies: totalCompanies?.length || 0
    };
  }

  return {
    data: {}
  };
};

const handleCSV = (file: FileContentType, fileName?: string) => {
  // get headers & values as array from content
  // convert csv content to string & remove carriage returns ('\r')
  const csvString = file?.toString().replace(/[\r]/g, '');

  // split out the rows from the csv string
  const contentSplit = csvString?.split('\n');

  const trailingCommaRegEx = new RegExp(/,\s*$/);
  const doubleTrailingCommaRegEx = new RegExp(/,,\s*$/);

  // when exporting from .xlsx, rows can sometimes have a single trailing comma
  // in the header row, this throws the auto vs batch calulation later
  // in data rows it can lead to issues. A double comma is indicative
  // of an empty value, but a single comma implies the next column

  const processCommas = (safe: string) => {
    const hasTrailingComma = trailingCommaRegEx.test(safe);
    const hasDoubleTrailingComma = doubleTrailingCommaRegEx.test(safe);

    if (hasTrailingComma && !hasDoubleTrailingComma) {
      safe = safe.replace(trailingCommaRegEx, '');
    }

    return safe;
  };

  // create a safe array
  const safeContent = (Array.isArray(contentSplit) ? contentSplit : []).map(
    processCommas
  );

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
  // const isCSV = csvFileTypes.includes(`${fileContent?.type}`) || false;
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
    data: csvData,
    values: filteredValues,
    fileName,
    fileType: 'csv',
    isCSV: true,
    isExcel: false,
    isAutoOrManual,
    totalRows: csvValues?.length || 0,
    totalCompanies: totalCompanies?.length || 0
  };
};

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

  const trailingCommaRegEx = new RegExp(/,\s*$/);
  const doubleTrailingCommaRegEx = new RegExp(/,,\s*$/);

  // when exporting from .xlsx, rows can sometimes have a single trailing comma
  // in the header row, this throws the auto vs batch calulation later
  // in data rows it can lead to issues. A double comma is indicative
  // of an empty value, but a single comma implies the next column

  const processCommas = (safe: string) => {
    const hasTrailingComma = trailingCommaRegEx.test(safe);
    const hasDoubleTrailingComma = doubleTrailingCommaRegEx.test(safe);

    if (hasTrailingComma && !hasDoubleTrailingComma) {
      safe = safe.replace(trailingCommaRegEx, '');
    }

    return safe;
  };

  // create a safe array
  const safeContent = (Array.isArray(contentSplit) ? contentSplit : []).map(
    processCommas
  );

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
