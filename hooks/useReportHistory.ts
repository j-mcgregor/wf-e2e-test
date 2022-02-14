import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/utils/fetcher';
import { ReportSnippetType } from '../types/global';

const useReportHistory = (limit: number, skip: number = 0) => {
  const [reports, setReports] = useState<ReportSnippetType[]>([]);

  // if no user then revalidate onMount to prevent blank page
  const { data, isValidating } = useSWR<
    { data: ReportSnippetType[] } & { error?: boolean; message?: string }
  >(`/api/user/reports?limit=${limit}&skip=${skip}`, fetcher, {
    revalidateOnFocus: false
  });

  const isLoading = isValidating || !data;
  React.useEffect(() => {
    if (data?.data && !isValidating) {
      const newReports = data?.data;
      const oldReports = reports;
      if (skip === 0) {
        setReports(newReports);
      } else {
        // handle multiple requests for the same reports
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
    reports: reports.length > 0 ? reports : hasFetchedReports ? reports : null,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useReportHistory;
