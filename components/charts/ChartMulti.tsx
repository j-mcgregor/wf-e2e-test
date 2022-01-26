/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  VictoryArea,
  VictoryScatter,
  VictoryGroup,
  VictoryLine,
  VictoryTooltip
} from 'victory';
import ChartContainer from './ChartContainer';
import {
  GraphDataType,
  FinancialGraphType,
  FinancialTrendCategories
} from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
import ChartButton from './ChartButton';
import {
  getMaxGraphValue,
  getMinGraphValue,
  numberLength,
  isGraphData,
  getMaxValue,
  getMinValue,
  getCompanyName,
  convertData,
  formatToolTip
} from './graph-helpers';

interface ChartMultiProps {
  graphData: FinancialGraphType[];
  header: TranslateInput;
  hintTitle: TranslateInput;
  hintBody: TranslateInput;
  disabled?: boolean;
  subHeader?: TranslateInput;
  currencySymbol?: string;
  chartType?: FinancialTrendCategories;
  showLabels?: boolean;
}

const ChartMulti = ({
  graphData,
  header,
  hintBody,
  hintTitle,
  disabled,
  currencySymbol,
  chartType,
  subHeader,
  showLabels
}: ChartMultiProps) => {
  const [data, setData] = useState<FinancialGraphType[] | null>(null);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState<number | null>(
    0
  );

  useEffect(() => {
    data !== graphData && setData(graphData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const companyColour = '#022D45';
  // const benchmarkColour = '#278EC8';
  // const green = '#2BAD01';

  const companyGraph = graphData[0];
  const benchmarkGraph = graphData[1];

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

  const largestValueLength = numberLength(largestValue);
  // is largest value over 99,000,000 ? should use as millions
  const useMillions = chartType === 'currency' && largestValueLength > 8;
  //  is largest value over 1000 and less than 100,000,000 ? should use as thousands
  const useThousands =
    chartType === 'currency' &&
    largestValueLength > 4 &&
    largestValueLength <= 8;

  // company graphs with recalculated y values
  const convertedCompanyGraph = {
    name: companyGraph.name,
    data: convertData(companyGraph.data, useMillions, useThousands)
  };

  const isBenchmarkData = isGraphData(benchmarkGraph);
  const maximumDataValue = getMaxValue(largestValue, largestValueLength);
  const minimumDataValue = getMinValue(smallestValue);
  const maxToRender = getMaxGraphValue(disabled, chartType, maximumDataValue);
  const minToRender = getMinGraphValue(disabled, chartType, minimumDataValue);

  const t = useTranslations();

  const companyName = getCompanyName(companyGraph);

  const chartTypeText =
    chartType === 'currency' && useMillions
      ? `${currencySymbol} ${t('millions')}`
      : chartType === 'currency' && !useMillions
      ? `${currencySymbol} ${t('thousands')}`
      : chartType === 'percentage'
      ? `${t('percentage')} %`
      : chartType === 'ratio'
      ? t('ratio')
      : chartType === 'days'
      ? t('days')
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
            {chartTypeText || subHeader}
          </p>
        </div>
        <Hint title={t(`${hintTitle}`)} body={t(`${hintBody}`)} />
      </div>
      <ChartContainer
        background={true}
        tickCount={6}
        height={220}
        width={200}
        max={maxToRender}
        min={minToRender}
      >
        {/* Red annotation line through 0 values */}
        {!disabled && (
          <VictoryLine
            data={[{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }]}
            style={{
              data: {
                stroke: '#E58A2E',
                strokeWidth: 2
              }
            }}
            standalone={true}
          />
        )}

        {/* Company Graph */}
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
              fillOpacity: 0.6,
              stroke: companyColour,
              strokeOpacity: 1
            }
          }}
        />

        {!disabled && (
          <VictoryGroup>
            <VictoryScatter
              key={`victory-scatter-${companyGraph.name}`}
              data={convertedCompanyGraph.data}
              size={2}
              y0={() => minToRender * 0.8}
              style={{
                data: {
                  strokeWidth: 1,
                  stroke: companyColour,
                  strokeOpacity: 1,
                  fill: companyColour,
                  fillOpacity: 1
                }
              }}
              labels={({ datum }) =>
                formatToolTip(datum.y, chartType, useMillions)
              }
              {...(showLabels && {
                labelComponent: (
                  <VictoryTooltip
                    flyoutHeight={25}
                    style={{
                      fill: '#fff',
                      fontSize: 10,
                      padding: 5
                    }}
                    flyoutStyle={{
                      fill: companyColour
                    }}
                  />
                )
              })}
            />
          </VictoryGroup>
        )}
      </ChartContainer>
      <div className="flex flex-col text-xxs px-1 lg:px-4 pb-4 w-full items-evenly justify-evenly text-primary">
        <ChartButton
          onClick={setSelectedGraphIndex}
          selectedGraphIndex={selectedGraphIndex}
          title={companyName}
          graphIndex={0}
          bg="bg-[#022D45]"
          border="border-2 border-[#022D45]"
        />
        {isBenchmarkData && (
          <ChartButton
            onClick={setSelectedGraphIndex}
            selectedGraphIndex={selectedGraphIndex}
            title={benchmarkGraph.name}
            graphIndex={1}
            bg="bg-[#278EC8]"
            border="border-2 border-[#278EC8]"
          />
        )}
      </div>
    </div>
  );
};

export default ChartMulti;

// Benchmark graphs have been removed - might come back - 25.01.22
// Benchmark graph area
/* {isBenchmarkData && (
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
        )} */

// Benchmark Scatter Points
/* {isBenchmarkData && (
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
            )} */
