import { ReactNode } from 'react';
import { TranslateInput } from '../../types/global';
import { Element } from 'react-scroll';

export const ReportSectionHeader = ({
  children,
  text
}: {
  children?: ReactNode;
  text?: TranslateInput;
}) => {
  return <h2 className="text-3xl py-8 text-primary">{text || children}</h2>;
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
