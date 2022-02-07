import Bowser from 'bowser';
import React from 'react';

const usePrintClasses = (classes: { [index: string]: any }) => {
  const awaitWindow = typeof window !== 'undefined' ? window : ({} as any);
  const browser = Bowser.getParser(
    awaitWindow?.navigator?.userAgent || 'Chrome'
  );
  const browserName = browser.getBrowserName()?.toLowerCase();
  const hasClasses = browserName && classes[browserName];
  return hasClasses ? classes[browserName] : {};
};

export default usePrintClasses;
