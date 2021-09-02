import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef } from 'react';

import useOnScreen from '../../hooks/useOnScreen';

const HashContainer = ({
  children,
  name,
  className,
  ...restProps
}: {
  children: ReactNode;
  name: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { asPath, push } = useRouter();
  const isOnScreen = useOnScreen(containerRef);

  useEffect(() => {
    const path = `${asPath.replace(/#[\w+ -]+/, '')}#${name
      ?.toLowerCase()
      .replace(/ /g, '-')}`;
    if (isOnScreen) {
      push(path, path, { shallow: true });
    }
    //FIXME: linter suggested this, i don't see why, maybe have a look @sam
  }, [isOnScreen]);

  return (
    <div className={className} ref={containerRef} {...restProps}>
      {children}
    </div>
  );
};

export default HashContainer;
