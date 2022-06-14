/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import {
  CheckIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  BellIcon
} from '@heroicons/react/outline';
import { FC, ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

export interface ToastObject {
  type: ToastType;
  message: string | ReactNode;
}

export const options: ToastOptions = {
  onOpen: (props: any) => console.log(props.foo),
  onClose: (props: any) => console.log(props.foo),
  autoClose: 6000,
  //   closeButton: () => {},
  type: toast.TYPE.INFO,
  hideProgressBar: false,
  position: toast.POSITION.TOP_LEFT,
  pauseOnHover: true,
  //   transition: MyCustomTransition,
  progress: 0.2
  // and so on ...
};

export const displayIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <CheckIcon />;
    case 'info':
      return <InformationCircleIcon />;
    case 'error':
      return <ExclamationCircleIcon />;
    case 'warning':
      return <ExclamationIcon />;
    default:
      return <BellIcon />;
  }
};
interface ToastAction {
  label: string;
  action: Function;
}

export const ToastBody: FC<{
  title: string;
  description?: string;
  actions?: ToastAction[];
}> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="font-bold">{title}</div>
      <div>{description}</div>
      <div className="flex gap-x-2">
        {actions?.map((a, i) => (
          <button
            className="text-orange-300 py-0.5"
            onClick={() => a.action()}
            key={`toast-btn-${i}`}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};

interface TriggerToast {
  toastId: string;
  actions?: ToastAction[];
  errorCode?: string;
  dismiss?: 'corner' | 'button';
  toastType?: ToastOptions['type'];
  title: string;
  description?: string;
}

export const triggerToast = ({
  toastId,
  actions,
  errorCode,
  dismiss,
  toastType = 'default',
  title,
  description
}: TriggerToast) => {
  const DEFAULT_AUTO_CLOSE = 4000; // 4s auto close
  const dismissBtn = {
    label: 'Dismiss',
    action: () => toast.dismiss(errorCode)
  };

  const newActions =
    actions?.length && dismiss === 'button' ? [...actions, dismissBtn] : null;

  return toast(
    <ToastBody
      title={title}
      description={description}
      actions={newActions || actions}
    />,
    {
      toastId,
      bodyClassName: 'flex !items-start text-sm',
      closeButton: false,
      autoClose: dismiss === 'corner' ? DEFAULT_AUTO_CLOSE : false,
      type: toastType
    }
  );
};
