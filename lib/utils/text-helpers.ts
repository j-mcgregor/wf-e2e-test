/* eslint-disable security/detect-object-injection */
import { BoardMember } from '../../types/report';
import { getClientRelativeDate } from './date-helpers';
const isString = (str: any): str is string => typeof str === 'string';

export const camelCaseToSentenceCase = (str: string): string => {
  return (isString(str) && str.replace(/([a-z])([A-Z])/g, '$1 $2')) || '';
};

export const addHttps = (str: string): string => {
  return /https?/.test(str) ? str : `http://${str}`;
};
export const getDomain = (str: string): string | false | undefined => {
  return (
    str &&
    // eslint-disable-next-line security/detect-unsafe-regex
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
  currency_symbol,
  currency_code,
  name
}: {
  currency_symbol?: string;
  currency_code?: string;
  name: string;
}) => {
  return `${name} - ${currency_code} (${currency_symbol})`;
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

export type BoardRole = 'CEO' | 'CFO' | 'Chairman';

// function is in here because it was initially a class with various string and regex methods
// after refactoring its simpler but not sure if it belongs here. Can move it, just not sure where
export const getBoardMember = (
  role: BoardRole,
  board_members?: BoardMember[]
) => {
  if (!board_members) return '';

  const keywords: Record<BoardRole, RegExp[]> = {
    CEO: [/chief executive officer/gi, /ceo/gi],
    CFO: [/chief financial officer/gi, /cfo/gi],
    Chairman: [/chairman/gi]
  };

  return (
    board_members
      .filter(b => b.is_current)
      .find(b => {
        const isMatch = keywords[role]
          .map(keyword => (b.job_title.match(keyword) !== null ? b : null))
          .filter(Boolean);

        if (isMatch.length) {
          return isMatch[0];
        }
      })?.name || ''
  );
};

export const getDirectorsFromBoardMembers = (board_members?: BoardMember[]) => {
  if (!board_members) return null;

  return (
    board_members
      // remove duplicate names
      .filter((val, i, self) => {
        return i === self.findIndex(s => s.name === val.name);
      })
      .filter(b => (b.job_title.match(/director/gi) !== null ? b : null))
  );
};

export const getUniqueStringsFromArray = (arr?: string[]) =>
  arr ? [...new Set(arr)] : [];

export const convertToDateString = (date: string) => {
  const d = new Date(date);
  return Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(d);
};
