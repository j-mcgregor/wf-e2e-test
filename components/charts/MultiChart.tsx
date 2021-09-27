import { useState, useEffect } from 'react';

import {
  VictoryChart,
  VictoryArea,
  VictoryScatter,
  VictoryGroup
} from 'victory';

import { companies, CompanyDataType } from './data';
import { theme } from './theme';

const MultiChart = () => {
  const [data, setData] = useState<CompanyDataType[][] | undefined>();
  const [selectedCompany, setSelectedCompany] = useState<number | undefined>();

  useEffect(() => {
    setData(companies);
  });

  const black = '#022D45';
  const blue = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? black : i === 1 ? green : blue;
  };

  return (
    <div className="w-screen flex justify-center  bg-bg">
      <div className="w-1/2 shadow rounded-sm bg-white flex flex-col">
        <VictoryChart height={250} width={350} theme={theme}>
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
                    fillOpacity: i === selectedCompany ? '0.5' : '0.1',
                    stroke: graphColors(i)
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
                    fillOpacity: 1,
                    fill: i !== selectedCompany ? 'white' : graphColors(i),
                    stroke: graphColors(i)
                  }
                }}
                labels={({ datum }) =>
                  data.indexOf(company) === selectedCompany ? datum.y : null
                }
              />
            ))}
          </VictoryGroup>
        </VictoryChart>

        <div className="flex flex-col text-xs items-start px-8 pb-12 w-full justify-between text-primary">
          <button
            onClick={() => setSelectedCompany(0)}
            className="flex items-center py-1 justify-start w-full"
          >
            <div className={`w-4 h-4 bg-[#022D45] mx-2`} />
            <p>Scottish Seabird Center LTD</p>
          </button>
          <button
            onClick={() => setSelectedCompany(1)}
            className="flex items-center py-1 justify-start w-full"
          >
            <div className={`w-4 h-4 bg-[#2BAD01] mx-2`} />
            <p>Industry Benchmark</p>
          </button>
          <button
            onClick={() => setSelectedCompany(2)}
            className="flex items-center py-1 justify-start w-full"
          >
            <div className={`w-4 h-4 bg-[#278EC8] mx-2`} />
            <p>Region Benchmark</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiChart;
