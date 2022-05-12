/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable security/detect-object-injection */
import { makeUploadReportReqBody } from './report-helpers';
import countryCodes from '../../lib/data/countryCodes.json';

import type {
  BatchManualRequest,
  BatchAutoRequest,
  Entity
} from '../../types/batch-reports';
import type { ReportTypeEnum } from '../../types/global';
import type {
  CsvReport,
  CsvReportUploadHeaders,
  ReportUploadRequestBody
} from '../../types/report';
import { getCurrencyByIsoCode } from '../settings/settings.settings';

type BatchRequest = BatchAutoRequest | BatchManualRequest;

export const makeEntitiesForManualBatch = (
  csvData: CsvReport,
  csvValues: string[][]
): ReportUploadRequestBody[] => {
  // map unique company names as properties and set the index occurences as its values
  // eg { 'Company 1': [1,3,6,9] <- index used later }
  const companyNameAndIndexes: Record<string, number[]> = {};

  csvData.details_name.forEach((name, i) => {
    let arr = [];
    for (let j = 0; j < csvData.details_name.length; j++) {
      if (name === csvData.details_name[j]) {
        arr.push(j);
      }
    }
    companyNameAndIndexes[name] = arr;
  });

  const companyNameAndDataMap: Record<
    string,
    {
      [key in CsvReportUploadHeaders]: string[];
    }
  > = {};

  // for each company, iterate over the indexArr and use that index to get the correct data
  Object.entries(companyNameAndIndexes).forEach(
    ([companyName, indexArr], i) => {
      // iterate through the csvData's properties (details_name, currency etc)
      Object.entries(csvData).forEach(([header, values]) => {
        // and use the index to get the right value
        // indexArr => [1,4,6,8]
        const companyValues = indexArr.map(index => values[index]);

        companyNameAndDataMap[companyName] = {
          ...companyNameAndDataMap[companyName],
          [header]: companyValues
        };
      });
    }
  );

  // the final step is to use the  filtered csvValues with the makeUploadReportReqBody used for report upload
  // this creates the entity field required by the API
  const entities = Object.entries(companyNameAndDataMap).map(
    ([key, company]) => {
      const filteredCsv = csvValues.filter(c => c.includes(key));
      return makeUploadReportReqBody(company, filteredCsv);
    }
  );

  return entities;
};

interface ConvertCsvProps {
  csvData: CsvReport;
  csvValues: string[][];
  name: string;
  uploadType: ReportTypeEnum;
  accounts_type?: number;
  currency?: string;
}
export const convertCSVToRequestBody = ({
  csvData,
  csvValues,
  name,
  uploadType,
  accounts_type = 1,
  currency = 'GBP'
}: ConvertCsvProps): BatchRequest => {
  // BASIC INFO
  let response = {
    name: name,
    accounts_type,
    // currency,
    entities: []
  } as BatchRequest;

  if (uploadType === 'BATCH_AUTO') {
    const entities = csvData?.company_id?.map(
      (id, i) =>
        ({
          company_id: id?.trim(),
          iso_code: csvData.iso_code[Number(i)]?.trim(),
          currency: getCurrencyByIsoCode(
            csvData.iso_code[Number(i)]?.trim(),
            'GBP'
          )
        } as Entity)
    );

    response.entities = entities || [];
  }

  if (uploadType === 'BATCH_MANUAL') {
    const entities = makeEntitiesForManualBatch(csvData, csvValues);

    response.entities = entities || [];
  }

  return response;
};
