import {
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryLabel,
  LineSegment
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
  type
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
          left: 40,
          top: 25,
          right: 20,
          bottom: 50
        }}
        containerComponent={
          <VictoryVoronoiContainer
            responsive={true} // this is used to control responsive mode and allows custom size if needed
            labels={({ datum }) => datum.y}
            {...(showLabels && {
              labelComponent: (
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
              )
            })}
          />
        }
      >
        {/* ==== VictoryAxis components needed offset axis labels when negative values ==== */}
        <VictoryAxis
          offsetY={30}
          orientation="bottom"
          style={{ tickLabels: { angle: xAxisLabelAngle } }}
          tickCount={tickCount}
        />
        <VictoryAxis
          gridComponent={<LineSegment />}
          minDomain={0}
          tickFormat={num =>
            num % 1 !== 0 ? num.toFixed(2).replace('.', ',') : num
          } // formats tick labels based on data from graph
          dependentAxis
          offsetX={25}
          crossAxis={false}
          tickLabelComponent={<VictoryLabel dy={-5} />}
        />

        {children}
      </VictoryChart>
    </div>
  );
};

export default ChartContainer;
