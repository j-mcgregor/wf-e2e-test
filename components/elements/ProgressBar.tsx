import { useTranslations } from 'use-intl';

interface ProgressBarProps {
  totalReports: number;
  completedReports: number;
  remainingTime: number;
}

const ProgressBar = ({
  totalReports,
  completedReports,
  remainingTime
}: ProgressBarProps) => {
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

  // get % of completed for rendering length of progress bar
  let percentComplete = Math.round((completedReports * 100) / totalReports);

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
          className={`h-full bg-highlight rounded-l-full transition-all duration-200 ease-linear ${
            percentComplete === 100 && 'rounded-r-full'
          }`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
