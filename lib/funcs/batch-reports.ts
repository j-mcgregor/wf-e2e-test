import type {
  BatchJobGetByIdResponse,
  BatchJobsGetAllResponse,
  BatchManualRequest,
  BatchJobUploadResponse,
  BatchAutoRequest,
  CreateBatchJobResponse
} from '../../types/batch-reports';
import { GENERIC_API_ERROR } from '../utils/error-codes';

const getAllBatchReports = async (
  token: string
): Promise<{
  ok: boolean;
  batchReports?: BatchJobsGetAllResponse;
  status: number;
  error?: boolean;
  message?: string;
}> => {
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
        ok: true,
        batchReports: batchReports,
        status: res.status
      };
    }
  } catch (error) {
    return { ok: false, error: true, message: GENERIC_API_ERROR, status: 500 };
  }
  return { ok: false, status: 500 };
};

const getBatchReportsById = async (
  id: string,
  token: string
): Promise<{
  ok: boolean;
  batchReport?: BatchJobGetByIdResponse;
  status: number;
}> => {
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
