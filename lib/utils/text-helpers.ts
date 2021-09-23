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
