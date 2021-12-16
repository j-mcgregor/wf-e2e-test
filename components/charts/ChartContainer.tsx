import { VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import ToolTip from '../svgs/ToolTip';

import { theme } from './theme';

interface ChartContainerProps {
  children: React.ReactNode;
  handleSetTooltip: (point: number) => void;
  tooltipValue: number | null;
  height: number;
  width: number;
  max: number;
}
const ChartContainer = ({
  children,
  tooltipValue,
  height,
  width,
  max,
  handleSetTooltip
}: ChartContainerProps) => {
  return (
    <VictoryChart
      maxDomain={{ y: max }}
      height={height}
      width={width}
      theme={theme}
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
      {children}
    </VictoryChart>
  );
};

export default ChartContainer;
