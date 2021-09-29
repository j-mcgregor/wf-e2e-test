import { useState, useEffect } from 'react';
import { VictoryArea, VictoryScatter, VictoryGroup } from 'victory';
import ChartContainer from './ChartContainer';

import { graphData, GraphDataType } from './data';

const ChartMulti = () => {
  const [data, setData] = useState<GraphDataType[] | null>();
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  useEffect(() => {
    data !== graphData && setData(graphData);
  }, [data]);

  const black = '#022D45';
  const blue = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? black : i === 1 ? blue : green;
  };

  return (
    <div className="w-screen flex justify-center  bg-bg">
      <div className="w-1/2 shadow rounded-sm bg-white flex flex-col">
        <ChartContainer
          tooltipValue={toolTipValue}
          handleSetTooltip={setToolTipValue}
        >
          <VictoryGroup style={{ data: { strokeWidth: 1 } }}>
            {data?.map(
              (company, i) =>
                company.data.length > 0 && (
                  <VictoryArea
                    animate={{
                      duration: 500,
                      onLoad: { duration: 500 }
                    }}
                    data={company.data}
                    interpolation="natural"
                    style={{
                      data: {
                        fill: graphColors(i),
                        fillOpacity: i === selectedCompany ? '0.5' : '0.2',
                        stroke: graphColors(i),
                        strokeOpacity: i === selectedCompany ? '0.9' : '0.15'
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
                    data={company.data}
                    size={2}
                    style={{
                      data: {
                        strokeWidth: 1,
                        stroke: graphColors(i),
                        strokeOpacity: i === selectedCompany ? '1' : '0.3',
                        fill: i !== selectedCompany ? 'white' : graphColors(i),
                        fillOpacity: i === selectedCompany ? '1' : '0.3'
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

        <div className="flex flex-col text-xs items-start px-8 pb-12 w-full justify-between text-primary">
          {data?.map((company, i) => {
            const notSelectKeyClass =
              company.name === 'Industry Benchmark'
                ? 'border-2 border-[#278EC8]'
                : company.name === 'Region Benchmark'
                ? 'border-2 border-[#2BAD01]'
                : 'border-2 border-[#022D45]';
            const selectedKeyClass =  company.name === 'Industry Benchmark'
                ? 'bg-[#278EC8]'
                : company.name === 'Region Benchmark'
                ? 'bg-[#2BAD01]'
                : 'bg-[#022D45]';
            return !company.data.length ? (
              <button
                disabled
                key={i}
                className={` flex items-center py-1 justify-start w-full opacity-40 cursor-default`}
              >
                <div className={`${notSelectKeyClass} w-4 h-4 mx-2`} />
                <p>{company.name}</p>
              </button>
            ) : (
              <button
                key={i}
                onClick={() => setSelectedCompany(i)}
                className={` flex items-center py-1 justify-start w-full`}
              >
                <div
                  className={`${selectedCompany !== i
                    ? notSelectKeyClass
                    : selectedKeyClass} w-4 h-4 mx-2`}
                />
                <p>{company.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartMulti;
