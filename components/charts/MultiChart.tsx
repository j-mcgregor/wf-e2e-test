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
  const [selectedCompany, setSelectedCompany] = useState(1);

  useEffect(() => {
    setData(companies);
  });

  const black = '#022D45';
  const blue = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? black : i === 1 ? blue : green;
  };

  return (
    <div className="w-screen flex justify-center  bg-bg">
      <div className="w-1/2 shadow rounded-sm bg-white flex flex-col">
        <VictoryChart height={250} width={350} theme={theme}>
          <VictoryGroup style={{ data: { strokeWidth: 1 } }}>
            {data?.map((company, i) => (
              <VictoryArea
                data={company}
                // need to set this so that only selected companies labels render
                // labels={({ datum, data }) => datum.y}
                interpolation="natural"
                style={{
                  data: {
                    fill: graphColors(i),
                    fillOpacity: i === selectedCompany ? '0.4' : '0.1',
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
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
        <div className="flex flex-col text-sm w-full items-center text-primary">
          <button
            onClick={() => setSelectedCompany(0)}
            className="flex items-center w-28 py-1 justify-between"
          >
            <div className={`w-4 h-4 bg-[#022D45]`} />
            <p>Company 1</p>
          </button>
          <button
            onClick={() => setSelectedCompany(1)}
            className="flex items-center w-28 py-1 justify-between"
          >
            <div className={`w-4 h-4 bg-[#278EC8]`} />
            <p>Company 2</p>
          </button>
          <button
            onClick={() => setSelectedCompany(2)}
            className="flex items-center w-28 py-1 justify-between"
          >
            <div className={`w-4 h-4 bg-[#2BAD01]`} />
            <p>Company 3</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiChart;
