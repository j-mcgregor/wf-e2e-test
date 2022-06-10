/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import * as Excel from 'xlsx';

import { XLS, XLSX } from '../components/uploads/UploadFile';
import { readExcelFile, readFile } from '../lib/utils/file-helpers';
import { isBatchAutoOrManual } from '../lib/utils/report-helpers';
import { getUniqueStringsFromArray } from '../lib/utils/text-helpers';
import { UploadReportType } from '../types/global';
import {
  CsvReport,
  CsvReportUploadHeaders,
  FileContentType
} from '../types/report';

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
  XLSX,
  // Excel Files 97-2003 (.xls)
  XLS
];

interface ReportHandlerReturn {
  data: CsvReport | null;
  values: string[][];
  fileName: string;
  fileType: 'xlsx' | 'csv' | null;
  isCSV: boolean;
  isExcel: boolean;
  isAutoOrManual: UploadReportType | null;
  totalRows: number;
  totalCompanies: number;
}

export const useManualReportUploadFile = (
  file: File | null
): ReportHandlerReturn => {
  const [fileContent, setFileContent] = useState<FileContentType | Excel.Sheet>(
    null
  );

  if (file !== null && !file) {
    setFileContent(null);
  }

  const fileType = csvFileTypes.includes(`${file?.type}`)
    ? 'csv'
    : excelFileTypes.includes(`${file?.type}`)
    ? 'excel'
    : null;

  // cleanup
  useEffect(() => {
    return () => {
      setFileContent(null);
    };
  }, [file]);

  if (fileType === 'csv') {
    // read the file and set the content
    readFile(!fileContent ? file : null, setFileContent);
    return handleCSV(fileContent as FileContentType, file?.name);
  }

  if (fileType === 'excel') {
    console.log('Reading file', file?.name);
    readExcelFile(!fileContent ? file : null, setFileContent);
    const formattedExcel = handleExcel(fileContent as Excel.Sheet, file?.name);
    if (formattedExcel) {
      return formattedExcel;
    }
  }

  return {
    data: null,
    values: [],
    fileName: '',
    fileType: null,
    isCSV: false,
    isExcel: false,
    isAutoOrManual: null,
    totalRows: 0,
    totalCompanies: 0
  };
};

const handleExcel = (
  file: Excel.Sheet | null,
  fileName?: string
): ReportHandlerReturn | null => {
  if (file?.Sheets) {
    const firstSheetName = file?.SheetNames?.[0];

    const firstSheet = file?.Sheets[firstSheetName];

    // pass headers: 1 to access the headers
    // format returned is [[headers], [data], [data]] // similar to CSV
    const firstSheetJson = Excel.utils.sheet_to_json(firstSheet, {
      header: 1,
      raw: false,
      defval: '',
      blankrows: false
    }) as [Array<CsvReportUploadHeaders>, ...Array<string[]>];

    console.log('firstSheetJson', firstSheetJson);

    // first row is headers
    // eg [ "currency", "iso_code" ...]
    const headers = firstSheetJson?.[0];

    // eg [ [ "GBP", "1234" ], [ "GBP", "1234" ] ... ]
    const data =
      firstSheetJson?.slice(1, firstSheetJson.length) || ([] as string[]);

    // Remove empty rows (the download csv process can sometimes add an empty row)
    const filteredValues = data.filter(row => {
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
      fileName: fileName || '',
      fileType: 'xlsx',
      isCSV: false,
      isExcel: true,
      isAutoOrManual,
      totalRows: data?.length || 0,
      totalCompanies: totalCompanies?.length || 0
    };
  }
  return null;
};

const handleCSV = (
  file: FileContentType,
  fileName?: string
): ReportHandlerReturn => {
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
    fileName: fileName || '',
    fileType: 'csv',
    isCSV: true,
    isExcel: false,
    isAutoOrManual,
    totalRows: csvValues?.length || 0,
    totalCompanies: totalCompanies?.length || 0
  };
};

// // MY EDIT FROM YESTERDAY
// export const useCSV = (file: File | null): ReportHandlerReturn => {
//   const [fileContent, setFileContent] = useState<FileContentType>();
//   const [fileName, setFileName] = useState<string>('');
//   const [fileType, setFileType] = useState<'csv' | 'excel' | null>();

//   // const [data, setData] = useState<CsvReport>();
//   // const [isAutoOrManual, setIsAutoOrManual] = useState<UploadReportType>();
//   let data = {} as CsvReport;
//   let isAutoOrManual = {} as UploadReportType;

//   // extract the file name
//   if (fileName !== file?.name) {
//     file?.name && setFileName(file.name);
//     if (file?.type) {
//       if (csvFileTypes.includes(file?.type)) {
//         setFileType('csv');
//         // read the file and set the content
//         readFile(file, setFileContent);
//       }
//       if (file.type === XLS || file.type === XLSX) {
//         setFileType('excel');
//       }
//     }
//   }

//   // get headers & values as array from content
//   // convert csv content to string & remove carriage returns ('\r')
//   const csvString = fileContent?.toString().replace(/[\r]/g, '');

//   // split out the rows from the csv string
//   const contentSplit = csvString?.split('\n');

//   const trailingCommaRegEx = new RegExp(/,\s*$/);
//   const doubleTrailingCommaRegEx = new RegExp(/,,\s*$/);

//   // when exporting from .xlsx, rows can sometimes have a single trailing comma
//   // in the header row, this throws the auto vs batch calulation later
//   // in data rows it can lead to issues. A double comma is indicative
//   // of an empty value, but a single comma implies the next column

//   const processCommas = (safe: string) => {
//     const hasTrailingComma = trailingCommaRegEx.test(safe);
//     const hasDoubleTrailingComma = doubleTrailingCommaRegEx.test(safe);

//     if (hasTrailingComma && !hasDoubleTrailingComma) {
//       safe = safe.replace(trailingCommaRegEx, '');
//     }

//     return safe;
//   };

//   // create a safe array
//   const safeContent = (Array.isArray(contentSplit) ? contentSplit : []).map(
//     processCommas
//   );

//   // get the first row of headers from the string
//   const csvHeaders = safeContent?.[0]?.split(',') || [];

//   // split the rows and then map over to split the cells
//   // but if comma is in between [] then ignore
//   const csvValues = Array.isArray(contentSplit)
//     ? contentSplit?.slice(1, contentSplit.length).map(value => {
//         return value.split(/(?=[^']),(?!')/g);
//       })
//     : [];

//   // Remove empty rows (the download csv process can sometimes add an empty row)
//   const filteredValues = csvValues.filter(row => {
//     // if some cells are truthy || all cells are not empty
//     if (row.every(cell => !cell)) {
//       return;
//     }
//     return row;
//   });

//   if (fileType === 'csv') {
//     // create object from headers / values
//     const csvReport =
//       csvValues &&
//       csvHeaders?.reduce((acc, header: string, i) => {
//         // map csvValues to get the array of values for each header
//         const row = filteredValues.map(cell => cell[Number(i)]);

//         return {
//           ...acc,
//           [header]: row
//         };
//       }, {} as CsvReport);

//     data = csvReport;
//     isAutoOrManual = isBatchAutoOrManual(csvReport);
//   }

//   if (file && fileType === 'excel') {
//     // tried to extract this to separate function but setting the return value from fileOnLoad can get messy and cause infinite loops
//     const reader = new FileReader();
//     let excelReport = {} as CsvReport;

//     const fileOnLoad = (e: ProgressEvent<FileReader>) => {
//       const result = e.target?.result;
//       const workbook = Excel.read(result);

//       const jsonSheets = workbook.SheetNames.map(sheet => {
//         if (workbook.Sheets[sheet]) {
//           const worksheet = workbook.Sheets[sheet];
//           const json: Record<CsvReportUploadHeaders, string | number>[] =
//             Excel.utils.sheet_to_json(worksheet, { defval: '' });
//           // console.log('json', json);
//           return json;
//         }
//         return [];
//       });

//       // console.log('jsonSheets[0]', jsonSheets[0]);
//       // Only first sheet is required
//       jsonSheets[0].forEach(sheet => {
//         // split each row, use header for excelReport key
//         Object.entries(sheet).forEach(([key, value], i) => {
//           // console.log('key', key);
//           // cast to CsvReportUploadHeaders
//           const k = key as CsvReportUploadHeaders;

//           // if property exists, push into values
//           if (excelReport[k]) {
//             let tmp = excelReport[k];
//             tmp.push(`${value}`);
//             excelReport[k] = tmp;
//           } else {
//             // else create value as array
//             excelReport[k] = [`${value}`];
//           }
//         });
//       });

//       console.log('excelReport', excelReport);
//       if (!data) {
//         data = excelReport;
//         isAutoOrManual = isBatchAutoOrManual(excelReport);
//       }
//     };

//     reader.onload = fileOnLoad;
//     reader.readAsArrayBuffer(file);
//   }

//   let totalCompanies: (string | number)[] = [];

//   switch (isAutoOrManual?.type) {
//     case 'BATCH_AUTO':
//       totalCompanies = getUniqueStringsFromArray(data?.company_id).filter(
//         Boolean
//       );
//       break;
//     case 'BATCH_MANUAL':
//       totalCompanies = getUniqueStringsFromArray(data?.details_name).filter(
//         Boolean
//       );
//       break;
//   }

//   console.log('data', data);
//   return {
//     csvData: data,
//     csvValues: filteredValues,
//     fileName,
//     isCSV: fileType === 'csv',
//     isExcel: fileType === 'excel',
//     isAutoOrManual,
//     totalRows: csvValues?.length || 0,
//     totalCompanies: totalCompanies?.length || 0
//   };
// };

// useFile hook
// 1. determine file type
// 2. convert
// 3. isBatchAutoOrManual

// useFileValidator
// 4. refactor useCsvValidator to work with useFile hook
