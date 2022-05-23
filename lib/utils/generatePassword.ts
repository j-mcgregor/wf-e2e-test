/* eslint-disable no-useless-escape */
const uppercaseOptions = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseOptions = 'abcdefghijklmnopqrstuvwxyz';
const numberOptions = '0123456789';
const symbolOptions = '*.!@$%^&(){}[]:;<>,.?/~_+-=|';
const minLength = 8;

const pickRandomChar = (options: string) => {
  const randomIndex = Math.floor(Math.random() * options?.length);
  return options?.charAt(randomIndex);
};

const getChar = (allOptions: string[], index: number) => {
  return pickRandomChar(allOptions[index]);
};

const allOptions = [
  uppercaseOptions,
  lowercaseOptions,
  numberOptions,
  symbolOptions
];

export const generatePassword = (length = 12) => {
  if (length < minLength) {
    throw new Error('Length must be greater than or equal to 8');
  }

  // list of required chars
  let unUsedOptions = [
    uppercaseOptions,
    lowercaseOptions,
    numberOptions,
    symbolOptions
  ];

  // create an empty array to map to a password
  const characterArray = Array.from(new Array(length)).map((x, i) => i);

  // map the array to a password
  const passwordArray = characterArray.map(x => {
    // determine what options to use
    const options = unUsedOptions.length === 0 ? allOptions : unUsedOptions;

    // get a random index of unused options
    const randomOptionIndex = Math.floor(Math.random() * options.length);

    // get a random char from the random option
    const char = getChar(options, randomOptionIndex);

    // remove the required option when its been used
    unUsedOptions = unUsedOptions.filter((x, i) => i !== randomOptionIndex);

    // return the char
    return char;
  });

  // return the password as a string
  return passwordArray.join('');
};
