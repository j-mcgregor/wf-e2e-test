import React from 'react';
import { MultiGraphDataType } from '../../types/charts';

interface ChartButtonProps {
  onClick: (index: number) => void;
  selectedGraphIndex: number | null;
  graphIndex: number;
  graph: MultiGraphDataType;
  border: string;
  bg: string;
}

const ChartButton = ({
  onClick,
  selectedGraphIndex,
  graphIndex,
  graph,
  border,
  bg
}: ChartButtonProps) => {
  return (
    <button
      onClick={() => onClick(graphIndex)}
      className={`${
        selectedGraphIndex === graphIndex && 'font-bold'
      } flex items-center justify-start w-full `}
    >
      <div
        className={`${
          selectedGraphIndex !== graphIndex ? border : bg
        } w-3 h-3 mx-2`}
      />
      <p>{graph.name}</p>
    </button>
  );
};

export default ChartButton;
