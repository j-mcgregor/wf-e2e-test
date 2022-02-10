import React, { SVGProps } from 'react';

const BenchmarkArrow = ({ className, style }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="270"
      height="270"
      viewBox="0 0 270 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
    >
      <path
        d="M144.559 7.18878L126 7C126 7 135.106 24.0935 135.652 24.0991C136.198 24.1046 144.559 7.18878 144.559 7.18878Z"
        fill={'currentColor'}
      />
    </svg>
  );
};

export default BenchmarkArrow;
