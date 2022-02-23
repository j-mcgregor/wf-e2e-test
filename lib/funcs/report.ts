import { ReportDataProps } from '../../pages/report/[id]';

const getExistingReport = async (
  reportId: string,
  token: string
): Promise<{ ok: boolean; report?: ReportDataProps; status: number }> => {
  const res = await fetch(`${process.env.WF_AP_ROUTE}/reports/${reportId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 200 && res.ok) {
    const report = await res.json();

    return { ok: true, report, status: res.status };
  }
  return { ok: false, status: res.status };
};

const getReportCsv = async (
  reportId: string,
  token: string
): Promise<{ ok: boolean; csv?: string; status: number }> => {
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

      return { ok: true, csv, status: res.status };
    }
    return { ok: false, status: res.status };
  } catch (error) {
    return { ok: false, status: 422 };
  }
};

const createReport = async (
  report: {
    iso_code: string;
    company_id: string;
    currency: string;
    accounts_type: number;
  },
  token: string
): Promise<{
  ok: boolean;
  status: number;
  report?: ReportDataProps;
  details?: string | {};
}> => {
  const res = await fetch(`${process.env.WF_AP_ROUTE}/reports`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(report)
  });
  if (res.ok) {
    const report = await res.json();
    return { ok: true, report, status: res.status };
  }

  try {
    const error = await res?.json();
    return { ok: false, status: res.status, details: error?.detail };
  } catch (e: any) {
    return { ok: false, status: res.status, details: e.message };
  }
};

const uploadReport = async (
  report: {
    iso_code: string;
    company_id: string;
    currency: string;
    accounts_type: number;
  },
  token: string
): Promise<{
  ok: boolean;
  status: number;
  report?: ReportDataProps;
  details?: string | {};
}> => {
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
    return { ok: true, report, status: res.status };
  } else {
    const error = await res.json();

    return { ok: false, status: res.status, details: error.detail };
  }
};

const Report = {
  getExistingReport,
  createReport,
  uploadReport,
  getReportCsv
};

export default Report;
