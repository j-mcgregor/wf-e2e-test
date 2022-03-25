import { ValidationError } from '../../types/errors';
import { ApiHandler, HandlerReturn } from '../../types/http';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess,
  makeJsonError
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

const getAllBatchReports: ApiHandler<GetAllBatchReports> = async (
  token: string
) => {
  try {
    const res = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch?limit=8`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 200 && res.ok) {
      const batchReports: BatchJobsGetAllResponse = await res.json();

      return {
        ...makeApiHandlerResponseSuccess(),
        batchReports
      };
    }

    try {
      const error: ValidationError = await res?.json();

      const data = makeJsonError(res.status, error);

      return {
        ...makeApiHandlerResponseFailure({
          message: { isJSON: true, data },
          status: res.status
        }),
        batchReports: null
      };
    } catch (err: any) {
      return {
        ...makeApiHandlerResponseFailure({
          message: err.message,
          status: res.status
        }),
        batchReports: null
      };
    }
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
    const res = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 200 && res.ok) {
      const batchReport: BatchJobGetByIdResponse = await res.json();

      return {
        ...makeApiHandlerResponseSuccess(),
        batchReport
      };
    }

    try {
      const error: ValidationError = await res?.json();

      const data = makeJsonError(res.status, error);

      return {
        ...makeApiHandlerResponseFailure({
          message: { isJSON: true, data },
          status: res.status
        }),
        batchReport: null
      };
    } catch (err: any) {
      return {
        ...makeApiHandlerResponseFailure({
          message: err.message,
          status: res.status
        }),
        batchReport: null
      };
    }
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
  report: CreateBatchJobResponse | null;
}

interface CreateBatchReportProps {
  report: BatchAutoRequest;
}

const createBatchReport: ApiHandler<
  CreateBatchReport,
  CreateBatchReportProps
> = async (token: string, { report }) => {
  try {
    const res = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (res.ok) {
      const report: CreateBatchJobResponse = await res.json();

      return {
        ...makeApiHandlerResponseSuccess(),
        report: report
      };
    }

    try {
      const error: ValidationError = await res?.json();

      const data = makeJsonError(res.status, error);

      return {
        ...makeApiHandlerResponseFailure({
          message: { isJSON: true, data },
          status: res.status
        }),
        report: null
      };
    } catch (err: any) {
      return {
        ...makeApiHandlerResponseFailure({
          message: err.message,
          status: res.status
        }),
        report: null
      };
    }
  } catch (err: any) {
    return {
      ...makeApiHandlerResponseFailure({ message: err.message }),
      report: null
    };
  }
};

/**
 * ***************************************************
 * BATCH REPORT UPLOAD
 * ***************************************************
 */

export interface BatchJobReportUpload extends HandlerReturn {
  report: BatchJobUploadResponse | null;
}

const batchJobReportUpload: ApiHandler<BatchJobReportUpload> = async (
  token: string,
  report: BatchManualRequest
) => {
  try {
    const res = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (res.ok) {
      const report: BatchJobUploadResponse = await res.json();

      return {
        ...makeApiHandlerResponseSuccess(),
        report: report
      };
    }

    try {
      const error: ValidationError = await res?.json();

      const data = makeJsonError(res.status, error);

      return {
        ...makeApiHandlerResponseFailure({
          message: { isJSON: true, data },
          status: res.status
        }),
        report: null
      };
    } catch (err: any) {
      return {
        ...makeApiHandlerResponseFailure({
          message: err.message,
          status: res.status
        }),
        report: null
      };
    }
  } catch (err: any) {
    return {
      ...makeApiHandlerResponseFailure({ message: err.message }),
      report: null
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
