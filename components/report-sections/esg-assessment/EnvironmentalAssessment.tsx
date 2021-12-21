/* eslint-disable sonarjs/cognitive-complexity */

import { useTranslations } from 'use-intl';
import { getCarbonImpact } from '../../../lib/utils/carbon-impact';

interface EnvironmentalAssessmentProps {
  industry_string: string | null;
}

const EnvironmentalAssessment = ({
  industry_string
}: EnvironmentalAssessmentProps) => {
  const t = useTranslations();

  const industryCategory = getCarbonImpact(`${industry_string}`);
  const percentage = industryCategory.percentage;

  const percentageColour =
    percentage === null
      ? 'bg-gray-300'
      : percentage <= 5
      ? 'bg-blue-500'
      : percentage > 5 && percentage <= 10
      ? 'bg-green-500'
      : percentage > 10 && percentage <= 25
      ? 'bg-yellow-400'
      : percentage > 25 && percentage <= 50
      ? 'bg-orange-500'
      : 'bg-red-500';

  return (
    <div className="bg-white rounded-sm shadow flex sm:flex-row flex-col px-8 py-8">
      <div className="py-14 w-full">
        <p className="text-xl">{t('environmental')}</p>
        <div className="py-6">
          <p>{t('industry_code')}</p>
          <p className="font-bold">{industryCategory.code}</p>
        </div>
        <div>
          <p>{t('industry_description')}</p>
          <p className="font-bold">{industry_string}</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-end pr-10">
        <div
          className={`${percentageColour} rounded-full h-32 w-32 flex items-center justify-center text-white font-bold text-2xl`}
        >
          <p>{!percentage ? 'N/A' : `${percentage}%`}</p>
        </div>
        <div className="w-8 h-full ml-10 flex flex-col">
          <div className="h-full w-full my-[1px] bg-red-500" />
          <div className="h-full w-full my-[1px] bg-orange-500" />
          <div className="h-full w-full my-[1px] bg-yellow-400" />
          <div className="h-full w-full my-[1px] bg-green-500" />
          <div className="h-full w-full my-[1px] bg-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalAssessment;
