import type {
  BatchJobGetByIdResponse,
  BatchJobsGetAllResponse,
  BatchManualRequest,
  BatchJobUploadResponse,
  BatchAutoRequest,
  CreateBatchJobResponse
} from '../../types/batch-reports';
import { ValidationError } from '../../types/errors';
import { HttpStatusCodes } from '../../types/http-status-codes';
import { GENERIC_API_ERROR } from '../utils/error-codes';

/**
 * ***************************************************
 * @description
 * Used for every API handler call that uses fetch().
 * T should always extend the HandlerReturn
 * @returns a Promise<T> where T is the expected response
 * @example const getAllBatchReports: ApiHandler<GetAllBatchReports> = () => {}
 * @param token string
 * @param ...args any[]
 * ***************************************************
 */

type ApiHandler<T> = (token: string, ...args: any[]) => Promise<T>;

/**
 * ***************************************************
 * @name HandlerReturn
 * @description the core interface for every handler in the project.
 * Every handler's own interface should extend this one.
 * Could also be used in other places
 * ***************************************************
 */

interface HandlerReturn {
  ok: boolean; // <-- Response.ok is passed to this
  status: number;
  error?: boolean; // <-- not sure if we need error AND ok
  message: string | object; // <-- message could be an object, eg a 422 returns ValidationError
  // suggestion
  source?: 'internal' | 'external';
}

/**
 * ***************************************************
 * GET ALL BATCH REPORTS
 * ***************************************************
 */

interface GetAllBatchReports extends HandlerReturn {
  batchReports: BatchJobsGetAllResponse | null; // <- null indicates a failure since typing makes this value required
}

// implementation
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
        ok: res.ok,
        batchReports: batchReports,
        status: res.status,
        message: HttpStatusCodes.OK.key // <- 'OK' - more human-readable format
      };
    }

    // invalid request body
    if (res.status === 422) {
      const error: ValidationError = await res.json();

      return {
        ok: false,
        error: true,
        message: JSON.stringify(error), // <- ValidationError is passed to NextAPI handleras JSON
        status: 500,
        batchReports: null
      };
    }

    throw new Error('Fetch all batch reports failed');
  } catch (error) {
    return {
      ok: false,
      error: true,
      message: GENERIC_API_ERROR,
      status: 500,
      batchReports: null
    };
  }
};

/**
 * ***************************************************
 * GET BATCH REPORT BY ID
 * ***************************************************
 */
interface GetBatchReportById extends HandlerReturn {
  batchReport?: BatchJobGetByIdResponse;
}

const getBatchReportsById = async (
  id: string,
  token: string
): Promise<GetBatchReportById> => {
  const res = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 200 && res.ok) {
    const batchReport: BatchJobGetByIdResponse = await res.json();
    return { ok: true, batchReport, status: res.status };
  }
  return { ok: false, status: res.status };
};

/**
 * ***************************************************
 * CREATE BATCH REPORT
 * ***************************************************
 */

const createBatchReport = async (
  report: BatchAutoRequest,
  token: string
): Promise<{
  ok: boolean;
  status: number;
  report?: CreateBatchJobResponse;
  details?: string | {};
}> => {
  try {
    const res = await fetch(`${process.env.WF_AP_ROUTE}/jobs/batch`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    res.formData;
    if (res.ok) {
      const report: CreateBatchJobResponse = await res.json();
      return { ok: true, report, status: res.status };
    }
    const error = await res?.json();
    return { ok: false, status: res.status, details: error?.detail };
  } catch (e: any) {
    return { ok: false, status: 500, details: e.message };
  }
};

/**
 * ***************************************************
 * BATCH REPORT UPLOAD
 * ***************************************************
 */

const batchJobReportUpload = async (
  report: BatchManualRequest,
  token: string
): Promise<{
  ok: boolean;
  status: number;
  report?: BatchJobUploadResponse;
  details?: string | {};
}> => {
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
    return { ok: true, report, status: res.status };
  }

  try {
    const error = await res?.json();
    return { ok: false, status: res.status, details: error?.detail };
  } catch (e: any) {
    return { ok: false, status: res.status, details: e.message };
  }
};

const BatchReport = {
  getAllBatchReports,
  getBatchReportsById,
  createBatchReport,
  batchJobReportUpload
};

export default BatchReport;
