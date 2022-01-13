/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { VictoryArea, VictoryScatter, VictoryGroup } from 'victory';
import ChartContainer from './ChartContainer';
import { GraphDataType, MultiGraphDataType } from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
import ChartButton from './ChartButton';

interface ChartMultiProps {
  graphData: MultiGraphDataType[];
  header: TranslateInput;
  subHeader?: TranslateInput;
  hintTitle: TranslateInput;
  hintBody: TranslateInput;
  disabled?: boolean;
}

const ChartMulti = ({
  graphData,
  header,
  subHeader,
  hintBody,
  hintTitle,
  disabled
}: ChartMultiProps) => {
  const [data, setData] = useState<MultiGraphDataType[] | null>(null);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState<number | null>(
    0
  );

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

  const isGraphData = (graph: any): boolean => {
    return graph?.data.some((value: GraphDataType) => value.y !== 0);
  };

  const isBenchmarkData = isGraphData(benchmarkGraph);

  const maxValue = Math.max(
    ...graphData.map((graph: any) =>
      Math.max(...graph.data.map((value: GraphDataType) => value.y))
    )
  );

  const minValue = Math.min(
    ...graphData.map((graph: any) =>
      Math.min(...graph.data.map((value: GraphDataType) => value.y))
    )
  );

  const t = useTranslations();

  // capital case company name from uppercase
  const companyName = companyGraph.name
    ?.toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div
      className={`${
        disabled && 'opacity-50 -z-10'
      } shadow rounded-sm bg-white flex flex-col print:inline-block print:w-full print:shadow-none avoid-break`}
      data-testid="chart-multi-testid"
    >
      <div className="flex justify-between items-start px-4 pt-4 text-base">
        <div>
          <p className="pb-2">{header}</p>
          <p className="opacity-70 print:opacity-100 print:text-gray-400">
            {subHeader}
          </p>
        </div>

        <Hint title={t(`${hintTitle}`)} body={t(`${hintBody}`)} />
      </div>

      <ChartContainer
        height={220}
        width={200}
        max={disabled ? 1 : maxValue < 1 ? maxValue * 1.5 : maxValue * 1.2}
        min={disabled ? 0 : minValue}
      >
        <VictoryGroup style={{ data: { strokeWidth: 1.5 } }}>
          {/* ============= */}
          {/* Company Graph */}
          {/* ============= */}
          <VictoryArea
            key={`victory-area-${companyGraph.name}`}
            animate={{
              duration: 500,
              onLoad: { duration: 500 }
            }}
            data={companyGraph.data}
            y0={() => minValue * 0.9}
            interpolation="monotoneX"
            style={{
              data: {
                fill: companyColour,
                fillOpacity:
                  companyIndex === selectedGraphIndex ? '0.65' : '0.2',
                stroke: companyColour,
                strokeOpacity: 1
              }
            }}
          />
          {/* ============= */}
          {/* Benchmark Graph */}
          {/* ============= */}
          {isBenchmarkData && (
            <VictoryArea
              key={`victory-area-${benchmarkGraph.name}`}
              animate={{
                duration: 500,
                onLoad: { duration: 500 }
              }}
              data={benchmarkGraph.data}
              y0={() => minValue}
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
        </VictoryGroup>
        {!disabled && (
          <VictoryGroup>
            {/* ====================== */}
            {/* Company Scatter Points */}
            {/* ====================== */}
            <VictoryScatter
              key={`victory-scatter-${companyGraph.name}`}
              data={companyGraph.data}
              size={2}
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
                data={benchmarkGraph.data}
                size={2}
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
