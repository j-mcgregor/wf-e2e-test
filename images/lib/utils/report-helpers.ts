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
  const rotationPercentage = (260 / value) * 100;
  return 260 * rotationPercentage - 130;
};

export const calculatePoDRotation = (value: number) => {
  const rotationPercentage = 260 * value;
  return 130 - rotationPercentage;
};
export const calculateLGDRotation = (value: number) => {
  const rotationPercentage = 260 * value;
  return 130 - rotationPercentage;
};
