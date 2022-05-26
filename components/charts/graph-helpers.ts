import {
  GraphDataType,
  FinancialTrendCategories,
  FinancialGraphType
} from '../../types/charts';

export const getNumberLength = (num: number) => {
  return Math.abs(num).toFixed().replace('.', '').length;
};

export const calculateMaxDataPoint = (
  largestValue: number,
  largestNumberLength: number
) => {
  return largestNumberLength > 8
    ? largestValue / 1000000
    : largestNumberLength > 4 && largestNumberLength <= 8
    ? largestValue / 1000
    : largestValue;
};

export const calculateMinDataPoint = (
  smallestValue: number,
  largestNumberLength: number,
  log = false
) => {
  if (largestNumberLength > 8) {
    return smallestValue / 1000000;
  } else if (largestNumberLength > 4 && largestNumberLength <= 8) {
    return smallestValue / 1000;
  } else {
    return smallestValue;
  }
};

export const getMaxRenderValue = (
  disabled: boolean | undefined,
  chartType: FinancialTrendCategories,
  maxDataValue: number
): number => {
  const percentageIncreased =
    maxDataValue * 0.1 > 5 && maxDataValue < 100
      ? maxDataValue * 1.1
      : maxDataValue + 5;

  return disabled
    ? 1
    : chartType === 'percentage'
    ? percentageIncreased
    : chartType === 'zscore'
    ? 1000
    : maxDataValue <= 0
    ? 0
    : maxDataValue;
};

export const getMinRenderValue = (
  disabled: boolean | undefined,
  chartType: FinancialTrendCategories,
  minDataValue: number
) => (disabled ? 0 : minDataValue);

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
  isMillions?: boolean,
  isThousands?: boolean,
  header?: string
) => {
  if (type === 'percentage') {
    return Number(value).toFixed(2).toLocaleString();
  } else if (type === 'ratio') {
    return Number(value).toFixed(2).toLocaleString();
  } else if (type === 'currency') {
    if (isMillions) return Number(value * 1000000).toLocaleString();
    if (isThousands) return Number(value * 1000).toLocaleString();
    return Number(value).toLocaleString();
  } else if (type === 'days') {
    return value;
  }
  return value;
};
