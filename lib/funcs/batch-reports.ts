import { ApiHandler, HandlerReturn } from '../../types/http';
import { errorsBySourceType, makeErrorResponse } from '../utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess
} from '../utils/http-helpers';

import type {
  BatchJobGetByIdResponse,
  BatchJobsGetAllResponse,
  BatchManualRequest,
  BatchJobUploadResponse,
  BatchAutoRequest,
  CreateBatchJobResponse
} from '../../types/batch-reports';
import { fetchWrapper } from '../utils/fetchWrapper';
import config from '../../config';
/**
 * ***************************************************
 * GET ALL BATCH REPORTS
 * ***************************************************
 */

export interface GetAllBatchReports extends HandlerReturn {
  batchReports: BatchJobsGetAllResponse | null; // <- null indicates a failure since typing makes this value required
}

interface GetAllBatchReportsProps {
  limit?: number;
  skip?: number;
}

const getAllBatchReports: ApiHandler<
  GetAllBatchReports,
  GetAllBatchReportsProps
> = async (token: string, { limit = 10, skip = 0 }) => {
  const limitAndSkipString = limit ? `?limit=${limit}&skip=${skip}` : '';

  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/jobs/batch${limitAndSkipString}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const batchReports: BatchJobsGetAllResponse = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        batchReports
      };
    }

    if (errorsBySourceType.BATCH_REPORT[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReports: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReports: null,
        message: 'BATCH_REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      batchReports: null,
      message: 'BATCH_REPORT_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * GET BATCH REPORT BY ID
 * ***************************************************
 */
export interface GetBatchReportById extends HandlerReturn {
  batchReport: BatchJobGetByIdResponse | null;
}

interface GetBatchReportByIdProps {
  id: string;
  skip: number;
  limit: number;
}

const getBatchReportsById: ApiHandler<
  GetBatchReportById,
  GetBatchReportByIdProps
> = async (token, { id, skip, limit }) => {
  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/jobs/batch/${id}?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const batchReport: BatchJobGetByIdResponse = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        batchReport
      };
    }

    if (errorsBySourceType.BATCH_REPORT[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReport: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReport: null,
        message: 'BATCH_REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      batchReport: null,
      message: 'BATCH_REPORT_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * CREATE BATCH REPORT
 * ***************************************************
 */

export interface CreateBatchReport extends HandlerReturn {
  batchReportId: string | null;
}

interface CreateBatchReportProps {
  report: BatchAutoRequest;
}

const createBatchReport: ApiHandler<
  CreateBatchReport,
  CreateBatchReportProps
> = async (token: string, { report }) => {
  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/jobs/batch`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      }
    );
    if (response.ok) {
      const reportData: CreateBatchJobResponse = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        batchReportId: reportData.id
      };
    }

    if (errorsBySourceType.BATCH_REPORT[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReportId: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReportId: null,
        message: 'BATCH_REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      batchReportId: null,
      message: 'BATCH_REPORT_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * BATCH REPORT UPLOAD
 * ***************************************************
 */

export interface BatchJobReportUpload extends HandlerReturn {
  batchReportId: string | null;
}

export interface BatchJobReportUploadProps {
  report: BatchManualRequest;
}

const batchJobReportUpload: ApiHandler<
  BatchJobReportUpload,
  BatchJobReportUploadProps
> = async (token: string, { report }) => {
  try {
    const response = await fetchWrapper(
      `${process.env.WF_AP_ROUTE}/jobs/batch/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      }
    );

    if (response.ok) {
      const reportData: BatchJobUploadResponse = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        batchReportId: reportData.id
      };
    }

    if (errorsBySourceType.BATCH_REPORT[response.status]) {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReportId: null
      };
    } else {
      return {
        ...makeErrorResponse({
          status: response.status,
          sourceType: 'BATCH_REPORT'
        }),
        batchReportId: null,
        message: 'BATCH_REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      batchReportId: null,
      message: 'BATCH_REPORT_PROCESSING_ISSUE'
    };
  }
};

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
      `${config.API_URL}/jobs/batch/${batchReportId}/export/full`,
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
  getAllBatchReports,
  getBatchReportsById,
  createBatchReport,
  batchJobReportUpload,
  getBatchReportsCsv
};

export default BatchReport;
