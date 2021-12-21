import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis
} from 'victory';

import { theme } from './theme';

interface ChartContainerProps {
  children: React.ReactNode;
  handleSetTooltip: (point: number) => void;
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
                  fontFamily: 'Helvetica',
                  fontSize: '7px',
                  fontWeight: 'bold',
                  fill: 'white',
                  padding: 10,
                  background: 'white'
                }}
              />
            }
          />
        }
      >
        {/* these VictoryAxis components are needed offset the axis labels when negative values  */}
        <VictoryAxis offsetY={50} />
        <VictoryAxis dependentAxis offsetX={40} crossAxis={false} />
        {children}
      </VictoryChart>
    </div>
  );
};

export default ChartContainer;
