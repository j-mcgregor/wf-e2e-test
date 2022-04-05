const relativeTrend = (data: number[]) => {
  const largestValue = data.reduce((prevValue, value) => {
    return prevValue > value ? prevValue : value;
  }, 0);
  const smallestValue = data.reduce((prevValue, value) => {
    return prevValue < value ? prevValue : value;
  }, 0);

  const diffBetweenSmallAndLarge = largestValue - smallestValue;

  return data.map(value => {
    if (value === 0) return 0;
    const valueSubtractLowestValue =
      smallestValue >= 0 ? value - smallestValue : value + smallestValue;

    const minValueDivideDiffValue =
      valueSubtractLowestValue / diffBetweenSmallAndLarge || 0;

    const relativeValue =
      value > 0
        ? Math.abs(minValueDivideDiffValue * 100)
        : Math.abs(minValueDivideDiffValue * 100) * -1;
    return relativeValue / 1.5;
  });
};

export default relativeTrend;
