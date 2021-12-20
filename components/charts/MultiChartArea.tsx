import React from 'react';
import { VictoryArea } from 'victory';
import { MultiGraphDataType } from '../../types/charts';

interface MultiChartAreaProps {
  graph: MultiGraphDataType;
  allGraphs: MultiGraphDataType[];
  fillColor: string;
  minValue: number;
  selectedGraph: number | null;
}

const MultiChartArea = ({
  graph,
  allGraphs,
  fillColor,
  selectedGraph,
  minValue
}: MultiChartAreaProps) => {
  return (
    <VictoryArea
      key={`victory-area-${graph.name}`}
      animate={{
        duration: 500,
        onLoad: { duration: 500 }
      }}
      data={graph.data}
      y0={() => minValue} // sets baseline of graph to min value
      interpolation="monotoneX" // creates smoother curve than 'natural'
      style={{
        data: {
          fill: 'black',
          fillOpacity:
            allGraphs.indexOf(graph) === selectedGraph ? '0.8' : '0.05',
          stroke: fillColor,
          strokeOpacity:
            allGraphs.indexOf(graph) === selectedGraph ? '0.8' : '0.05'
        }
      }}
    />
  );
};

export default MultiChartArea;
