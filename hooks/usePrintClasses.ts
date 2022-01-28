import Bowser from 'bowser';
import React from 'react';

const usePrintClasses = (classes: { [index: string]: any }) => {
  const [browserName, setBrowserName] = React.useState('chrome');
  React.useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setBrowserName(browser.getBrowserName()?.toLowerCase());
  }, []);
  const hasClasses = browserName && classes[browserName];
  return hasClasses ? classes[browserName] : {};
};

export default usePrintClasses;
