import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef } from 'react';

import useOnScreen from '../../hooks/useOnScreen';

const HashContainer = ({
  children,
  name,
  className,
  id,
  ...restProps
}: {
  children: ReactNode;
  name: string;
  id: string;
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
    // useEffect should include references to any values that might change so it knows when to update
  }, [asPath, isOnScreen, name, push]);

  return (
    <div className={className} ref={containerRef} id={id} {...restProps}>
      {children}
    </div>
  );
};

export default HashContainer;
