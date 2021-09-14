import React, { SVGProps } from 'react';

const BenchmarkArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="218"
      height="238"
      viewBox="0 0 218 238"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="109"
        cy="129"
        r="109"
        transform="rotate(90 109 129)"
        fill="#C4C4C4"
        fillOpacity="0.01"
      />
      <path
        d="M117 0L100 0C100 0 108.5 17 109 17C109.5 17 117 0 117 0Z"
        fill="#3199FA"
      />
    </svg>
  );
};

export default BenchmarkArrow;
