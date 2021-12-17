import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis
} from 'victory';
import ToolTip from '../svgs/ToolTip';

import { theme } from './theme';

interface ChartContainerProps {
  children: React.ReactNode;
  handleSetTooltip: (point: number) => void;
  tooltipValue: number | null;
  height: number;
  width: number;
  max: number;
  min?: number;
}
const ChartContainer = ({
  children,
  tooltipValue,
  height,
  width,
  max,
  min = 0,
  handleSetTooltip
}: ChartContainerProps) => {
  return (
    <div className="px-1">
      <VictoryChart
        maxDomain={{ y: max }}
        minDomain={{ y: min }}
        height={height}
        width={width}
        theme={theme}
        padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
        containerComponent={
          <VictoryVoronoiContainer
            onActivated={points => handleSetTooltip(points[0]?._voronoiY)}
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryTooltip
                style={{
                  fontSize: 6,
                  padding: 4,
                  width: 100
                }}
                flyoutComponent={<ToolTip text={tooltipValue} />}
              />
            }
          />
        }
      >
        {/* these VictoryAxis components are needed offset the axis labels when negative values  */}
        <VictoryAxis offsetY={50} />
        <VictoryAxis
          dependentAxis
          offsetX={50}
          crossAxis={false}
          // style={{ tickLabels: { angle: -60 } }}
        />
        {children}
      </VictoryChart>
    </div>
  );
};

export default ChartContainer;
