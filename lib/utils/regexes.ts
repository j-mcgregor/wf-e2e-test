/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-unsafe-regex */
// regex to validate email address
export const VALID_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const VALID_PASSWORD = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*#!@$£%^&(){}[\]:;<>,.?\/~_+\-=|'"`])[A-Za-z\d*#!@$£%^&(){}[\]:;<>,.?\/~_+\-=|'"`]{8,32}$/
);

export const HAS_LOWERCASE = new RegExp(/(?=.*[a-z])/);

export const HAS_UPPERCASE = new RegExp(/(?=.*[A-Z])/);

export const HAS_NUMBER = new RegExp(/(?=.*\d)/);

export const HAS_SPECIAL_CHAR = new RegExp(
  /(?=.*[*#!@$£%^&(){}[\]:;<>,.?\/~_+\-=|'"`])/
);

export const VALID_WEBSITE =
  /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
