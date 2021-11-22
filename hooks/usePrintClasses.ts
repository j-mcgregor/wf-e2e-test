import Bowser from 'bowser';

const usePrintClasses = (classes: { [index: string]: any }) => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserName = browser.getBrowserName()?.toLowerCase();
  const hasClasses = browserName && classes[browserName];
  return hasClasses ? classes[browserName] : {};
};

export default usePrintClasses;
