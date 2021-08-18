import { ReactNode } from 'react';

export interface InputProps {
  label: ReactNode;
  inputId: string;
  inputName: string;
  inputType: string;
  autoComplete?: string;
  isRequired?: boolean;
  className?: string;
  value?: string;
  onChangeValue?: (e: any) => void;
}

export interface CheckboxProps {
  label: ReactNode;
  inputId: string;
  inputName: string;
  inputType: string;
  isRequired?: boolean;
  isChecked?: boolean;
  onToggleChecked?: () => void;
}
