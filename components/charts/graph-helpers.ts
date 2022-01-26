import {
  GraphDataType,
  FinancialTrendCategories,
  FinancialGraphType
} from '../../types/charts';

export const numberLength = (num: number) => {
  return num.toFixed().replace('.', '').length;
};

export const getMaxValue = (largestValue: number, largestValueLength: number) =>
  largestValueLength > 8
    ? largestValue / 1000000
    : largestValueLength >= 4 && largestValueLength <= 8
    ? largestValue / 1000
    : largestValue;

export const getMinValue = (smallestValue: number) =>
  Math.min(
    numberLength(smallestValue) > 8
      ? smallestValue / 1000000
      : numberLength(smallestValue) >= 4 && numberLength(smallestValue) <= 8
      ? smallestValue / 1000
      : smallestValue
  );

export const getMaxGraphValue = (
  disabled: boolean | undefined,
  chartType: FinancialTrendCategories,
  maxValue: number
): number => {
  return disabled
    ? 1
    : chartType === 'percentage'
    ? 100
    : chartType === 'zscore'
    ? 1000
    : maxValue <= 0
    ? 0
    : maxValue * 1.2;
};

export const getMinGraphValue = (
  disabled: boolean | undefined,
  chartType: FinancialTrendCategories,
  minValue: number
) => (disabled ? 0 : chartType === 'percentage' ? 0 : minValue);

export const isGraphData = (graph: any): boolean => {
  return graph?.data.some((value: GraphDataType) => value.y !== 0);
};

export const getCompanyName = (graph: FinancialGraphType) => {
  return graph.name
    ?.toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const convertData = (
  graph: GraphDataType[],
  isValueMillions: boolean,
  isValueThousands: boolean
) => {
  return graph?.map((data: GraphDataType) => {
    return {
      x: data.x,
      y: isValueMillions
        ? data.y / 1000000
        : isValueThousands
        ? data.y / 1000
        : data.y
    };
  });
};

export const formatToolTip = (
  value: number,
  type?: string,
  isMillions?: boolean
) => {
  if (type === 'percentage') {
    return Number(value).toFixed(2).toLocaleString();
  } else if (type === 'ratio') {
    return Number(value).toFixed(2).toLocaleString();
  } else if (type === 'currency') {
    return isMillions
      ? Number(value * 1000000).toLocaleString()
      : Number(value * 1000).toLocaleString();
  } else if (type === 'days') {
    return value;
  }
  return value;
};
