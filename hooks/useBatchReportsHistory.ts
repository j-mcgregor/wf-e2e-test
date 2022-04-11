import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/utils/fetcher';
import { BatchReportsIndexApi } from '../pages/api/batch-reports';
import {
  BatchJobsGetAllResponse,
  BatchReportResponse
} from '../types/batch-reports';

const useBatchReportHistory = (
  limit: number,
  skip: number = 0,
  pendingJobs: BatchReportResponse[]
) => {
  const [batchReports, setReports] = useState<BatchJobsGetAllResponse>([]);

  // if no user then revalidate onMount to prevent blank page
  const { data, isValidating } = useSWR<BatchReportsIndexApi>(
    `/api/batch-reports?limit=${limit}&skip=${skip}`,
    fetcher,
    {
      revalidateOnFocus: false,
      ...(pendingJobs?.length > 0 ? { refreshInterval: 1000 } : {})
    }
  );

  const isLoading = isValidating || !data;
  React.useEffect(() => {
    if (data?.batchReports && !isValidating) {
      const newReports = data?.batchReports;
      const oldReports = batchReports;
      if (skip === 0) {
        setReports(newReports);
      } else {
        // handle multiple requests for the same batchReports
        const oldReportIds = [...oldReports.map(report => report.id)];
        const noDuplicateNewReports = newReports.filter(
          report => oldReportIds.indexOf(report.id) === -1
        );
        const uniqueReports = [...oldReports, ...noDuplicateNewReports];
        setReports(uniqueReports);
      }
    }
  }, [isValidating]);

  const hasFetchedReports = data || !isValidating;

  return {
    batchReports:
      batchReports.length > 0
        ? batchReports
        : hasFetchedReports
        ? batchReports
        : null,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useBatchReportHistory;
