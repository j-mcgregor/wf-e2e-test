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

    // console.log(report)
    return { ok: true, report, status: res.status };
  }
  return { ok: false, status: res.status };
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

const Report = {
  getExistingReport,
  createReport
};

export default Report;
