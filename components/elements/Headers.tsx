import { ReactNode } from 'react';
import cn from 'classnames';
import { TranslateInput } from '../../types/global';

export const ReportSectionHeader = ({
  children,
  text,
  onNewPageForPrint = true
}: {
  children?: ReactNode;
  text?: TranslateInput;
  onNewPageForPrint?: boolean;
}) => {
  return (
    <h2
      className={cn('text-3xl py-8 text-primary', {
        'always-break-before': onNewPageForPrint
      })}
    >
      {text || children}
    </h2>
  );
};
export const SettingsSectionHeader = ({
  children,
  text
}: {
  children?: ReactNode;
  text?: TranslateInput;
}) => {
  return (
    <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
      {text || children}
    </h3>
  );
};
