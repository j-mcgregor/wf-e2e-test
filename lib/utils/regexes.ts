/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
// regex to validate email address
export const VALID_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const VALID_PASSWORD = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*!@$£%^&\(\)\{\}\[\]:;<>,.?\/~_+\-=|])[A-Za-z\d*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|]{8,32}$/
);

export const HAS_LOWERCASE = new RegExp(/(?=.*[a-z])/);

export const HAS_UPPERCASE = new RegExp(/(?=.*[A-Z])/);

export const HAS_NUMBER = new RegExp(/(?=.*\d)/);

export const HAS_SPECIAL_CHAR = new RegExp(
  /(?=.*[*!@$£%^&\(\)\{\}\[\]:;<>,.?\/~_+\-=|])/
);
