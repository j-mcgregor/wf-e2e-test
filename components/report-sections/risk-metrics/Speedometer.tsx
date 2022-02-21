import Dial from '../../svgs/Dial';
import SpeedoArrow from '../../svgs/SpeedoArrow';
import BenchmarkArrow from '../../svgs/BenchmarkArrow';
import { TranslateInput } from '../../../types/global';
import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';

type SecondaryValue = {
  name: TranslateInput;
  value: number | null;
  colour?: string;
};

interface SpeedometerProps {
  title: string;
  secondaryValues: SecondaryValue[];
  value?: number;
  weighting?: number;
  hint: ReactElement;
  asMetric?: string;
  decimalPoints?: number;
  reverseX?: boolean;
  rotationCalculator: (value: number) => number;
}

const Speedometer = ({
  title,
  value,
  hint,
  asMetric,
  secondaryValues,
  decimalPoints,
  reverseX,
  rotationCalculator
}: SpeedometerProps) => {
  const isFloat = value && Number(value) === value && value % 1 !== 0;

  const isValidValue = value || value === 0;
  const renderValue =
    isValidValue &&
    new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: decimalPoints,
      maximumFractionDigits: decimalPoints
    }).format(value);

  const t = useTranslations();

  const arrowRotation = isValidValue && rotationCalculator(value);

  return (
    <>
      {/* <div
        className="bg-white mt-6 mx-auto flex flex-col items-center justify-center w-[280px] md:w-[250px] 2xl:w-[280px] overflow-hidden
        print:inline-block print:w-[200px] avoid-break"
        role="contentinfo"
      > */}

      <div
        className="bg-white flex flex-col items-center  overflow-hidden
        print:inline-block h-auto avoid-break "
      >
        <div className="flex w-full items-center justify-between px-4 pt-4 pb-2">
          <p className="md:text-sm">{title}</p>
          {hint}
        </div>

        <div className="relative ">
          <Dial className="w-full h-full" reverseX={reverseX} />
          <SpeedoArrow
            style={{ transform: `rotate(${arrowRotation}deg)` }}
            className="absolute top-0 w-full  h-full transition-transform duration-500"
          />

          <div
            className={`absolute top-1/2 w-full text-center text-xl font-bold pt-5 ${
              isFloat ? 'ml-[4px]' : ''
            }`}
          >
            <span>
              {isValidValue ? renderValue : t('na')}
              {isValidValue && asMetric ? asMetric : null}
            </span>
          </div>

          {secondaryValues.map((benchmark, index) => {
            const isValidBenchmark = benchmark.value || benchmark.value === 0;
            return isValidBenchmark ? (
              <BenchmarkArrow
                key={index}
                style={{
                  transform: `rotate(${rotationCalculator(
                    Number(benchmark.value)
                  )}deg)`
                }}
                className={`absolute top-0 w-full h-full transition-transform duration-500 ${
                  index % 2 === 1 ? 'text-green-500' : 'text-blue-500'
                }`}
              />
            ) : (
              ''
            );
          })}
        </div>

        <div className="text-gray-400 w-full pb-4 px-1 text-xs xl:text-sm -mt-2 overflow-hidden">
          {secondaryValues.map((benchmark, index) => {
            const isValidBenchmark = benchmark?.value || benchmark?.value === 0;

            const value = benchmark.value as number | bigint;

            const renderValue = isValidBenchmark
              ? new Intl.NumberFormat('en-GB', {
                  minimumFractionDigits: decimalPoints,
                  maximumFractionDigits: decimalPoints
                }).format(value)
              : t('na');

            return (
              <SpeedoKey
                key={index}
                name={benchmark.name}
                value={`${renderValue}${
                  benchmark?.value && asMetric ? asMetric : ''
                }`}
                colour={index % 2 === 1 ? 'bg-green-500' : 'bg-blue-500'}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const SpeedoKey = ({
  name,
  value,
  colour
}: {
  name: TranslateInput;
  value: string;
  colour: string;
}) => {
  // console.log(name, value)
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
