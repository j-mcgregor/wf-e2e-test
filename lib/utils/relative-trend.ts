const relativeTrend = (data: number[]) => {

  const largestValue = data.reduce((prevValue, value) => {
    return prevValue > value ? prevValue : value;
  }, 0);
  const smallestValue = data.reduce((prevValue, value) => {
    return prevValue < value ? prevValue : value;
  }, 0);

  const diffBetweenSmallAndLarge = largestValue - smallestValue;
  
  return data.map(value => {
    const valueSubtractLowestValue =
      smallestValue >= 0 ? value - smallestValue : value + smallestValue;

    const minValueDivideDiffValue =
      valueSubtractLowestValue / diffBetweenSmallAndLarge || 0;

    return minValueDivideDiffValue * 100;
  });
};

export default relativeTrend;
