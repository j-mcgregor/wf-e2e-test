import React from 'react';

interface LoadingIconProps {
  className?: string;
  stroke?: string;
}

const LoadingIcon = ({
  className = 'h-6 w-6 text-highlight',
  stroke = 'black'
}: LoadingIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      className={`animate-spin ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1"
        stroke={'currentColor'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default LoadingIcon;
