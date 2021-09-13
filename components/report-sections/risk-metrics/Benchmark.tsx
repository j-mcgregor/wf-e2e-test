import { useTranslations } from 'use-intl';
import InfoPopover from './InfoPopover';

type secondaryValue = {
  title: string;
  score: number | string | null;
};

interface BenchmarkProps {
  title: string;
  secondaryValues: secondaryValue[];
  value: string | number;
  weighting?: number;
  hintTitle: string;
  hintBody: string;
}

const Benchmark = ({
  title,
  value,
  hintTitle,
  hintBody,
  secondaryValues
}: BenchmarkProps) => {
  const t = useTranslations();

  return (
    <>
      <div className="bg-white w-[31%] flex flex-col items-center">
        <div className="flex w-full items-center justify-between p-4">
          <p>{title}</p>
          <InfoPopover hintTitle={hintTitle} hintBody={hintBody} />
        </div>

        <div
          style={{
            background: 'conic-gradient(red, yellow, lime)'
          }}
          className="relative w-5/6 rounded-full after:pt-[100%] after:block p-[3vw] md:p-[2vw] rotate-180"
        >
          <div className="h-full w-full flex items-center justify-center bg-white rounded-full">
            <p className="font-bold text-xl md:text-2xl absolute rotate-180">
              {value}
            </p>
          </div>
        </div>
        <div className="w-0 h-0 border-l-[6vw] border-r-[6vw] border-b-[6vw] border-transparent border-b-white relative bottom-[5.8vw]" />

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

export default Benchmark;
