/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { FC, ReactNode } from 'react';
import { ToastAction } from '../../hooks/useToast';
import { RichTranslation } from '../../types/global';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

export const ToastLayout: FC<{
  children?: ReactNode;
  title: RichTranslation;
  description?: RichTranslation;
}> = ({ title, description, children }) => (
  <div className="flex flex-col items-start">
    <h6 className="font-bold text-black mb-0.5">{title}</h6>
    <p className="text-xs leading-normal ">{description}</p>
    {children && <div className="flex gap-x-2 mt-2">{children}</div>}
  </div>
);

export const ToastBody: FC<{
  title: RichTranslation;
  description?: RichTranslation;
  actions?: ToastAction[];
}> = ({ title, description, actions }) => {
  return (
    <ToastLayout title={title} description={description}>
      {actions?.map((a, i) => (
        <button
          className={`py-0.5 text-sm ${
            a.type === 'dismiss' ? 'text-slate-400 ' : 'text-orange-300'
          }`}
          onClick={() => a.action()}
          key={`toast-btn-${i}`}
        >
          {a.label}
        </button>
      ))}
    </ToastLayout>
  );
};
