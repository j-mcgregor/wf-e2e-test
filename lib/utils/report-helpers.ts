/* eslint-disable sonarjs/prefer-immediate-return */
// adds blank objects to the array to make it the same length as the other arrays
export const addBlankObjects = (array: any[], lengthRequired: number) => {
  const length = array.length;
  if (length < lengthRequired + 1) {
    const blankArrayLength = 5 - length;
    const blankArrayArray = Array(blankArrayLength).fill({});
    return [...array, ...blankArrayArray];
  }
  return array;
};

// extract for testing
export const calculateSMEZScoreMax = (x: number) => {
  let max: number;

  if (x >= 900) {
    max = Math.max(1.0, 0.9 + (x - 900) / 1000);
  } else if (x >= 700) {
    max = Math.max(0.9, 0.8 + (x - 700) / 2000);
  } else if (x >= 500) {
    max = Math.max(0.8, 0.7 + (x - 500) / 2000);
  } else if (x >= 400) {
    max = Math.max(0.7, 0.6 + (x - 400) / 1000);
  } else if (x >= 270) {
    max = Math.max(0.6, 0.5 + (x - 270) / 1300);
  } else if (x >= 100) {
    max = Math.max(0.5, 0.2 + (x - 100) / 1700);
  } else {
    max = Math.max(0.2, x / 500);
  }

  return max;
};

export const calculateSMEZScoreRotation = (value: number) => {
  const max = calculateSMEZScoreMax(value);

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = max * 260 - 130;

  return angle;
};

// extract to test
export const calculatePoDRatio = (x: number) => {
  let ratio: number;

  // x needs to be converted to a percentage
  const val = x * 100;

  if (val <= 10) {
    ratio = Math.min(0.2, val / 50);
  } else if (val <= 12) {
    ratio = Math.min(0.5, 0.2 + (0.3 * (val - 10)) / 2);
  } else if (val <= 50) {
    ratio = Math.min(0.9, 0.5 + (0.4 * (val - 12)) / 38);
  } else {
    ratio = Math.min(1.0, (0.1 * (val - 50)) / 50);
  }

  return ratio;
};

export const calculatePoDRotation = (value: number) => {
  // if value zero set to default
  if (value === 0) return 130;

  let ratio = calculatePoDRatio(value);

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = ratio * 260 - 130;

  return Number.parseFloat(angle.toFixed(4));
};

export const calculateLGDPercent = (x: number) => {
  let percent: number;

  // calculations performed on percentage
  const val = x * 100;

  if (val <= 20) {
    percent = Math.min(0.2, val / 100);
  } else if (val <= 40) {
    percent = Math.min(0.5, 0.2 + (0.3 * (val - 20)) / 20);
  } else if (val <= 90) {
    percent = Math.min(0.9, 0.5 + (0.4 * (val - 40)) / 50);
  } else {
    percent = Math.min(1.0, (0.1 * (val - 90)) / 10);
  }

  return percent;
};

export const calculateLGDRotation = (value: number) => {
  const percent = calculateLGDPercent(value);
  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = percent * 260 - 130;

  return angle;
};
