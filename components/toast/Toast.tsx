/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { FC } from 'react';
import { ToastAction } from '../../hooks/useToast';
import { RichTranslation } from '../../types/global';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

export const ToastBody: FC<{
  title: RichTranslation;
  description?: RichTranslation;
  actions?: ToastAction[];
}> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="font-bold">{title}</div>
      <div>{description}</div>
      <div className="flex gap-x-2">
        {actions?.map((a, i) => (
          <button
            className={`py-0.5 ${
              a.type === 'dismiss' ? 'text-slate-400 ' : 'text-orange-300'
            }`}
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
