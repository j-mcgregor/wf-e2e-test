import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/utils/fetcher';
import { BatchReportsIndexApi } from '../pages/api/batch-reports';
import { BatchReportResponse } from '../types/batch-reports';

function calculateHoursBetweenDates(begin: Date, end: number) {
  const date1 = new Date(begin);
  const date2 = new Date(end);
  const diff = (date2.getTime() - date1.getTime()) / 1000;
  return diff / 3600;
}

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
  const { data, isValidating } = useSWR<BatchReportsIndexApi>(
    `/api/batch-reports?limit=${limit}&skip=${skip}`,
    fetcher,
    {
      revalidateOnFocus: false,
      ...(batchReports.pendingJobs?.length > 0 ? { refreshInterval: 1000 } : {})
    }
  );

  const isFetching = isValidating || !data;

  const fetchedBatchReports = data?.batchReports || [];

  const totalLength =
    batchReports.completedJobs.length +
    batchReports.failedJobs.length +
    batchReports.pendingJobs.length;

  useEffect(() => {
    if (data?.batchReports && !isValidating) {
      // const newReports = data?.batchReports;
      // const oldReports = batchReports;
      const failingJobs = fetchedBatchReports.filter(
        job =>
          ((job.created_at !== job.updated_at || job.finished_at) &&
            job.total_reports === job.failed_reports) ||
          calculateHoursBetweenDates(job.created_at, Date.now()) > 24
      );
      const completeJobs = fetchedBatchReports.filter(
        job =>
          job.total_reports !== job.failed_reports &&
          job.total_reports !== null &&
          job.finished_at
      );
      const pendJobs = fetchedBatchReports.filter(
        job =>
          !job.finished_at &&
          job.failed_reports === null &&
          calculateHoursBetweenDates(job.created_at, Date.now()) < 24
      );
      setBatchReports({
        pendingJobs: pendJobs,
        failedJobs: [...new Set([...failingJobs, ...batchReports.failedJobs])],
        completedJobs: [
          ...new Set([...completeJobs, ...batchReports.completedJobs])
        ]
      });

      // if (skip === 0) {
      //   setReports(newReports);
      // } else {
      //   // handle multiple requests for the same batchReports
      //   const oldReportIds = [...oldReports.map(report => report.id)];
      //   const noDuplicateNewReports = newReports.filter(
      //     report => oldReportIds.indexOf(report.id) === -1
      //   );
      //   const uniqueReports = [...oldReports, ...noDuplicateNewReports];
      //   setReports(uniqueReports);
      // }
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
