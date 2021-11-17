export const camelCaseToSentenceCase = (str: string): string => {
  return str && str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const createCurrencyString = ({
  Symbol,
  Currency,
  CountryName
}: {
  Symbol: string;
  Currency: string;
  CountryName: string;
}) => {
  return `${CountryName} - ${Currency} (${Symbol})`;
};

export const convertNumberToPercentage = (num: number) =>
  `${Number(num) * 100}%`;
