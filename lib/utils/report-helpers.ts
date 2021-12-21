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
  // PD angle = LOG10(PD) * -1.0
  const rotationPercentage = (1.0 - Math.log10(value) * -1.0) * 260;

  // handle 0 values
  if (value === 0) {
    return 130;
  }
  return rotationPercentage - 100;
};
export const calculateLGDRotation = (value: number) => {
  // LGD angle = 1.0 – LGD
  const rotationPercentage = (1.0 - value) * 260;
  // halved for the 130deg
  return rotationPercentage - 130;
};
