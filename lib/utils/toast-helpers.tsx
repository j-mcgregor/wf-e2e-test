/* eslint-disable security/detect-object-injection */
import { ToastOptions } from 'react-toastify';
import { defaultErrors } from '../../hooks/useToast';

export const getToastType = (status?: number): ToastOptions['type'] => {
  if (!status || !defaultErrors[`${status}`]) {
    return 'default';
  }

  // 1xx INFORMATIONAL RESPONSE
  if (status >= 100 && status < 200) {
    return 'info';
  }

  // 2xx OK
  if (status >= 200 && status < 300) {
    return 'success';
  }

  // 3xx redirection
  // ?

  // 4xx CLIENT ERRORS
  // 5xx SERVER ERRORS
  if (status >= 400 && status < 600) {
    return 'error';
  }

  return 'default';
};
