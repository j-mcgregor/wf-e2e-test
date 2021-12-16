import React from 'react';

const ToolTip = ({
  text,
  ...restProps
}: {
  text: string | number | Float32Array | null;
}) => {
  return (
    <svg
      transform="translate(-14 -31)"
      width="140"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect
        x="6.3335"
        y="8.2328"
        width="2.53328"
        height="2.53328"
        rx="0.31666"
        transform="rotate(45 6.3335 8.2328)"
        fill="#022D45"
      />
      <rect width="12.6664" height="10.1331" rx="0.949979" fill="#022D45" />
      <text
        fill="white"
        xmlSpace="preserve"
        style={{ whiteSpace: 'pre' }}
        fontFamily="Helvetica"
        fontSize="3.79991"
        letterSpacing="0.126664px"
        fontWeight="bold"
      >
        <tspan x="2.7255" y="6.49126">
          {text}
        </tspan>
      </text>
    </svg>
  );
};

export default ToolTip;
