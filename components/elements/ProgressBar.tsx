import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { TranslateInput } from '../../types/global';
import Button from './Button';

interface ProgressBarProps {
  buttonText: TranslateInput | undefined;
}

const ProgressBar = ({ buttonText }: ProgressBarProps) => {
  const t = useTranslations();

  const getTimeRemaining = (ms: number): string => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.round((ms % 60000) / 1000);
    if (ms < 60000) {
      return `${secs} seconds`;
    } else {
      return `${mins} minutes ${secs} seconds`;
    }
  };
  // all reports - will come from back end / mock data
  const totalReports = 534;
  // average time to generate report in ms
  const averageReportTime = 150;
  const totalTime = Math.round(totalReports * averageReportTime);

  // state for total completed reports
  const [completedReports, setCompletedReports] = useState(0);
  const [remainingTime, setRemainingTime] = useState(totalTime);

  // get % of completed for rendering length of progress bar
  let percentComplete = Math.round((completedReports * 100) / totalReports);

  const runReports = (): void => {
    let completedReports = 0;
    let time = remainingTime;
    let interval = setInterval(() => {
      completedReports += 1;
      time -= averageReportTime;
      setCompletedReports(completedReports);
      setRemainingTime(time);
      completedReports >= totalReports && clearInterval(interval);
    }, averageReportTime);
  };

  return (
    <div>
      <p className="font-semibold my-2">{t('progress')}</p>
      <div className="flex w-full justify-between text-sm">
        <div className="flex">
          <p className="pr-1 ">{t('estimated_time_to_completion')}:</p>
          <p>{getTimeRemaining(remainingTime)}</p>
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
      <div className="w-1/3 my-4 border border-gray-200 rounded">
        <Button variant="none" onClick={runReports}>
          <p>Run Reports</p>
        </Button>
      </div>
    </div>
  );
};

export default ProgressBar;
