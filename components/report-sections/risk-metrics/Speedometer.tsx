import { useTranslations } from 'use-intl';
import Dial from '../../svgs/Dial';
import InfoPopover from './InfoPopover';
import SpeedoArrow from '../../svgs/SpeedoArrow';
import BenchmarkArrow from '../../svgs/BenchmarkArrow';

type secondaryValue = {
  title: string;
  score: number | string | null;
};

interface SpeedometerProps {
  title: string;
  secondaryValues: secondaryValue[];
  value: string | number;
  weighting?: number;
  hintTitle: string;
  hintBody: string;
}

const Speedometer = ({
  title,
  value,
  hintTitle,
  hintBody,
  secondaryValues
}: SpeedometerProps) => {
  const t = useTranslations();

  return (
    <>
      <div className="bg-white w-[31%] flex flex-col items-center">
        <div className="flex w-full items-center justify-between p-4">
          <p>{title}</p>
          <InfoPopover hintTitle={hintTitle} hintBody={hintBody} />
        </div>

        <div className="relative">

          <Dial className="" />
          <SpeedoArrow className="absolute top-0 rotate-[-130deg]"/>
          <BenchmarkArrow className="absolute top-0 rotate-[130deg]"/>
        </div>

        <div className="text-gray-400 w-full py-4 px-1 text-xs xl:text-sm">
          <div
            className={`${
              !secondaryValues[0].score === null && 'text-gray-400'
            } flex items-center justify-evenly`}
          >
            <div className="h-2 w-2 bg-blue-400 " />
            <p>{secondaryValues[0].title}</p>
            <p className="font-semibold">{secondaryValues[0].score}</p>
          </div>
          <div className="flex items-center justify-evenly">
            <div className="h-2 w-2 bg-green-500 " />
            <p>{secondaryValues[1].title}</p>
            <p className="font-semibold">{secondaryValues[1].score}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Speedometer;
