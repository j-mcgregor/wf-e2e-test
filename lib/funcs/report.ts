import { ApiHandler, HandlerReturn } from '../../types/http';
import { ReportDataProps } from '../../types/report';
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
    const res = await fetch(`${process.env.WF_AP_ROUTE}/reports/${reportId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 200 && res.ok) {
      const report = await res.json();

      return {
        ...makeApiHandlerResponseSuccess({ status: res.status }),
        report
      };
    }
    return {
      ...makeApiHandlerResponseFailure({
        status: res.status
      }),
      report: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), report: null };
  }
};

/**
 * ***************************************************
 * GET REPORT CSV
 * ***************************************************
 */

export interface GetReportCsv extends HandlerReturn {
  csv: string | null;
}

export interface GetReportCsvProps {
  reportId: string;
}

const getReportCsv: ApiHandler<GetReportCsv, GetReportCsvProps> = async (
  token: string,
  { reportId }
) => {
  try {
    const res = await fetch(
      `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/csv`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.status === 200 && res.ok) {
      const csv = await res.text();

      return {
        ...makeApiHandlerResponseSuccess(),
        csv
      };
    }
    return {
      ...makeApiHandlerResponseFailure({
        status: res.status
      }),
      csv: null
    };
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), csv: null };
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
    accounts_type: number;
  };
}

const createReport: ApiHandler<CreateReport, CreateReportProps> = async (
  token: string,
  { report }
) => {
  try {
    const res = await fetch(`${process.env.WF_AP_ROUTE}/reports`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (res.ok) {
      const reportId = await res.json();
      return {
        ...makeApiHandlerResponseSuccess(),
        reportId
      };
    }

    try {
      const error = await res?.json();

      return {
        ...makeApiHandlerResponseFailure({
          details: error?.detail,
          status: res.status
        }),
        reportId: null
      };
    } catch (error: any) {
      return {
        ...makeApiHandlerResponseFailure({
          message: error.message,
          status: res.status
        }),
        reportId: null
      };
    }
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
    const res = await fetch(`${process.env.WF_AP_ROUTE}/reports/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    });

    if (res.ok) {
      const report = await res.json();

      return {
        ...makeApiHandlerResponseSuccess({ status: res.status }),
        report
      };
    }

    try {
      const error = await res?.json();

      return {
        ...makeApiHandlerResponseFailure({
          details: error?.detail,
          status: res.status
        }),
        report: null
      };
    } catch (error: any) {
      return {
        ...makeApiHandlerResponseFailure({
          message: error.message,
          status: res.status
        }),
        report: null
      };
    }
  } catch (error) {
    return { ...makeApiHandlerResponseFailure(), report: null };
  }
};

const Report = {
  getExistingReport,
  createReport,
  uploadReport,
  getReportCsv
};

export default Report;
