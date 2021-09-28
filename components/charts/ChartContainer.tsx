import { VictoryChart, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import ToolTip from '../svgs/ToolTip';
import { theme } from './theme';

interface ChartContainerProps {
  children: React.ReactNode;
  handleSetTooltip: (point: number) => void;
  tooltipValue: number | null;
}
const ChartContainer = ({
  children,
  tooltipValue,
  handleSetTooltip
}: ChartContainerProps) => {
  return (
    <VictoryChart
      maxDomain={{ y: 1000 }}
      height={250}
      width={350}
      theme={theme}
      containerComponent={
        <VictoryVoronoiContainer
          onActivated={points => handleSetTooltip(points[0]._voronoiY)}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryTooltip
              style={{
                fontSize: 10,
                padding: 4
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
