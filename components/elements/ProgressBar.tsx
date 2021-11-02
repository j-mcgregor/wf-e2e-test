import { useTranslations } from 'use-intl';
import { TranslateInput } from '../../types/global';
import Button from './Button';

interface ProgressBarProps {
  buttonText: TranslateInput | undefined;
}

const ProgressBar = ({ buttonText }: ProgressBarProps) => {
  const t = useTranslations();

  // average time of report (variable) 10secs to start
  //  % to completion

  return (
    <div>
      <p className="font-semibold my-2">{t('progress')}</p>
      <div className="flex w-full justify-between text-sm">
        <div className="flex">
          <p className="pr-1 ">{t('estimated_time_to_completion')}:</p>
          <p>1 mins 36secs</p>
        </div>
        <p className="font-bold">413/654</p>
      </div>

      <div className="w-full h-3 my-4 rounded-full bg-primary">
        <div className="h-full w-[80%] bg-highlight rounded-l-full" />
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
