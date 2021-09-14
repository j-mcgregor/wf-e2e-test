import React, { SVGProps } from 'react';

const SpeedoArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="218"
      height="218"
      viewBox="0 0 218 218"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M116 114C116 114 109.221 38 108.796 38C108.371 38 102 114 102 114L102.367 114.465C105.906 118.947 112.775 118.713 116 114Z"
        fill="#022D45"
      />
    </svg>
  );
};

export default SpeedoArrow;
