import { Report } from '../../types/global';
import { useTranslations } from 'use-intl';

import ReportTable from './ReportTable';
import Button from './Button';

interface RecentReportProps {
  reports?: Report[] | null;
}

const RecentReports = ({ reports }: RecentReportProps) => {
  const t = useTranslations();
  return (
    <div className="bg-white p-8 my-8 flex flex-col">
      <p className="text-2xl font-semibold">{t('recent reports')}</p>
      <ReportTable
        reports={reports}
        limit={reports ? reports.length : 0}
        shadow={false}
        borders={false}
      />

      <Button
        variant="none"
        className="border-alt border max-w-[120px] my-2 mx-auto"
      >
        <p>Load More</p>
      </Button>
    </div>
  );
};

export default RecentReports;
