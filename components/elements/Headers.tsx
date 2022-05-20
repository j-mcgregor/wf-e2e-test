import { ReactNode } from 'react';
import classnames from 'classnames';
import { TranslateInput } from '../../types/global';

interface ReportSectionHeaderProps {
  hint?: ReactNode;
  children?: ReactNode;
  text?: TranslateInput;
  onNewPageForPrint?: boolean;
}

export const ReportSectionHeader = ({
  children,
  text,
  hint,
  onNewPageForPrint = true
}: ReportSectionHeaderProps) => {
  return (
    <h2
      className={classnames('text-3xl py-8 text-primary', {
        'always-break-before': onNewPageForPrint,
        'flex items-center': hint
      })}
    >
      {text || children}
      {hint && <span className="ml-2">{hint}</span>}
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
