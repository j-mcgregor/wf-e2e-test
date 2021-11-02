import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef } from 'react';

import useOnScreen from '../../hooks/useOnScreen';

interface HashContainerProps {
  name: string;
  id?: string;
  className?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

// plan
// header context stores all headers on screen in an array
// try to limit refresh amount
// remove container

const HashContainer = ({
  children,
  name,
  className,
  id,
  fullHeight = true,
  ...restProps
}: HashContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { asPath, push } = useRouter();
  const isOnScreen = useOnScreen(containerRef);

  // useEffect(() => {
  //   const path = `${asPath.replace(/#[\w+ -]+/, '')}#${name
  //     ?.toLowerCase()
  //     .replace(/ /g, '-')}`;
  //   if (isOnScreen) {
  //     push(path, path, { shallow: true });
  //   }

  //   //FIXME: linter suggested this, i don't see why, maybe have a look @sam
  //   // adding the other dependencies breaks the functionality, disabling line so I can pass the build

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isOnScreen]);

  return (
    <div
      className={`${fullHeight && 'min-h-screen'} pt-10 lg:pt-0 ${className}`}
      ref={containerRef}
      id={id}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default HashContainer;
