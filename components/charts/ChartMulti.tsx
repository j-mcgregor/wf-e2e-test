import { useState, useEffect } from 'react';
import { VictoryArea, VictoryScatter, VictoryGroup } from 'victory';
import ChartContainer from './ChartContainer';

import { companies, CompanyDataType } from './data';

const ChartMulti = () => {
  const [data, setData] = useState<CompanyDataType[][] | undefined>();
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  useEffect(() => {
    data !== companies && setData(companies);
  }, []);

  const black = '#022D45';
  const blue = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? black : i === 1 ? green : blue;
  };

  return (
    <div className="w-screen flex justify-center  bg-bg">
      <div className="w-1/2 shadow rounded-sm bg-white flex flex-col">
        <ChartContainer
          tooltipValue={toolTipValue}
          handleSetTooltip={setToolTipValue}
        >
          <VictoryGroup style={{ data: { strokeWidth: 1 } }}>
            {data?.map((company, i) => (
              <VictoryArea
                animate={{
                  duration: 500,
                  onLoad: { duration: 500 }
                }}
                data={company}
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
            ))}
          </VictoryGroup>
          <VictoryGroup>
            {data?.map((company, i) => (
              <VictoryScatter
                data={company}
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
            ))}
          </VictoryGroup>
        </ChartContainer>

        <div className="flex flex-col text-xs items-start px-8 pb-12 w-full justify-between text-primary">
          <button
            onClick={() => setSelectedCompany(0)}
            className={` flex items-center py-1 justify-start w-full`}
          >
            <div
              className={`${
                selectedCompany !== 0
                  ? 'bg-white border-2 border-[#022D45]'
                  : 'bg-[#022D45]'
              } w-4 h-4 mx-2 `}
            />
            <p>Scottish Seabird Center LTD</p>
          </button>
          <button
            onClick={() => setSelectedCompany(1)}
            className="flex items-center py-1 justify-start w-full"
          >
            <div
              className={`${
                selectedCompany !== 1
                  ? 'bg-white border-2 border-[#2BAD01]'
                  : 'bg-[#2BAD01] border-none'
              } w-4 h-4  mx-2`}
            />
            <p>Industry Benchmark</p>
          </button>
          <button
            onClick={() => setSelectedCompany(2)}
            className="flex items-center py-1 justify-start w-full"
          >
            <div
              className={`${
                selectedCompany !== 2
                  ? 'bg-white border-2 border-[#278EC8]'
                  : 'bg-[#278EC8] border-none'
              } w-4 h-4 mx-2`}
            />
            <p>Region Benchmark</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartMulti;
