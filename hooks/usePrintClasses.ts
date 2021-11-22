import Bowser from 'bowser';

const usePrintClasses = (classes: { [index: string]: any }) => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserName = browser.getBrowserName()?.toLowerCase();
  return browserName ? classes[browserName] : {};
};

export default usePrintClasses;
