/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  VictoryArea,
  VictoryScatter,
  VictoryGroup,
  VictoryLine
} from 'victory';
import ChartContainer from './ChartContainer';
import { GraphDataType, FinancialGraphType } from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
import ChartButton from './ChartButton';

interface ChartMultiProps {
  graphData: FinancialGraphType[];
  header: TranslateInput;
  hintTitle: TranslateInput;
  hintBody: TranslateInput;
  disabled?: boolean;
  subHeader?: TranslateInput;
  currencySymbol?: string;
  chartType?: 'currency' | 'percentage' | 'ratio';
}

const ChartMulti = ({
  graphData,
  header,
  hintBody,
  hintTitle,
  disabled,
  currencySymbol,
  chartType,
  subHeader
}: ChartMultiProps) => {
  const [data, setData] = useState<FinancialGraphType[] | null>(null);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState<number | null>(
    0
  );

  const numberLength = (num: number) => {
    return num.toFixed().replace('.', '').length;
  };

  useEffect(() => {
    data !== graphData && setData(graphData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const companyColour = '#022D45';
  const benchmarkColour = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? companyColour : i === 1 ? benchmarkColour : green;
  };

  const companyIndex = 0;
  const benchmarkIndex = 1;

  const companyGraph = graphData[companyIndex];
  const benchmarkGraph = graphData[benchmarkIndex];

  // get largest y value from all graphs
  const largestValue = useMemo(() => {
    const largestCompanyValue =
      companyGraph &&
      Math.max(...companyGraph.data.map((data: GraphDataType) => data.y));
    const largestBenchmarkValue =
      benchmarkGraph &&
      Math.max(...benchmarkGraph.data?.map((data: GraphDataType) => data.y));
    return Math.max(largestCompanyValue || 0, largestBenchmarkValue || 0);
  }, [companyGraph, benchmarkGraph]);

  // get smallest y value from all graphs
  const smallestValue = useMemo(() => {
    const smallestCompanyValue =
      companyGraph &&
      Math.min(...companyGraph.data.map((data: GraphDataType) => data.y));
    const smallestBenchmarkValue =
      benchmarkGraph &&
      Math.min(...benchmarkGraph.data?.map((data: GraphDataType) => data.y));
    return Math.min(smallestCompanyValue || 0, smallestBenchmarkValue || 0);
  }, [companyGraph, benchmarkGraph]);

  // length of number from the largest y value
  const largestValueLength = numberLength(largestValue);

  // is largest value over 99,000,000 ? should use as millions
  const useMillions = chartType === 'currency' && largestValueLength > 8;
  //  is largest value over 1000 and less than 100,000,000 ? should use as thousands
  const useThousands =
    chartType === 'currency' &&
    largestValueLength > 4 &&
    largestValueLength <= 8;

  const convertData = (graph: GraphDataType[]) => {
    return graph?.map((data: GraphDataType) => {
      return {
        x: data.x,
        y: useMillions
          ? data.y / 1000000
          : useThousands
          ? data.y / 1000
          : data.y
      };
    });
  };

  // company graphs with recalculated y values
  const convertedCompanyGraph = {
    name: companyGraph.name,
    data: convertData(companyGraph.data)
  };

  // benchmark graphs with recalculated y values
  const convertedBenchmarkGraph = {
    name: benchmarkGraph?.name,
    data: convertData(benchmarkGraph?.data)
  };

  const isGraphData = (graph: any): boolean => {
    return graph?.data.some((value: GraphDataType) => value.y !== 0);
  };

  const isBenchmarkData = isGraphData(benchmarkGraph);

  const maxValue =
    largestValueLength > 8
      ? largestValue / 1000000
      : largestValueLength >= 4 && largestValueLength <= 8
      ? largestValue / 1000
      : largestValue;

  const minValue = Math.min(
    numberLength(smallestValue) > 8
      ? smallestValue / 1000000
      : numberLength(smallestValue) >= 4 && numberLength(smallestValue) <= 8
      ? smallestValue / 1000
      : smallestValue
  );

  const t = useTranslations();

  // capital case company name from uppercase
  const companyName = companyGraph.name
    ?.toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const typeSubheader =
    chartType === 'currency' && useMillions
      ? `${currencySymbol} ${t('millions')}`
      : chartType === 'currency' && !useMillions
      ? `${currencySymbol} ${t('thousands')}`
      : chartType === 'percentage'
      ? `${t('percentage')} %`
      : chartType === 'ratio'
      ? t('ratio')
      : null;

  return (
    <div
      className={`${
        disabled && 'opacity-50 -z-10'
      } shadow rounded-sm bg-white flex flex-col print:inline-block print:w-full print:shadow-none avoid-break px-2`}
      data-testid="chart-multi-testid "
    >
      <div className="flex justify-between items-start px-4 pt-4 text-base">
        <div className="">
          <h5 className="pb-2">{header}</h5>
          <p className="opacity-70 print:opacity-100 print:text-gray-400">
            {typeSubheader || subHeader}
          </p>
        </div>
        <Hint title={t(`${hintTitle}`)} body={t(`${hintBody}`)} />
      </div>
      <ChartContainer
        height={220}
        width={200}
        max={
          disabled
            ? 1
            : maxValue <= 0
            ? 0
            : maxValue > 0 && 1
            ? maxValue * 1.4
            : maxValue * 1.2
        }
        min={disabled ? 0 : minValue}
      >
        {/* ===== Red annotation line through 0 values =====*/}

        {/* ==== used in example here: https://formidable.com/open-source/victory/guides/custom-charts/ ==== */}

        {!disabled && (
          <VictoryLine
            data={[{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }]}
            style={{
              data: {
                stroke: 'black',
                strokeWidth: 1
              }
            }}
            standalone={true}
          />
        )}

        {/* ==== Company Graph ===== */}
        <VictoryArea
          key={`victory-area-${companyGraph.name}`}
          animate={{
            duration: 500,
            onLoad: { duration: 500 }
          }}
          data={convertedCompanyGraph.data}
          interpolation="monotoneX"
          style={{
            data: {
              fill: companyColour,
              fillOpacity: companyIndex === selectedGraphIndex ? '0.65' : '0.2',
              stroke: companyColour,
              strokeOpacity: 1
            }
          }}
        />
        {/* ===== Benchmark Graph ===== */}
        {isBenchmarkData && (
          <VictoryArea
            key={`victory-area-${benchmarkGraph.name}`}
            animate={{
              duration: 500,
              onLoad: { duration: 500 }
            }}
            data={convertedBenchmarkGraph.data}
            interpolation="monotoneX"
            style={{
              data: {
                fill: benchmarkColour,
                fillOpacity:
                  benchmarkIndex === selectedGraphIndex ? '0.8' : '0.2',
                stroke: benchmarkColour,
                strokeOpacity: 1
              }
            }}
          />
        )}

        {!disabled && (
          <VictoryGroup>
            {/* ====================== */}
            {/* Company Scatter Points */}
            {/* ====================== */}
            <VictoryScatter
              key={`victory-scatter-${companyGraph.name}`}
              data={convertedCompanyGraph.data}
              size={2}
              y0={() => minValue * 0.8}
              style={{
                data: {
                  strokeWidth: 1,
                  stroke: graphColors(companyIndex),
                  strokeOpacity:
                    companyIndex === selectedGraphIndex ? '1' : '0.4',
                  fill:
                    companyIndex !== selectedGraphIndex
                      ? 'white'
                      : graphColors(companyIndex),
                  fillOpacity: companyIndex === selectedGraphIndex ? '1' : '0'
                }
              }}
            />
            {/* ====================== */}
            {/* Benchmark Scatter Points */}
            {/* ====================== */}
            {isBenchmarkData && (
              <VictoryScatter
                key={`victory-scatter-${benchmarkGraph.name}`}
                data={convertedBenchmarkGraph.data}
                size={2}
                y0={() => minValue * 0.8}
                style={{
                  data: {
                    strokeWidth: 1,
                    stroke: graphColors(benchmarkIndex),
                    strokeOpacity:
                      benchmarkIndex === selectedGraphIndex ? '1' : '0.7',
                    fill:
                      benchmarkIndex !== selectedGraphIndex
                        ? 'white'
                        : graphColors(benchmarkIndex),
                    fillOpacity:
                      benchmarkIndex === selectedGraphIndex ? '1' : '0'
                  }
                }}
              />
            )}
          </VictoryGroup>
        )}
      </ChartContainer>
      <div className="flex flex-col text-xxs px-1 lg:px-4 pb-4 w-full items-evenly justify-evenly text-primary">
        <ChartButton
          onClick={setSelectedGraphIndex}
          selectedGraphIndex={selectedGraphIndex}
          title={companyName}
          graphIndex={companyIndex}
          bg="bg-[#022D45]"
          border="border-2 border-[#022D45]"
        />
        {isBenchmarkData && (
          <ChartButton
            onClick={setSelectedGraphIndex}
            selectedGraphIndex={selectedGraphIndex}
            title={benchmarkGraph.name}
            graphIndex={benchmarkIndex}
            bg="bg-[#278EC8]"
            border="border-2 border-[#278EC8]"
          />
        )}
      </div>
    </div>
  );
};

export default ChartMulti;
