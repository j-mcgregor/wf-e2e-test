/* eslint-disable security/detect-object-injection */
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon
} from '@heroicons/react/outline';
import { ToastOptions } from 'react-toastify';

import toasts from '../../messages/en/toasts.en.json';

const mockToasts: Record<string, { title: string; description: string }> =
  toasts;

export const getToastType = (status?: number): ToastOptions['type'] => {
  if (!status || !mockToasts[`${status}`]) {
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

export interface ToastStyle {
  progressClassName: string;
  icon: JSX.Element;
}

export const getToastStyle = (type: ToastOptions['type']): ToastStyle => {
  switch (type) {
    case 'success':
      return {
        progressClassName: 'bg-green-600',
        icon: <CheckCircleIcon className="text-green-600" />
      };
    case 'info':
      return {
        progressClassName: 'bg-blue-600',
        icon: <InformationCircleIcon className="text-blue-600" />
      };
    case 'warning':
      return {
        progressClassName: 'bg-yellow-600',
        icon: <ExclamationIcon className="text-yellow-600" />
      };
    case 'error':
      return {
        progressClassName: 'bg-red-600',
        icon: <ExclamationCircleIcon className="text-red-600" />
      };
    default:
      return {
        icon: <BellIcon />,
        progressClassName: ''
      };
  }
};
