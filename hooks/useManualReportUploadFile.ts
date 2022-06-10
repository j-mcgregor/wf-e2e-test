/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import * as Excel from 'xlsx';

import { XLS, XLSX } from '../components/uploads/UploadFile';
import { readExcelFile, readFile } from '../lib/utils/file-helpers';
import { handleCSV, handleExcel } from '../lib/utils/report-helpers';
import { FileContentType, ReportHandlerReturn } from '../types/report';

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
