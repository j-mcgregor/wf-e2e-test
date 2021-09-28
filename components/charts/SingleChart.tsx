import { useState } from 'react';
import {
  VictoryArea,
  VictoryChart,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer // makes tooltip snap to nearest data point
} from 'victory';

import ToolTip from '../svgs/ToolTip';

import { theme, darkBlue } from './theme';
import { company1 } from './data';

interface ChartProps {
  title: string;
  timeFrame: string;
  info?: string;
}
const SingleChart = ({ title, timeFrame, info }: ChartProps) => {
  const [company, setCompany] = useState(company1);

  const [toolTipValue, setToolTipValue] = useState<number | string | null>(
    null
  );

  return (
    <div className="w-screen flex justify-center items-center bg-bg">
      <div
        onMouseLeave={() => setToolTipValue(null)}
        className="w-1/2 shadow rounded-sm bg-white flex flex-col my-8"
      >
        <VictoryChart
          height={250}
          width={350}
          theme={theme}
          maxDomain={{ y: 1000 }}
          minDomain={{ y: 200 }}
          containerComponent={
            // this component allows the tooltip to snap to the nearest data point
            <VictoryVoronoiContainer
              // sets the y value of hovered data point into local state
              onActivated={points => setToolTipValue(points[0]._voronoiY)}
            />
          }
        >
          <VictoryArea
            data={company}
            interpolation="natural"
            labels={({ datum }) => datum.y}
            style={{ labels: { fill: 'transparent ' } }}
            labelComponent={
              <VictoryTooltip
                // cornerRadius={4}
                // height={10}
                // flyoutStyle={{ stroke: 'white' }}
                // need to somehow edit component to align properly in chart when rendered?
                flyoutComponent={<ToolTip text={toolTipValue} />}
              />
            }
          />
          <VictoryScatter
            data={company}
            size={2}
            style={{ data: { fill: darkBlue } }}
            // below hides label but doesn't reset when mouse leaves chart
            labels={({ datum }) => (toolTipValue !== datum.y ? datum.y : null)}
            // labels={({ datum }) => datum.y}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default SingleChart;
