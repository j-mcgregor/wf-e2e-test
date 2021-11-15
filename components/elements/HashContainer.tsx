import React, { useRef } from 'react';

interface HashContainerProps {
  name: string;
  id?: string;
  className?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

const HashContainer = ({
  children,
  name,
  className,
  id,
  fullHeight = true,
  ...restProps
}: HashContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`${
        fullHeight && 'min-h-screen'
      } sm:pt-10 lg:pt-0 ${className}`}
      ref={containerRef}
      id={id}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default HashContainer;
