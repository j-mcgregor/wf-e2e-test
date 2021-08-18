import { ReactNode } from 'react';

interface ButtonProps {
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode;
  backgroundColor: string;
  hoverColor?: string;
  focusColor?: string;
}

const Button = ({
  backgroundColor,
  hoverColor,
  focusColor,
  buttonType,
  children
}: ButtonProps) => {
  return (
    <button
      type={buttonType}
      className={`bg-${backgroundColor} hover:bg-${hoverColor} focus:ring-${focusColor} last:w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 `}
    >
      {children}
    </button>
  );
};

export default Button;
