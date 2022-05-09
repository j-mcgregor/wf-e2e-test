/* eslint-disable security/detect-unsafe-regex */
// regex to validate email address
export const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validPasswordRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@$%^&:;<>,.?/_\-+=|\[\]\{\}\(\)])[A-Za-z\d*.!@$%^&:;<>,.?/_\-+=|\[\]\{\}\(\)]{8,}$/
);
