/* eslint-disable sonarjs/cognitive-complexity */

import { useTranslations } from 'use-intl';

interface EnvironmentalAssessmentProps {
  nace_code: string;
  nace_description: string;
}

const EnvironmentalAssessment = ({
  nace_code,
  nace_description
}: EnvironmentalAssessmentProps) => {
  const t = useTranslations();

  // extract first two numbers from code
  const codeNum = nace_code.substring(0, 2);

  // extract first letter from description
  const codeLetter = nace_description.substring(0, 1);
  // extract description as substring from 4th character onwards
  // eg: F - Food processing, manufacturing and retailing => Food processing, manufacturing and retailing
  const description = nace_description.substring(4);

  const percentage =
    codeLetter === 'A'
      ? 74
      : codeLetter === 'B'
      ? 105
      : codeLetter === 'C'
      ? 45
      : codeLetter === 'D'
      ? 310
      : codeLetter === 'E'
      ? 21
      : codeLetter === 'F'
      ? 11
      : codeLetter === 'G'
      ? 7
      : codeLetter === 'H'
      ? 107
      : codeLetter === 'L'
      ? 0
      : null;

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
          <p>{t('nace_code')}</p>
          <p className="font-bold">{codeLetter + codeNum}</p>
        </div>
        <div>
          <p>{t('nace_industrial_sector_description')}</p>
          <p className="font-bold">{description}</p>
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
