/* eslint-disable security/detect-object-injection */
/* eslint-disable sonarjs/cognitive-complexity */
import { useState, useEffect } from 'react';
import { VictoryArea, VictoryScatter, VictoryGroup } from 'victory';
import ChartContainer from './ChartContainer';
import { GraphDataType, MultiGraphDataType } from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
import ChartButton from './ChartButton';

interface ChartMultiProps {
  graphData: MultiGraphDataType[];
  header: TranslateInput;
  subHeader: TranslateInput;
  hintTitle: TranslateInput;
  hintBody: TranslateInput;
}

const ChartMulti = ({
  graphData,
  header,
  subHeader,
  hintBody,
  hintTitle
}: ChartMultiProps) => {
  const [data, setData] = useState<MultiGraphDataType[] | null>(null);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState<number | null>(
    0
  );
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  useEffect(() => {
    data !== graphData && setData(graphData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const black = '#022D45';
  const blue = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? black : i === 1 ? blue : green;
  };

  const companyIndex = 0;
  const benchmarkIndex = 1;

  const companyGraph = graphData[companyIndex];
  const benchmarkGraph = graphData[benchmarkIndex];

  const isEmptyGraph = (graph: MultiGraphDataType): boolean => {
    return graph.data.every((value: GraphDataType) => value.y === 0);
  };
  const noCompanyData = isEmptyGraph(companyGraph);
  const noBenchmarks = isEmptyGraph(benchmarkGraph);
  const noData =
    (noCompanyData && noBenchmarks) || (noCompanyData && !noBenchmarks);

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

  return (
    <div
      className={`${
        noData && 'hidden'
      } shadow rounded-sm bg-white flex flex-col print:inline-block print:w-full print:shadow-none avoid-break`}
      data-testid="chart-multi-testid"
    >
      <div className="flex justify-between items-start px-4 pt-4 text-xs">
        <div>
          <p className="font-bold pb-2">{header}</p>
          <p className="opacity-70 print:opacity-100 print:text-gray-400">
            {subHeader}
          </p>
        </div>

        <Hint title={hintTitle} body={hintBody} />
      </div>

      <ChartContainer
        height={220}
        width={200}
        max={maxValue < 1 ? maxValue * 1.5 : maxValue * 1.2}
        min={minValue}
        tooltipValue={toolTipValue}
        handleSetTooltip={setToolTipValue}
      >
        <VictoryGroup style={{ data: { strokeWidth: 1.5 } }}>
          {/* -------- */}
          {/* tried to extract this to component but won't render? */}
          {/* -------- */}

          {/* <MultiChartArea
            graph={companyGraph}
            allGraphs={graphData}
            fillColor={black}
            selectedGraph={selectedGraphIndex}
            minValue={minValue}
          /> */}

          {!noCompanyData && (
            <VictoryArea
              key={`victory-area-${companyGraph.name}`}
              animate={{
                duration: 500,
                onLoad: { duration: 500 }
              }}
              data={companyGraph.data}
              y0={() => minValue}
              interpolation="monotoneX"
              style={{
                data: {
                  fill: black,
                  fillOpacity:
                    companyIndex === selectedGraphIndex ? '0.8' : '0.05',
                  stroke: black,
                  strokeOpacity:
                    companyIndex === selectedGraphIndex ? '0.8' : '0.05'
                }
              }}
            />
          )}

          {!noBenchmarks && (
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
                  fill: blue,
                  fillOpacity:
                    benchmarkIndex === selectedGraphIndex ? '0.8' : '0.05',
                  stroke: blue,
                  strokeOpacity:
                    benchmarkIndex === selectedGraphIndex ? '0.8' : '0.05'
                }
              }}
            />
          )}
        </VictoryGroup>
        <VictoryGroup>
          {!noCompanyData && (
            <VictoryScatter
              key={`victory-scatter-${companyGraph.name}`}
              data={companyGraph.data}
              size={2}
              style={{
                data: {
                  strokeWidth: 1,
                  stroke: graphColors(companyIndex),
                  strokeOpacity:
                    companyIndex === selectedGraphIndex ? '1' : '0.15',
                  fill:
                    companyIndex !== selectedGraphIndex
                      ? 'white'
                      : graphColors(companyIndex),
                  fillOpacity: companyIndex === selectedGraphIndex ? '1' : '0'
                }
              }}
            />
          )}

          {!noBenchmarks && (
            <VictoryScatter
              key={`victory-scatter-${benchmarkGraph.name}`}
              data={benchmarkGraph.data}
              size={2}
              style={{
                data: {
                  strokeWidth: 1,
                  stroke: graphColors(benchmarkIndex),
                  strokeOpacity:
                    benchmarkIndex === selectedGraphIndex ? '1' : '0.15',
                  fill:
                    benchmarkIndex !== selectedGraphIndex
                      ? 'white'
                      : graphColors(benchmarkIndex),
                  fillOpacity: benchmarkIndex === selectedGraphIndex ? '1' : '0'
                }
              }}
            />
          )}
        </VictoryGroup>
      </ChartContainer>
      <div className="flex flex-col text-xxs px-1 lg:px-4 pb-4 w-full items-evenly justify-evenly text-primary">
        <ChartButton
          onClick={setSelectedGraphIndex}
          selectedGraphIndex={selectedGraphIndex}
          graph={companyGraph}
          graphIndex={companyIndex}
          bg="bg-[#022D45]"
          border="border-2 border-[#022D45]"
        />
        {!noBenchmarks && (
          <ChartButton
            onClick={setSelectedGraphIndex}
            selectedGraphIndex={selectedGraphIndex}
            graph={benchmarkGraph}
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
