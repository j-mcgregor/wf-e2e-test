export const getClientRelativeDate = (date: Date | string | number): Date => {
  const clientDate = new Date(date);
  const clientOffset = clientDate.getTimezoneOffset();
  const clientOffsetMs = clientOffset * 60 * 1000;
  const clientTime = clientDate.getTime();
  const clientTimeMs = clientTime - clientOffsetMs;
  return new Date(clientTimeMs);
};
