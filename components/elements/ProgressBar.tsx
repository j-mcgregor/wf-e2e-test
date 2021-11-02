import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { TranslateInput } from '../../types/global';
import Button from './Button';

interface ProgressBarProps {
  buttonText: TranslateInput | undefined;
}

const ProgressBar = ({ buttonText }: ProgressBarProps) => {
  const t = useTranslations();

  // all reports - will come from back end / mock data
  const totalReports = 127;

  // average time to generate report in ms
  const averageReportTime = 100;

  // state for total completed reports
  const [completedReports, setCompletedReports] = useState(0);

  // get % of completed reports rounded to an integer
  let percentComplete = Math.round((completedReports * 100) / totalReports);

  // run interval on page load - will need to be run via event handler
  useEffect(() => {
    let completed = 0;
    let timer = setInterval(() => {
      completed += 1;
      setCompletedReports(completed);
      completed >= totalReports && clearInterval(timer);
    }, averageReportTime);
  }, []);

  return (
    <div>
      <p className="font-semibold my-2">{t('progress')}</p>
      <div className="flex w-full justify-between text-sm">
        <div className="flex">
          <p className="pr-1 ">{t('estimated_time_to_completion')}:</p>
          <p>1 mins 36secs</p>
        </div>
        <p className="font-bold">
          {completedReports}/{totalReports}
        </p>
      </div>

      <div className="w-full h-3 my-4 rounded-full bg-primary">
        <div
          style={{ width: `${percentComplete}%` }}
          className={`h-full bg-highlight rounded-l-full ${
            percentComplete === 100 && 'rounded-r-full'
          }`}
        />
      </div>
      <div className="w-1/3 my-4 border border-gray-200 rounded">
        <Button variant="none" disabled>
          <p>{buttonText}</p>
        </Button>
      </div>
    </div>
  );
};

export default ProgressBar;
