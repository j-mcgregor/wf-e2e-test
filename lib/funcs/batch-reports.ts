import { ApiHandler, HandlerReturn } from '../../types/http';
import { makeErrorResponse } from '../utils/error-handling';
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
    const response = await fetch(
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

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'BATCH_REPORT'
      }),
      batchReports: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), batchReports: null };
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
}

const getBatchReportsById: ApiHandler<
  GetBatchReportById,
  GetBatchReportByIdProps
> = async (token, { id }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/jobs/batch/${id}`,
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

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'BATCH_REPORT'
      }),
      batchReport: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), batchReport: null };
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
    const response = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (response.ok) {
      const reportData: CreateBatchJobResponse = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        batchReportId: reportData.id
      };
    }

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'BATCH_REPORT'
      }),
      batchReportId: null
    };
  } catch (err: any) {
    return {
      ...makeApiHandlerResponseFailure({ message: err.message }),
      batchReportId: null
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
    const response = await fetch(
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

    return {
      ...makeErrorResponse({
        status: response.status,
        sourceType: 'BATCH_REPORT'
      }),
      batchReportId: null
    };
  } catch (err: any) {
    return {
      ...makeApiHandlerResponseFailure({ message: err.message }),
      batchReportId: null
    };
  }
};

const BatchReport = {
  getAllBatchReports,
  getBatchReportsById,
  createBatchReport,
  batchJobReportUpload
};

export default BatchReport;
