const getExistingReport = async (reportId: string, token: string) => {
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

const Report = {
  getExistingReport
};

export default Report;
