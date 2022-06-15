/* eslint-disable sonarjs/prefer-immediate-return */
import { toast, ToastOptions } from 'react-toastify';
import { ToastBody } from '../components/toast/Toast';
import { getToastType, getToastStyle } from '../lib/utils/toast-helpers';

export interface ToastAction {
  label: string;
  action: Function;
  type?: 'dismiss';
}

interface TriggerToast {
  toastId: string;
  actions?: ToastAction[];
  //   errorCode?: string;
  dismiss?: 'corner' | 'button';
  toastType?: ToastOptions['type'];
  title: string;
  description?: string;
  status?: number;
}

export const useToast = () => {
  const triggerToast = ({
    toastId,
    actions,
    dismiss,
    toastType,
    title,
    description,
    status
  }: TriggerToast) => {
    const DEFAULT_AUTO_CLOSE = 4000; // 4s auto close

    const dismissBtn: ToastAction = {
      label: 'Dismiss',
      action: () => toast.dismiss(toastId),
      type: 'dismiss'
    };

    const newActions =
      actions?.length && dismiss === 'button' ? [...actions, dismissBtn] : null;

    const type = getToastType(status);

    const { icon, progressClassName } = getToastStyle(type);

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
        type: toastType || type,
        icon,
        progressClassName
      }
    );
  };

  return { triggerToast };
};
