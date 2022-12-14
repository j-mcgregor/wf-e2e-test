/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  VictoryArea,
  VictoryScatter,
  VictoryLine,
  VictoryTooltip
} from 'victory';
import { orangeFill, orangeLine, companyBlue } from './theme';
import ChartContainer from './ChartContainer';
import {
  GraphDataType,
  FinancialGraphType,
  FinancialTrendCategories
} from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
// import ChartButton from './ChartButton';
import {
  getMaxRenderValue,
  getMinRenderValue,
  getNumberLength,
  calculateMaxDataPoint,
  calculateMinDataPoint,
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
  // const [selectedGraphIndex, setSelectedGraphIndex] = useState<number | null>(
  //   0
  // );
  const t = useTranslations();

  useEffect(() => {
    data !== graphData && setData(graphData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const companyGraph = graphData[0];
  const benchmarkGraph = graphData[1];

  // find the largest number by digits not only largest positive number
  const largestNumberByDigits = useMemo(() => {
    const largestCompanyValue =
      companyGraph &&
      Math.max(
        ...companyGraph.data.map((data: GraphDataType) => Math.abs(data.y))
      );
    const largestBenchmarkValue =
      benchmarkGraph &&
      Math.max(
        ...benchmarkGraph.data?.map((data: GraphDataType) => Math.abs(data.y))
      );
    return Math.max(largestCompanyValue || 0, largestBenchmarkValue || 0);
  }, [companyGraph, benchmarkGraph]);

  // get largest y value from all graphs
  const largestYDataPoint = useMemo(() => {
    const largestCompanyValue =
      companyGraph &&
      Math.max(...companyGraph.data.map((data: GraphDataType) => data.y));
    const largestBenchmarkValue =
      benchmarkGraph &&
      Math.max(...benchmarkGraph.data?.map((data: GraphDataType) => data.y));
    return Math.max(largestCompanyValue || 0, largestBenchmarkValue || 0);
  }, [companyGraph, benchmarkGraph]);

  // get smallest y value from all graphs
  const smallestYDataPoint = useMemo(() => {
    const smallestCompanyValue =
      companyGraph &&
      Math.min(...companyGraph.data.map((data: GraphDataType) => data.y));
    const smallestBenchmarkValue =
      benchmarkGraph &&
      Math.min(...benchmarkGraph.data?.map((data: GraphDataType) => data.y));
    return Math.min(smallestCompanyValue || 0, smallestBenchmarkValue || 0);
  }, [companyGraph, benchmarkGraph]);

  // needs to use largest number by digits because of negative values and the Math.max function
  const largestNumberLength = getNumberLength(largestNumberByDigits);

  // is largest value over 99,000,000 ? should use as millions
  const useMillions = chartType === 'currency' && largestNumberLength > 8;
  //  is largest value over 1000 and less than 100,000,000 ? should use as thousands
  const useThousands =
    chartType === 'currency' &&
    largestNumberLength > 4 &&
    largestNumberLength <= 8;

  // company graphs with recalculated y values
  const convertedCompanyGraph = {
    name: companyGraph.name,
    data: convertData(companyGraph.data, useMillions, useThousands)
  };

  // const isBenchmarkData = isGraphData(benchmarkGraph);

  // handle the fact that ratios can be over 1000 and thus would be divided by 1000
  const maxYValue =
    chartType === 'ratio'
      ? largestYDataPoint
      : calculateMaxDataPoint(largestYDataPoint, largestNumberLength);

  const minYValue = calculateMinDataPoint(
    smallestYDataPoint,
    largestNumberLength
    // header === "Net Income"
  );

  const maxRenderValue = getMaxRenderValue(disabled, chartType, maxYValue);
  // So percentages through it out
  // also if the values are 3 digits but the maximum are over 100,000,000 then you end up with descrepancies
  const minRenderValue = getMinRenderValue(
    disabled,
    chartType,
    chartType === 'percentage' ? smallestYDataPoint : minYValue
  );

  const graphRange = Math.abs(maxRenderValue - minRenderValue);
  const graphPadding = graphRange * 0.1;
  const chartMaxValue = maxRenderValue + graphPadding;

  // if min value is 0 then return min value
  // if not check if greater than 0
  // if min value > 0 but the min value - graph padding is less than 0 return 0
  // otherwise return min value - graph padding
  const chartMinValue =
    minRenderValue === 0
      ? minRenderValue
      : minRenderValue > 0
      ? minRenderValue - graphPadding < 0
        ? 0
        : minRenderValue - graphPadding
      : minRenderValue - graphPadding;

  const chartTypeText =
    chartType === 'currency' && useMillions
      ? `${currencySymbol} ${t('millions')}`
      : chartType === 'currency' && useThousands
      ? `${currencySymbol} ${t('thousands')}`
      : chartType === 'currency' && !useThousands && !useMillions
      ? `${currencySymbol}`
      : chartType === 'percentage'
      ? `${t('percentage')} %`
      : chartType === 'ratio'
      ? t('ratio')
      : chartType === 'days'
      ? t('days')
      : null;

  // how to log only one graph
  // header === 'Total Debt' && console.log('total_debt  Net', graphData);

  return (
    <div
      className={`${
        disabled && 'opacity-50 -z-10'
      } shadow rounded-sm bg-white flex flex-col print:inline-block print:w-full print:shadow-none avoid-break px-2 h-full justify-between`}
      data-testid="chart-multi-testid "
    >
      <div className="flex justify-between items-start px-4 pt-4 text-base print:h-12 print:mb-2">
        <div className="">
          <h5 className="print:h-8  pb-2 md:whitespace-nowrap lg:whitespace-normal font-semibold md:text-sm print:text-xs">
            {header}
          </h5>

          <p className="print:h-4 opacity-70 print:opacity-100 print:text-gray-400 text-sm print:text-xs">
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
        max={chartMaxValue}
        min={chartMinValue}
      >
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
              fill: orangeFill,
              fillOpacity: 0.6,
              stroke: orangeLine,
              strokeOpacity: 1
            }
          }}
        />
        {/* Red annotation line through 0 values */}
        {!disabled && (
          <VictoryLine
            data={[{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }]}
            style={{
              data: {
                stroke: '#E58A2E',
                strokeWidth: 1
              }
            }}
            standalone={true}
          />
        )}

        {/* Company Graph */}

        {!disabled && (
          // <VictoryGroup>
          <VictoryScatter
            key={`victory-scatter-${companyGraph.name}`}
            data={convertedCompanyGraph.data}
            size={2}
            y0={() => minRenderValue * 0.8}
            style={{
              data: {
                strokeWidth: 1,
                stroke: orangeLine,
                strokeOpacity: 1,
                fill: orangeLine,
                fillOpacity: 1
              }
            }}
            labels={({ datum }) => {
              return formatToolTip(
                datum.y,
                chartType,
                useMillions,
                useThousands
              );
            }}
            // containerComponent={<VictoryVoronoiContainer />}
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
                    fill: companyBlue
                  }}
                />
              )
            })}
          />
          // </VictoryGroup>
        )}
      </ChartContainer>
    </div>
  );
};

export default ChartMulti;
