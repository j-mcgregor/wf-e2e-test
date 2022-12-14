import React from 'react';

export const CircleX = ({
  fill = 'none',
  stroke = 'currentColor',
  className
}: {
  fill?: string;
  stroke?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${className}`}
      fill={fill}
      viewBox="0 0 24 24"
      stroke={stroke}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
