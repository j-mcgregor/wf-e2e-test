import Dial from '../../svgs/Dial';
import SpeedoArrow from '../../svgs/SpeedoArrow';
import BenchmarkArrow from '../../svgs/BenchmarkArrow';
import { TranslateInput } from '../../../types/global';
import { ReactElement } from 'react';

type SecondaryValue = {
  name: TranslateInput;
  value: number | string | null;
  colour?: string;
};

interface SpeedometerProps {
  title: string;
  secondaryValues: SecondaryValue[];
  value: string | number;
  weighting?: number;
  hint: ReactElement;
}

const Speedometer = ({
  title,
  value,
  hint,
  secondaryValues
}: SpeedometerProps) => {
  // 260 degrees available

  // probably need to add a version where there is no value and its completely disabled

  const arrowDegs = Math.random() * 260 - 130;

  const benchmarks = secondaryValues.map(value => ({
    rotation: Math.random() * 260 - 130,
    ...value
  }));

  return (
    <>
      <div
        className="bg-white mt-6 mx-auto xl:mx-0 flex flex-col items-center w-[250px] overflow-hidden
         print:inline-block print:w-[200px] avoid-break"
        role="contentinfo"
      >
        <div className="flex w-full items-center justify-between px-4 pt-4 pb-2">
          <p>{title}</p>
          {hint}
        </div>

        <div className="relative ">
          <Dial className="w-full h-full" />
          <SpeedoArrow
            style={{ transform: `rotate(${arrowDegs}deg)` }}
            className="absolute top-0 w-full  h-full transition-transform duration-500"
          />

          <div className="absolute top-1/2 w-full text-center text-2xl font-bold pt-5">
            <span>{value}</span>
          </div>

          {benchmarks.map(
            (benchmark, index) =>
              benchmark.value && (
                <BenchmarkArrow
                  key={index}
                  style={{ transform: `rotate(${benchmark.rotation}deg)` }}
                  className={`absolute top-0 w-full h-full transition-transform duration-500 ${
                    index % 2 === 1 ? 'text-green-500' : 'text-blue-500'
                  }`}
                />
              )
          )}
        </div>

        <div className="text-gray-400 w-full pb-4 px-1 text-xs xl:text-sm -mt-2 overflow-hidden">
          {benchmarks.map((benchmark, index) => (
            <SpeedoKey
              key={index}
              name={benchmark.name}
              value={benchmark.value}
              colour={index % 2 === 1 ? 'bg-green-500' : 'bg-blue-500'}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const SpeedoKey = ({ name, value, colour }: SecondaryValue) => {
  return (
    <div
      className={`flex items-center ml-4 space-x-3 ${!value && 'opacity-30'}`}
    >
      <div className={`h-2 w-2 ${colour}`} />
      <p className="w-[60%]">{name}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

export default Speedometer;
