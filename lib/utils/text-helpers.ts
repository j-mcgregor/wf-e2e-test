import { getClientRelativeDate } from './date-helpers';
const isString = (str: any): str is string => typeof str === 'string';

export const camelCaseToSentenceCase = (str: string): string => {
  return (isString(str) && str.replace(/([a-z])([A-Z])/g, '$1 $2')) || '';
};

export const addHttps = (str: string): string => {
  return /https?/.test(str) ? str : `http://${str}`;
};
export const getDomain = (str: string): string | false | undefined => {
  // eslint-disable-next-line security/detect-unsafe-regex
  return (
    str &&
    /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/gi.exec(str)?.[1]
  );
};

export const toTitleCase = (str: string): string => {
  return isString(str)
    ? str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
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

export const createReportTitle = (companyName: string, createdAt: string) => {
  const clientDate = getClientRelativeDate(createdAt);

  const date = new Date(clientDate);
  // this will break in the year 2100
  const year = date?.getFullYear()?.toString()?.replace('20', '');
  // comes back as index so need to add one
  const month = date?.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : month;
  const day = date?.getDate();
  const dayString = day < 10 ? `0${day}` : day;
  const hours = date?.getHours();
  const hoursString = hours < 10 ? `0${hours}` : hours;
  const mins = date?.getMinutes();
  const minsString = mins < 10 ? `0${mins}` : mins || '';

  const dateString = `${dayString}-${monthString}-${year}-${hoursString}:${minsString}`;
  return `${companyName}-${dateString}`;
};

export const convertNumberToPercentage = (num: number) =>
  `${Number(num * 100).toFixed(1)}%`;
