import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/utils/fetcher';

// small hook to handle the total reports issues we have currently
// i.e. it takes forever to return when you have a lot of reports

const useTotalReports = (fetch: boolean = true) => {
  // if no user then revalidate onMount to prevent blank page

  const [total, setTotal] = useState<number | string>(0);

  const { data } = useSWR(
    fetch && '/api/user/reports?total=true&limit=false&skip=false',
    fetcher,
    {
      // revalidateOnMount: false,
      revalidateOnFocus: false
    }
  );

  React.useEffect(() => {
    if (data?.total) {
      if (data.total === 0) {
        setTotal('0');
      }
      setTotal(data.total);
    }
  }, [data]);

  const isLoading = !data;

  return {
    total: total ? total : null,
    loading: isLoading,
    error: data?.error,
    message: data?.message
  };
};

export default useTotalReports;
