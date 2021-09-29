import { useState } from 'react';
import { VictoryArea, VictoryScatter } from 'victory';

import ChartContainer from './ChartContainer';
import { darkBlue } from './theme';
import { company1 } from './data';

const Chart = () => {
  const company = company1;

  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  return (
    <div className="w-screen flex justify-center items-center bg-bg">
      <div
        onMouseLeave={() => setToolTipValue(null)}
        className="w-1/2 shadow rounded-sm bg-white flex flex-col my-8"
      >
        <ChartContainer
          tooltipValue={toolTipValue}
          handleSetTooltip={setToolTipValue}
        >
          <VictoryArea
            data={company}
            interpolation="natural"
            labels={({ datum }) => datum.y}
            style={{ labels: { fill: 'transparent ' } }}
          />
          <VictoryScatter
            data={company}
            size={2}
            style={{ data: { fill: darkBlue } }}
            labels={({ datum }) => (toolTipValue !== datum.y ? datum.y : null)}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default Chart;
