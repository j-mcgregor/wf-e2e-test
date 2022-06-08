export const getClientRelativeDate = (date: Date | string | number): Date => {
  const clientDate = new Date(date);
  const clientOffset = clientDate.getTimezoneOffset();
  const clientOffsetMs = clientOffset * 60 * 1000;
  const clientTime = clientDate.getTime();
  const clientTimeMs = clientTime - clientOffsetMs;
  return new Date(clientTimeMs);
};

export const dateIsValid = (dateStr: string): boolean => {
  // Regex for YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Validate the string
  if (dateStr.match(regex) === null) {
    return false;
  }

  const date = new Date(dateStr);

  const timestamp = date.getTime();

  // Validate the Date
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  // eg const dateStr = '2022-01-02'
  // eg const d = new Date(dateStr)
  // d.toISOString() => 2022-01-02T00:00:00.000Z
  return date.toISOString().startsWith(dateStr);
};
