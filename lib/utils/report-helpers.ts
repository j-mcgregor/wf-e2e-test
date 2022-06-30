/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/prefer-immediate-return */
import {
  autoBatchUploadValidators,
  manualUploadValidators
} from '../settings/report-validators';
import * as Excel from 'xlsx';

import type { UploadReportType } from '../../types/global';
import type {
  CsvReport,
  CsvReportUploadHeaders,
  ESG_SectorKeys,
  FileContentType,
  IndustrySectorCodes,
  ReportHandlerReturn,
  ReportUploadFinancialRequestBody,
  ReportUploadRequestBody
} from '../../types/report';
import { getUniqueStringsFromArray } from './text-helpers';
import { MAX_ROWS } from './file-helpers';

// adds blank objects to the array to make it the same length as the other arrays
export const addBlankObjects = (array: any[], lengthRequired: number) => {
  const length = array.length;
  if (length < lengthRequired + 1) {
    const blankArrayLength = 5 - length;
    const blankArrayArray = Array(blankArrayLength).fill({});
    return [...array, ...blankArrayArray];
  }
  return array;
};

// clunky first attempt: it works but can do with some refactoring
export const makeUploadReportReqBody = (
  reportObject: CsvReport,
  csvValues: string[][],
  parent_id?: string
): ReportUploadRequestBody => {
  // setter functions
  const setNumberValue = (key: CsvReportUploadHeaders, i: number) => {
    const number = Number(reportObject[key]?.[i] ?? 0);
    if (isNaN(number)) {
      // filter for non-numeric values
      return Number(
        reportObject[key]?.[i].replace(/(?!^-)[^\de+\-eE.]+/gi, '')
      );
    }
    return number;
  };
  // remove all none number characters except a - sign at the start

  const setStringValue = (key: CsvReportUploadHeaders, i: number) => {
    const string = reportObject[key]?.[i] ?? '';
    if (string.toLowerCase() === 'null') {
      return '';
    }
    return string;
  };

  const financials: ReportUploadFinancialRequestBody[] = csvValues.map(
    (_, i) => {
      return {
        cash_and_equivalents: setNumberValue('cash_and_equivalents', i),
        creditors: setNumberValue('creditors', i),
        company_age: setNumberValue('company_age', i),
        current_assets: setNumberValue('current_assets', i),
        current_liabilities: setNumberValue('current_liabilities', i),
        debtors: setNumberValue('debtors', i),
        ebit: setNumberValue('ebit', i),
        ebitda: setNumberValue('ebitda', i),
        fixed_assets: setNumberValue('fixed_assets', i),
        intangible_fixed_assets: setNumberValue('intangible_fixed_assets', i),
        interest_expenses: setNumberValue('interest_expenses', i),
        inventory: setNumberValue('inventory', i),
        loans: setNumberValue('loans', i),
        long_term_debt: setNumberValue('long_term_debt', i),
        management_experience:
          setStringValue('management_experience', i) || null,
        net_income: setNumberValue('net_income', i),
        non_current_liabilities: setNumberValue('non_current_liabilities', i),
        number_of_directors: setNumberValue('number_of_directors', i),
        number_of_subsidiaries: setNumberValue('number_of_subsidiaries', i),
        number_of_employees: setNumberValue('number_of_employees', i),
        other_non_current_liabilities: setNumberValue(
          'other_non_current_liabilities',
          i
        ),
        period: setStringValue('period', i),
        retained_earnings: setNumberValue('retained_earnings', i),
        short_term_debt: setNumberValue('short_term_debt', i),
        tangible_fixed_assets: setNumberValue('tangible_fixed_assets', i),
        total_assets: setNumberValue('total_assets', i),
        total_liabilities: setNumberValue('total_liabilities', i),
        total_shareholder_equity: setNumberValue('total_shareholder_equity', i),
        turnover: setNumberValue('turnover', i),
        working_capital: setNumberValue('working_capital', i)
      };
    }
  );
  return {
    parent_id: parent_id || null,
    // MAIN ========================
    iso_code: setStringValue('iso_code', 0),
    company_id: setStringValue('company_id', 0),
    currency: setStringValue('currency', 0),
    // DETAILS =====================
    details: {
      name: setStringValue('details_name', 0),
      nace_code: setNumberValue('details_nace_code', 0) || null,
      industry_sector_code:
        (setNumberValue(
          'details_industry_sector_code',
          0
        ) as IndustrySectorCodes) || null,
      website: setStringValue('details_website', 0),
      company_type: setStringValue('details_company_type', 0) || null
    },
    // FINANCIALS ==================
    // multiple years per report are mapped here
    financials
  };
};

// extract for testing
export const calculateSMEZScoreMax = (x: number) => {
  let max: number;

  if (x >= 900) {
    max = Math.min(1.0, 0.9 + (x - 900) / 1000);
  } else if (x >= 700) {
    max = Math.min(0.9, 0.8 + (x - 700) / 2000);
  } else if (x >= 500) {
    max = Math.min(0.8, 0.7 + (x - 500) / 2000);
  } else if (x >= 400) {
    max = Math.min(0.7, 0.6 + (x - 400) / 1000);
  } else if (x >= 270) {
    max = Math.min(0.6, 0.5 + (x - 270) / 1300);
  } else if (x >= 100) {
    max = Math.min(0.5, 0.2 + (x - 100) / 1700);
  } else {
    max = Math.min(0.2, x / 500);
  }
  return max;
};

export const calculateSMEZScoreRotation = (value: number) => {
  const max = calculateSMEZScoreMax(value);

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = max * 260 - 130;
  return angle;
};

// extract to test
export const calculatePoDRatio = (x: number) => {
  let ratio: number;

  // x needs to be converted to a percentage
  const val = x;

  if (val <= 10) {
    ratio = Math.min(0.2, val / 50);
  } else if (val <= 12) {
    ratio = Math.min(0.5, 0.2 + (0.3 * (val - 10)) / 2);
  } else if (val <= 50) {
    ratio = Math.min(0.9, 0.5 + (0.4 * (val - 12)) / 38);
  } else {
    ratio = Math.min(1.0, 0.9 + (0.1 * (x - 50)) / 50);
  }

  return ratio;
};

export const calculatePoDRotation = (value: number) => {
  // if value zero set to default
  if (value === 0) return -130;

  let ratio = calculatePoDRatio(value);

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = ratio * 260 - 130;

  return Number.parseFloat(angle.toFixed(4));
};

export const calculateLGDPercent = (x: number) => {
  let percent: number;

  // calculations performed on percentage
  const val = x;

  if (val <= 20) {
    percent = Math.min(0.2, val / 100);
  } else if (val <= 40) {
    percent = Math.min(0.5, 0.2 + (0.3 * (val - 20)) / 20);
  } else if (val <= 90) {
    percent = Math.min(0.9, 0.5 + (0.4 * (val - 40)) / 50);
  } else {
    percent = Math.min(1.0, 0.9 + (0.1 * (val - 90)) / 10);
  }

  return percent;
};

export const calculateLGDRotation = (value: number) => {
  const percent = calculateLGDPercent(value);
  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = percent * 260 - 130;

  return angle;
};

export const isBatchAutoOrManual = (csvData: CsvReport): UploadReportType => {
  if (
    Object.keys(csvData).length === 2 &&
    csvData.iso_code &&
    csvData.company_id
  ) {
    return {
      type: 'BATCH_AUTO',
      apiUrl: '/api/batch-reports',
      validator: autoBatchUploadValidators,
      // if all iso_codes are the same, use it.
      // this is used for default currency selection of auto batch
      ...(csvData.iso_code.every(iso => iso === csvData.iso_code[0]) && {
        iso_code: csvData.iso_code[0]
      })
    };
  } else {
    return {
      type: 'BATCH_MANUAL',
      apiUrl: '/api/batch-reports/manual',
      validator: manualUploadValidators
    };
  }
};
export const ESG_SECTORS: Record<ESG_SectorKeys, string> = {
  Accounting: 'Accounting',
  Airlines_Aviation: 'Airlines aviation',
  Alternative_Dispute_Resolution: 'Alternative dispute resolution',
  Alternative_Medicine: 'Alternative medicine',
  Animation: 'Animation',
  Apparel_and_Fashion: 'Apparel and fashion',
  Architecture_and_Planning: 'Architecture and planning',
  Arts_and_Crafts: 'Arts and crafts',
  Automotive: 'Automotive',
  Aviation_and_Aerospace: 'Aviation and aerospace',
  Banking: 'Banking',
  Biotechnology: 'Biotechnology',
  Broadcast_Media: 'Broadcast media',
  Building_Materials: 'Building materials',
  Business_Supplies_and_Equipment: 'Business supplies and equipment',
  Capital_Markets: 'Capital markets',
  Chemicals: 'Chemicals',
  Civic_and_Social_Organization: 'Civic and social organization',
  Civil_Engineering: 'Civil engineering',
  Commercial_Real_Estate: 'Commercial real estate',
  Computer_Games: 'Computer games',
  Computer_Hardware: 'Computer hardware',
  Computer_Networking: 'Computer networking',
  Computer_Software: 'Computer software',
  Computer_and_Network_Security: 'Computer and network security',
  Construction: 'Construction',
  Consumer_Electronics: 'Consumer electronics',
  Consumer_Goods: 'Consumer goods',
  Consumer_Services: 'Consumer services',
  Cosmetics: 'Cosmetics',
  Dairy: 'Dairy',
  Defense_and_Space: 'Defense and space',
  Design: 'Design',
  'E-Learning': 'E-learning',
  Education_Management: 'Education management',
  Electrical_Electronic_Manufacturing: 'Electrical electronic manufacturing',
  Entertainment: 'Entertainment',
  Environmental_Services: 'Environmental services',
  Events_Services: 'Events services',
  Executive_Office: 'Executive office',
  Facilities_Services: 'Facilities services',
  Farming: 'Farming',
  Financial_Services: 'Financial services',
  Fine_Art: 'Fine art',
  Fishery: 'Fishery',
  Food_Production: 'Food production',
  Food_and_Beverages: 'Food and beverages',
  'Fund-Raising': 'Fund-raising',
  Furniture: 'Furniture',
  Gambling_and_Casinos: 'Gambling and casinos',
  Glass_Ceramics_and_Concrete: 'Glass ceramics and concrete',
  Government_Administration: 'Government administration',
  Government_Relations: 'Government relations',
  Graphic_Design: 'Graphic design',
  Health_Wellness_and_Fitness: 'Health wellness and fitness',
  Higher_Education: 'Higher education',
  Hospital_and_Health_Care: 'Hospital and health care',
  Hospitality: 'Hospitality',
  Human_Resources: 'Human resources',
  Import_and_Export: 'Import and export',
  Individual_and_Family_Services: 'Individual and family services',
  Industrial_Automation: 'Industrial automation',
  Information_Services: 'Information services',
  Information_Technology_and_Services: 'Information technology and services',
  Insurance: 'Insurance',
  International_Affairs: 'International affairs',
  International_Trade_and_Development: 'International trade and development',
  Internet: 'Internet',
  Investment_Banking: 'Investment banking',
  Investment_Management: 'Investment management',
  Judiciary: 'Judiciary',
  Law_Enforcement: 'Law enforcement',
  Law_Practice: 'Law practice',
  Legal_Services: 'Legal services',
  Legislative_Office: 'Legislative office',
  Leisure_Travel_and_Tourism: 'Leisure travel and tourism',
  Libraries: 'Libraries',
  Logistics_and_Supply_Chain: 'Logistics and supply chain',
  Luxury_Goods_and_Jewelry: 'Luxury goods and jewelry',
  Machinery: 'Machinery',
  Management_Consulting: 'Management consulting',
  Maritime: 'Maritime',
  Market_Research: 'Market research',
  Marketing_and_Advertising: 'Marketing and advertising',
  Mechanical_or_Industrial_Engineering: 'Mechanical or industrial engineering',
  Media_Production: 'Media production',
  Medical_Devices: 'Medical devices',
  Medical_Practice: 'Medical practice',
  Mental_Health_Care: 'Mental health care',
  Military: 'Military',
  Mining_and_Metals: 'Mining and metals',
  Motion_Pictures_and_Film: 'Motion pictures and film',
  Museums_and_Institutions: 'Museums and institutions',
  Music: 'Music',
  Nanotechnology: 'Nanotechnology',
  Newspapers: 'Newspapers',
  Nonprofit_Organization_Management: 'Nonprofit organization management',
  Oil_and_Energy: 'Oil and energy',
  Online_Media: 'Online media',
  Outsourcing_Offshoring: 'Outsourcing offshoring',
  Package_Freight_Delivery: 'Package freight delivery',
  Packaging_and_Containers: 'Packaging and containers',
  Paper_and_Forest_Products: 'Paper and forest products',
  Performing_Arts: 'Performing arts',
  Pharmaceuticals: 'Pharmaceuticals',
  Philanthropy: 'Philanthropy',
  Photography: 'Photography',
  Plastics: 'Plastics',
  Political_Organization: 'Political organization',
  Primary_Secondary_Education: 'Primary secondary education',
  Printing: 'Printing',
  Professional_Training_and_Coaching: 'Professional training and coaching',
  Program_Development: 'Program development',
  Public_Policy: 'Public policy',
  Public_Relations_and_Communications: 'Public relations and communications',
  Public_Safety: 'Public safety',
  Publishing: 'Publishing',
  Railroad_Manufacture: 'Railroad manufacture',
  Ranching: 'Ranching',
  Real_Estate: 'Real estate',
  Recreational_Facilities_and_Services: 'Recreational facilities and services',
  Religious_Institutions: 'Religious institutions',
  Renewables_and_Environment: 'Renewables and environment',
  Research: 'Research',
  Restaurants: 'Restaurants',
  Retail: 'Retail',
  Security_and_Investigations: 'Security and investigations',
  Semiconductors: 'Semiconductors',
  Shipbuilding: 'Shipbuilding',
  Sporting_Goods: 'Sporting goods',
  Sports: 'Sports',
  Staffing_and_Recruiting: 'Staffing and recruiting',
  Supermarkets: 'Supermarkets',
  Telecommunications: 'Telecommunications',
  Textiles: 'Textiles',
  Think_Tanks: 'Think tanks',
  Tobacco: 'Tobacco',
  Translation_and_Localization: 'Translation and localization',
  Transportation_Trucking_Railroad: 'Transportation trucking railroad',
  Utilities: 'Utilities',
  Venture_Capital_and_Private_Equity: 'Venture capital and private equity',
  Veterinary: 'Veterinary',
  Warehousing: 'Warehousing',
  Wholesale: 'Wholesale',
  Wine_and_Spirits: 'Wine and spirits',
  Wireless: 'Wireless',
  Writing_and_Editing: 'Writing and editing'
};

export const handleExcel = (
  file: Excel.Sheet | null,
  fileName?: string
): ReportHandlerReturn | null => {
  if (file?.Sheets) {
    const firstSheetName = file?.SheetNames?.[0];

    if (!firstSheetName) return null;

    const firstSheet = file?.Sheets[firstSheetName];

    // pass headers: 1 to access the headers
    // format returned is [[headers], [data], [data]] // similar to CSV
    const firstSheetJson = Excel.utils.sheet_to_json(firstSheet, {
      header: 1,
      raw: false,
      defval: '',
      blankrows: false
    }) as [Array<CsvReportUploadHeaders>, ...Array<string[]>];

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
        const row = data.map(cell => cell[Number(i)].trim());

        return {
          ...acc,
          [header]: row
        };
      }, {} as CsvReport);

    if (!csvData) return null;

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

export const handleCSV = (
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
    ? contentSplit
        ?.slice(
          1,
          // we can only process X many rows
          contentSplit.length > MAX_ROWS ? MAX_ROWS : contentSplit.length
        )
        .map(value => {
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
      const row = filteredValues.map(cell => cell[Number(i)].trim());

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
