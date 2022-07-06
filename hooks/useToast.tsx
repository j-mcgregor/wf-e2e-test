/* eslint-disable sonarjs/prefer-immediate-return */
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon
} from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import { ToastBody } from '../components/toast/Toast';
import {
  SourceErrors,
  SourceTypes,
  ToastData
} from '../lib/errors/error-messages';
import { getToastType } from '../lib/utils/toast-helpers';
import defaultErrorsJSON from '../messages/en/errors-default.en.json';
import toastsJSON from '../messages/en/toasts.en.json';
import { RichTranslation } from '../types/global';

export interface ToastStyle {
  progressClassName: string;
  icon: JSX.Element;
}

export interface ToastAction {
  label: string;
  action: Function;
  type?: 'dismiss';
}

export const defaultErrors: Record<string, ToastData> = defaultErrorsJSON;

export const toastMessages: SourceErrors = toastsJSON;

export interface TriggerToast {
  toastId?: string;
  actions?: ToastAction[];
  dismiss?: 'corner' | 'button';
  toastType?: ToastOptions['type'];
  title: RichTranslation;
  description?: RichTranslation;
  status?: number;
  closeButton?: boolean;
  autoClose?: ToastOptions['autoClose'];
}

export const useToast = (defaultToastOptions?: ToastOptions) => {
  const t = useTranslations();
  const DEFAULT_AUTO_CLOSE = 4000; // 4s auto close

  const defaultToastProps: ToastOptions = {
    closeOnClick: false,
    draggable: true,
    bodyClassName: 'flex !items-start text-sm',
    ...defaultToastOptions
  };

  const formatRichToastText = (children: ReactNode) => {
    return children?.toString().toLowerCase().replace(/_/g, ' ');
  };

  const getToastTextFromResponse = ({
    sourceType,
    code,
    status
  }: {
    code: string;
    sourceType: SourceTypes;
    status: number;
  }) => {
    // check if custom [sourceType][code] exists
    if (toastMessages[sourceType][code]) {
      const tTitle = t(`${sourceType}.${code}.title`);
      const tDescription = t(`${sourceType}.${code}.description`);

      return {
        title: tTitle,
        description: tDescription
      };
    }

    // else use default with passing in the sourceType
    if (defaultErrors[status]) {
      const tTitle = t.rich(`${status}.title`, {
        span: children => {
          return <span>{formatRichToastText(children)}</span>;
        },
        sourceType
      });

      const tDescription = t.rich(`${status}.description`, {
        span: children => {
          return (
            <span className="capitalize">{formatRichToastText(children)}</span>
          );
        },
        code
      });

      return {
        title: tTitle,
        description: tDescription
      };
    }

    return null;
  };

  const toastStyle: Record<string, ToastStyle> = {
    success: {
      progressClassName: 'bg-green-600',
      icon: <CheckCircleIcon className="!text-green-600" />
    },
    error: {
      progressClassName: 'bg-red-600',
      icon: <ExclamationCircleIcon className="!text-red-600" />
    },
    info: {
      progressClassName: 'bg-blue-600',
      icon: <InformationCircleIcon className="!text-blue-600" />
    },
    warning: {
      progressClassName: 'bg-yellow-600',
      icon: <ExclamationIcon className="!text-yellow-600" />
    },
    default: {
      progressClassName: '',
      icon: <BellIcon />
    }
  };

  const triggerToast = ({
    toastId,
    actions,
    dismiss,
    toastType,
    title,
    description,
    status,
    closeButton,
    autoClose = DEFAULT_AUTO_CLOSE
  }: TriggerToast) => {
    const dismissBtn: ToastAction = {
      label: 'Dismiss',
      action: () => toast.dismiss(toastId),
      type: 'dismiss'
    };

    const newActions =
      actions?.length && dismiss === 'button' ? [...actions, dismissBtn] : null;

    const type = toastType || getToastType(status);

    const { icon, progressClassName } = toastStyle[type || 'default'];

    return toast(
      <ToastBody
        title={title}
        description={description}
        actions={newActions || actions}
      />,
      {
        ...defaultToastProps,
        toastId,
        closeButton: closeButton || dismiss !== 'button',
        autoClose,
        type: toastType || type,
        icon,
        progressClassName
      }
    );
  };

  /**
   * Custom handling for <LinkCard/> that download files.
   * Instead of using a link + download we can add a custom anchor
   * on the fly and trigger a toast notification afterwards, which
   * you can't do with a regular download
   */

  const handleDownload = ({
    href,
    toastId,
    title,
    description
  }: {
    href: string;
    toastId: string;
    title: RichTranslation;
    description: RichTranslation;
  }) => {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.download = href.substring(href.lastIndexOf('/') + 1);
    link.click();

    triggerToast({
      toastId,
      status: 200,
      title,
      description
    });
  };

  return { triggerToast, getToastTextFromResponse, handleDownload };
};
