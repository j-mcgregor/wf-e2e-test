import { useState, useEffect } from 'react';

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

// Hook to get window size (width and height)
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Hook to get window width only

export const useWindowWidth = (): number | undefined => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResizeWidth = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResizeWidth);

    handleResizeWidth();

    return (): void => {
      window.removeEventListener('resize', handleResizeWidth);
    };
  }, []);

  return windowWidth;
};

// Hook to get window height only
export const useWindowHeight = (): number | undefined => {
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const handleResizeHeight = (): void => {
      setWindowHeight(window.innerWidth);
    };

    window.addEventListener('resize', handleResizeHeight);

    handleResizeHeight();

    return (): void => {
      window.removeEventListener('resize', handleResizeHeight);
    };
  }, []);

  return windowHeight;
};
