import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryLabel,
  LineSegment,
  Background
} from 'victory';

import { theme } from './theme';

interface ChartContainerProps {
  children: React.ReactNode;
  height: number;
  width: number;
  max: number;
  min?: number;
  xAxisLabelAngle?: number;
  showLabels?: boolean;
  tickCount?: number;
  type?: string;
  background?: boolean;
}
const ChartContainer = ({
  children,
  height,
  width,
  max = 1,
  min = 0,
  xAxisLabelAngle = 0,
  showLabels = true,
  tickCount,
  background = false
}: ChartContainerProps) => {
  return (
    <div className="px-1">
      <VictoryChart
        maxDomain={{ y: max }}
        minDomain={{ y: min }}
        height={height}
        width={width}
        theme={theme}
        padding={{
          left: 35,
          top: 20,
          right: 20,
          bottom: 50
        }}
        // THIS WAS CAUSING THE GHOST 0's TO APPEAR
        containerComponent={
          <VictoryVoronoiContainer
          // disable={false}
          // responsive={true}
          // labels={({ datum }) => datum.y}
          />
        }
        {...(background && {
          style: { background: { fill: 'grey', opacity: 0.15 } }
        })}
      >
        {/* ==== VictoryAxis components needed offset axis labels when negative values ==== */}
        <VictoryAxis
          offsetY={30}
          orientation="bottom"
          style={{ tickLabels: { angle: xAxisLabelAngle } }}
          tickCount={tickCount}
        />
        <VictoryAxis
          tickCount={6}
          gridComponent={<LineSegment />}
          minDomain={0}
          tickFormat={num =>
            num % 1 !== 0 ? Number(num).toFixed(2).toLocaleString() : num
          } // formats tick labels based on data from graph
          dependentAxis
          offsetX={22}
          crossAxis={false}
          tickLabelComponent={<VictoryLabel dy={-5} />}
        />

        {children}
      </VictoryChart>
    </div>
  );
};

export default ChartContainer;
