import { ApiHandler, HandlerReturn } from '../../types/http';
import { errorsBySourceType, makeErrorResponse } from '../utils/error-handling';
import { fetchWrapper } from '../utils/fetchWrapper';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess
} from '../utils/http-helpers';

/**
 * ***************************************************
 * GET CSV REPORT
 * * used directly in the client since AWS has a 5mb limit
 * * on downloads, so we need to call the API directly to
 * * bypass lamda limits
 * ***************************************************
 */

export interface GetBatchReportCsvFull extends HandlerReturn {
  csv: string | null;
}

export interface GetBatchReportCsvFullProps {
  batchReportId: string;
}

export const getBatchReportsCsv: ApiHandler<
  GetBatchReportCsvFull,
  GetBatchReportCsvFullProps
> = async (token: string, { batchReportId }) => {
  try {
    const response = await fetchWrapper(
      `${process.env.NEXT_PUBLIC_WF_AP_ROUTE}/jobs/batch/${batchReportId}/export/full`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const csv = await response.text();
      return {
        ...makeApiHandlerResponseSuccess(),
        csv
      };
    }
    if (errorsBySourceType.BATCH_REPORT[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        csv: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        csv: null,
        message: 'BATCH_REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      csv: null,
      message: 'BATCH_REPORT_PROCESSING_ISSUE'
    };
  }
};

const BatchReport = {
  getBatchReportsCsv
};

export default BatchReport;
