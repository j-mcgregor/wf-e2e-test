import React from 'react';
import { useTranslations } from 'use-intl';

type ApplicationErrorProps = {
  error?: {
    name?: string;
    message?: string | React.ReactNode;
  };
  showConsoleMessage?: boolean;
  width?: string;
};

export const ApplicationError = ({
  error,
  showConsoleMessage,
  width = 'max-w-sm'
}: ApplicationErrorProps) => {
  const t = useTranslations();
  return (
    <div>
      <div
        className={`${width} mx-auto px-4 py-6 border-2 text-red-400 border-red-400 rounded-md text-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-bold my-2">
          {!error?.name ? t('application_error') : error?.name}
        </h3>
        <p>
          {!error?.message
            ? t('application_error_general_message')
            : error?.message}{' '}
        </p>
        {showConsoleMessage && <p>{t('errors.see_console')}</p>}
      </div>
    </div>
  );
};
