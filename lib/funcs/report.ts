import { ApiHandler, HandlerReturn } from '../../types/http';
import { ReportDataProps } from '../../types/report';
import { makeErrorResponse } from '../utils/error-handling';
import {
  makeApiHandlerResponseFailure,
  makeApiHandlerResponseSuccess
} from '../utils/http-helpers';

/**
 * ***************************************************
 * GET EXISTING REPORT
 * ***************************************************
 */

export interface GetExistingReport extends HandlerReturn {
  report: ReportDataProps | null;
}

export interface GetExistingReportProps {
  reportId: string;
}

const getExistingReport: ApiHandler<
  GetExistingReport,
  GetExistingReportProps
> = async (token: string, { reportId }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/reports/${reportId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const report = await response.json();
      return {
        ...makeApiHandlerResponseSuccess({ status: response.status }),
        report
      };
    }

    return {
      ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
      report: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), report: null };
  }
};

/**
 * ***************************************************
 * GET CSV REPORT SHORT
 * ***************************************************
 */

export interface GetReportCsv extends HandlerReturn {
  csv: string | null;
}

export interface GetReportCsvProps {
  reportId: string;
}

const getReportShortCsv: ApiHandler<GetReportCsv, GetReportCsvProps> = async (
  token: string,
  { reportId }
) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/csv`,
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
    return {
      ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
      csv: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), csv: null };
  }
};

/**
 * ***************************************************
 * GET REPORT FULL
 * ***************************************************
 */

const getReportFullCsv = async (
  reportId: string,
  token: string
): Promise<{ ok: boolean; csv?: string; status: number }> => {
  try {
    const res = await fetch(
      `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/full`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.status === 200 && res.ok) {
      const csv = await res.text();

      return { ok: true, csv, status: res.status };
    }
    return { ok: false, status: res.status };
  } catch (error) {
    return { ok: false, status: 422 };
  }
};

/**
 * ***************************************************
 * CREATE REPORT
 * ***************************************************
 */

export interface CreateReport extends HandlerReturn {
  reportId: string | null;
}

export interface CreateReportProps {
  report: {
    iso_code: string;
    company_id: string;
    currency: string;
    /** @deprecated */
    accounts_type: number;
  };
}

const createReport: ApiHandler<CreateReport, CreateReportProps> = async (
  token: string,
  { report }
) => {
  try {
    const response = await fetch(`${process.env.WF_AP_ROUTE}/reports`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (response.ok) {
      const report = await response.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        reportId: report.id
      };
    }

    return {
      ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
      reportId: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), reportId: null };
  }
};

/**
 * ***************************************************
 * CREATE REPORT
 * ***************************************************
 */

export interface UploadReport extends HandlerReturn {
  report: ReportDataProps | null;
}

export interface UploadReportProps {
  report: {
    iso_code: string;
    company_id: string;
    currency: string;
    accounts_type: number;
  };
}

const uploadReport: ApiHandler<UploadReport, UploadReportProps> = async (
  token: string,
  { report }
) => {
  try {
    const response = await fetch(`${process.env.WF_AP_ROUTE}/reports/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (response.ok) {
      const reportData = await response.json();
      return {
        ...makeApiHandlerResponseSuccess({ status: response.status }),
        report: reportData
      };
    }

    return {
      ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
      report: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), report: null };
  }
};

const Report = {
  getExistingReport,
  createReport,
  uploadReport,
  getReportShortCsv,
  getReportFullCsv
};

export default Report;
