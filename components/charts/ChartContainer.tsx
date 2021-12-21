import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis
} from 'victory';

import { theme } from './theme';

interface ChartContainerProps {
  children: React.ReactNode;
  height: number;
  width: number;
  max: number;
  min?: number;
}
const ChartContainer = ({
  children,
  height,
  width,
  max,
  min = 0
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
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryTooltip
                flyoutHeight={25}
                style={{
                  fontFamily: 'Helvetica',
                  fontSize: '8px',
                  fontWeight: 'bold',
                  fill: 'white',
                  padding: 6
                }}
              />
            }
          />
        }
      >
        {/* ==== VictoryAxis components needed offset axis labels when negative values ==== */}
        <VictoryAxis offsetY={50} />
        <VictoryAxis dependentAxis offsetX={40} crossAxis={false} />
        {children}
      </VictoryChart>
    </div>
  );
};

export default ChartContainer;
