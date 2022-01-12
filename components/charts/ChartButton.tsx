import React from 'react';

interface ChartButtonProps {
  onClick: (index: number) => void;
  selectedGraphIndex: number | null;
  graphIndex: number;
  title: string | undefined;
  border: string;
  bg: string;
}

const ChartButton = ({
  onClick,
  selectedGraphIndex,
  graphIndex,
  title,
  border,
  bg
}: ChartButtonProps) => {
  return (
    <button
      onClick={() => onClick(graphIndex)}
      className={`${
        selectedGraphIndex === graphIndex && 'font-bold'
      } flex items-center justify-start w-full text-base sm:text-sm md:text-xs 2xl:text-sm`}
    >
      <div
        className={`${
          selectedGraphIndex !== graphIndex ? border : bg
        } w-3 h-3 mx-2`}
      />
      <p>{title}</p>
    </button>
  );
};

export default ChartButton;
