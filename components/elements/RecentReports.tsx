import { useState } from 'react';
import { Report } from '../../types/global';
import { useTranslations } from 'use-intl';

import ReportTable from './ReportTable';
import Button from './Button';

interface RecentReportProps {
  reports?: Report[] | null;
}

const RecentReports = ({ reports }: RecentReportProps) => {
  const [reportLimit, setReportLimit] = useState(10);
  const t = useTranslations();

  // load 5 more reports until max 30
  const handleAddReports = (): void => {
    reportLimit < 30 ? setReportLimit(reportLimit + 5) : null;
  };

  return (
    <div className="bg-white my-6 py-6  flex flex-col">
      <p className="text-2xl p-4 font-semibold">{t('recent reports')}</p>

      <ReportTable
        reports={reports}
        limit={reportLimit}
        shadow={true}
        borders={true}
        fillerRows={false}
      />

      <Button
        variant="none"
        className="border-alt border max-w-[120px] my-2 mx-auto"
        onClick={handleAddReports}
      >
        <p>Load More</p>
      </Button>
    </div>
  );
};

export default RecentReports;
