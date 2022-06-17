import { useEffect, useState } from 'react';
import useSWR from 'swr';

import fetcher from '../lib/utils/fetcher';
import { BatchReportResponse } from '../types/batch-reports';

function calculateHoursBetweenDates(begin: Date | string, end: number) {
  const date1 = new Date(begin);
  const date2 = new Date(end);
  const diff = (date2.getTime() - date1.getTime()) / 1000;
  return diff / 3600;
}

const filterPendingReports = (reports: BatchReportResponse[]) => {
  return reports.filter(
    job =>
      !job.finished_at &&
      job.failed_reports === null &&
      calculateHoursBetweenDates(job.created_at, Date.now()) < 24
  );
};

const removeDuplicateReports = (reports: BatchReportResponse[]) => {
  let reportIds = [...new Set([...reports.map(report => report.id)])];
  return reports.filter(report => {
    if (reportIds.indexOf(report.id) > -1) {
      reportIds = reportIds.filter(id => id !== report.id);
      return true;
    }
  });
};

const orderReports = (reports: BatchReportResponse[]) => {
  return reports.sort((a, b) => {
    const aDate = new Date(a.created_at);
    const bDate = new Date(b.created_at);
    if (a.created_at < b.created_at) {
      return 1;
    } else {
      return -1;
    }
  });
};

const removePendingDuplicateReports = (reports: BatchReportResponse[]) => {
  // get all unique ids
  // filter by unique ids
  let reportIds = [...new Set([...reports.map(report => report.id)])];
  return reports.filter(report => {
    if (reportIds.indexOf(report.id) > -1 && report.finished_at) {
      reportIds = reportIds.filter(id => id !== report.id);
      return true;
    }
  });
};

const useBatchReportsHistory = (limit: number, skip: number = 0) => {
  const [batchReports, setBatchReports] = useState<{
    pendingJobs: BatchReportResponse[];
    failedJobs: BatchReportResponse[];
    completedJobs: BatchReportResponse[];
  }>({
    pendingJobs: [],
    failedJobs: [],
    completedJobs: []
  });

  // if no user then revalidate onMount to prevent blank page
  const { data, isValidating } = useSWR(
    `/api/batch-reports?limit=${limit + skip}&skip=${0}`,
    fetcher,
    {
      revalidateOnFocus: false,
      ...(batchReports.pendingJobs?.length > 0 ? { refreshInterval: 1000 } : {})
    }
  );

  const isFetching = isValidating || !data?.data;

  const fetchedBatchReports = data?.data || [];

  const totalLength =
    batchReports.completedJobs.length +
    batchReports.failedJobs.length +
    batchReports.pendingJobs.length;

  useEffect(() => {
    if (data?.data && !isValidating) {
      const failingJobs = fetchedBatchReports.filter(
        (job: BatchReportResponse) =>
          ((job.created_at !== job.updated_at || job.finished_at) &&
            job.total_reports === job.failed_reports) ||
          calculateHoursBetweenDates(job.created_at, Date.now()) > 24
      );
      const completeJobs = fetchedBatchReports.filter(
        (job: BatchReportResponse) =>
          job.total_reports !== job.failed_reports &&
          job.total_reports !== null &&
          job.finished_at
      );
      const pendJobs = filterPendingReports(fetchedBatchReports);

      setBatchReports({
        pendingJobs: orderReports(
          removeDuplicateReports([
            ...pendJobs
            // re filter in case they are already done
            // ...batchReports.pendingJobs
          ])
        ),
        failedJobs: orderReports(
          removeDuplicateReports([
            ...failingJobs
            // ...batchReports.failedJobs
          ])
        ),
        completedJobs: orderReports(
          removeDuplicateReports([
            ...completeJobs
            // ...batchReports.completedJobs
          ])
        )
      });
    }
  }, [isFetching]);

  return {
    ...batchReports,
    fetching: isFetching,
    error: data?.error,
    totalLength,
    message: data?.message
  };
};

export default useBatchReportsHistory;
