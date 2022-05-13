import { ApiHandler, HandlerReturn } from '../../types/http';
import { ReportDataProps } from '../../types/report';
import { errorsBySourceType, makeErrorResponse } from '../utils/error-handling';
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

    if (errorsBySourceType.REPORT[response.status]) {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        report: null
      };
    } else {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        report: null,
        message: 'REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      report: null,
      message: 'REPORT_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * GET CSV REPORT SHORT
 * ***************************************************
 */

export interface GetReportCsvShort extends HandlerReturn {
  csv: string | null;
}

export interface GetReportCsvShortProps {
  reportId: string;
}

const getReportShortCsv: ApiHandler<
  GetReportCsvShort,
  GetReportCsvShortProps
> = async (token: string, { reportId }) => {
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
    if (errorsBySourceType.REPORT[response.status]) {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        csv: null
      };
    } else {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        csv: null,
        message: 'REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      csv: null,
      message: 'REPORT_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * GET CSV REPORT FULL
 * ***************************************************
 */

export interface GetReportCsvFull extends HandlerReturn {
  csv: string | null;
}

export interface GetReportCsvFullProps {
  reportId: string;
}
const getReportFullCsv: ApiHandler<
  GetReportCsvFull,
  GetReportCsvFullProps
> = async (token: string, { reportId }) => {
  try {
    const response = await fetch(
      `${process.env.WF_AP_ROUTE}/reports/${reportId}/export/full`,
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

    if (errorsBySourceType.REPORT[response.status]) {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        csv: null
      };
    } else {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        csv: null,
        message: 'REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      csv: null,
      message: 'REPORT_PROCESSING_ISSUE'
    };
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
    // /** @deprecated */
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

    if (errorsBySourceType.REPORT[response.status]) {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        reportId: null
      };
    } else {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        reportId: null,
        message: 'REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      reportId: null,
      message: 'REPORT_PROCESSING_ISSUE'
    };
  }
};

/**
 * ***************************************************
 * UPLOAD REPORT
 * ***************************************************
 */

export interface UploadReport extends HandlerReturn {
  reportId: string | null;
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
      const report = await response.json();
      return {
        ...makeApiHandlerResponseSuccess({ status: response.status }),
        reportId: report.id
      };
    }

    if (errorsBySourceType.REPORT[response.status]) {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        reportId: null
      };
    } else {
      return {
        ...makeErrorResponse({ status: response.status, sourceType: 'REPORT' }),
        reportId: null,
        message: 'REPORT_PROCESSING_ISSUE'
      };
    }
  } catch (error) {
    return {
      ...makeApiHandlerResponseFailure(),
      reportId: null,
      message: 'REPORT_PROCESSING_ISSUE'
    };
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
