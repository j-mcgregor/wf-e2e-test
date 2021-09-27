import React from 'react';

const ToolTip = ({ text, ...restProps }: { text: string | number | Float32Array }) => {
  return (
    <svg
      width="34"
      height="32"
      viewBox="0 0 34 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect
        x="16.9585"
        y="22.0447"
        width="6.78328"
        height="6.78328"
        rx="0.84791"
        transform="rotate(45 16.9585 22.0447)"
        fill="#022D45"
      />
      <rect width="33.9164" height="27.1331" rx="2.54373" fill="#022D45" />
      <text
        fill="white"
        xmlSpace="preserve"
        style={{ whiteSpace: 'pre' }}
        // fontFamily="IBM Plex Sans"
        fontSize="10.1749"
        letterSpacing="0.339164px"
      >
        <tspan x="7.29798" y="17.3814">
          {text}
        </tspan>
      </text>
    </svg>
  );
};

export default ToolTip;
