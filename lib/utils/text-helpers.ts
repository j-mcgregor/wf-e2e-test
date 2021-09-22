export const camelCaseToSentenceCase = (str: string): string => {
  return str && str.replace(/([a-z])([A-Z])/g, '$1 $2');
};
