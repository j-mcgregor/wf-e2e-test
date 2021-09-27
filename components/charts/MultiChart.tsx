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

  console.log(data);

  useEffect(() => {
    setData(companies);
  });

  const graphColors = (i: number): string => {
    return i === 0 ? '#022D45' : i === 1 ? '#2BAD01' : '#278EC8';
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
                    fillOpacity: i === selectedCompany ? '0.3' : '0.1',
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
      </div>
    </div>
  );
};

export default MultiChart;
