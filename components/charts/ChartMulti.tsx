import { useState, useEffect } from 'react';
import { VictoryArea, VictoryScatter, VictoryGroup } from 'victory';
import ChartContainer from './ChartContainer';
import { GraphDataType, MultiGraphDataType } from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
import { FinancialYear } from '../../types/report';

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
  const [selectedCompany, setSelectedCompany] = useState<number | null>(0);
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

  // check null / undefined / NaN value
  const emptyValueCheck = (value: any) => {
    return (
      value === null ||
      value === undefined ||
      Number.isNaN(value) ||
      value === 0
    );
  };

  // for filtering out graphs with some null data points
  const hasNullValue = graphData[0].data.some(graph =>
    emptyValueCheck(graph.y)
  );

  // for filtering out graphs with all null data points
  const hasAllNullValues = graphData.every((graph: any) =>
    graph.data.every((value: any) => emptyValueCheck(value.y))
  );

  const maxValue =
    Math.round(
      Math.max(
        ...graphData.map((graph: any) =>
          Math.max(...graph.data.map((value: GraphDataType) => value.y))
        )
      )
    ) * 1.2;

  // remove objects with null y values
  const filteredGraphData = graphData.filter(
    (graph: any) => !hasAllNullValues && !hasNullValue
  );

  return (
    <div
      className={`${
        hasAllNullValues && 'opacity-60 -z-10'
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
        max={maxValue}
        tooltipValue={toolTipValue}
        handleSetTooltip={setToolTipValue}
      >
        <VictoryGroup style={{ data: { strokeWidth: 1.5 } }}>
          {data?.map(
            (company, i) =>
              company?.data?.length > 0 && (
                <VictoryArea
                  key={`victory-area-${i}`}
                  animate={{
                    duration: 500,
                    onLoad: { duration: 500 }
                  }}
                  data={company.data}
                  interpolation="natural"
                  style={{
                    data: {
                      fill: graphColors(i),
                      fillOpacity: i === selectedCompany ? '0.8' : '0.05',
                      stroke: graphColors(i),
                      strokeOpacity: i === selectedCompany ? '1' : '0.05'
                    }
                  }}
                />
              )
          )}
        </VictoryGroup>
        <VictoryGroup>
          {data?.map(
            (company, i) =>
              company.data.length > 0 && (
                <VictoryScatter
                  key={`victory-scatter-${i}`}
                  data={company.data}
                  size={2}
                  style={{
                    data: {
                      strokeWidth: 1,
                      stroke: graphColors(i),
                      strokeOpacity: i === selectedCompany ? '1' : '0.15',
                      fill: i !== selectedCompany ? 'white' : graphColors(i),
                      fillOpacity: i === selectedCompany ? '1' : '0'
                    }
                  }}
                  labels={({ datum }) =>
                    data.indexOf(company) === selectedCompany &&
                    toolTipValue !== datum.y
                      ? datum.y
                      : null
                  }
                />
              )
          )}
        </VictoryGroup>
      </ChartContainer>

      <div className="flex flex-col text-xxs px-1 lg:px-4 pb-4 w-full items-evenly justify-evenly text-primary">
        {data?.map((company, i) => {
          const bg =
            company.name === 'Industry Benchmark'
              ? `bg-[#278EC8]`
              : company.name === 'Region Benchmark'
              ? `bg-[#2BAD01]`
              : `bg-[#022D45]`;

          const border =
            company.name === 'Industry Benchmark'
              ? `border-2  border-[#278EC8]`
              : company.name === 'Region Benchmark'
              ? `border-2  border-[#2BAD01]`
              : `border-2  border-[#022D45]`;

          return !company.data.length ? (
            <button
              disabled
              key={i}
              className={`flex items-center py-1 justify-start w-full cursor-default opacity-50`}
            >
              <div className={`border-2 ${border} w-3 h-3 mx-2`} />
              <p className="text-xs">{company.name}</p>
            </button>
          ) : (
            <button
              key={i}
              onClick={() => setSelectedCompany(i)}
              className={`${
                selectedCompany === i && 'font-bold'
              } flex items-center justify-start w-full `}
            >
              <div
                className={`${
                  selectedCompany !== i ? border : bg
                } w-3 h-3 mx-2`}
              />
              <p>{company.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChartMulti;
