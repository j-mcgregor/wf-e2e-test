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

export const calculateSMEZScoreRotation = (value: number) => {
  // initial algo
  // Z-Score angle = min ( max(Z-Score – 100, 0.0 ) / 500, 1.0 )
  const max = value - 100 > 0.0 ? value - 100 : 0.0;
  const min = max / 500 > 1.0 ? 1.0 : max / 500;

  const rotationPercentage = min * 260;
  // halved for the 130deg
  return rotationPercentage - 130;
};

export const calculatePoDRotation = (value: number) => {
  // if value zero set to default
  if (value === 0) return 130;

  // PD RATION = 1 - LOG10(PD*100)/2
  // see tests for greater understanding of calculation with different results
  const pdRatio = (1 - Math.log10(value * 100)) / 2;

  // The result needs to be times by 260º and then subtract 130 to get the correct rotation value.
  const angle = pdRatio * 260 - 130;

  return angle;
};

export const calculateLGDRotation = (value: number) => {
  // LGD angle = 1.0 – LGD
  const rotationPercentage = (1.0 - value) * 260;
  // halved for the 130deg
  return rotationPercentage - 130;
};
