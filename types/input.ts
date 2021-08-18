import { ReactNode } from 'react';

export interface InputProps {
  label: ReactNode;
  inputId: string;
  inputName: string;
  inputType: string;
  autoComplete?: string;
  isRequired?: boolean;
  className?: string;
}
