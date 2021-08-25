import { ReactNode } from 'react';
import Link from './Link';
import LoadingIcon from '../svgs/LoadingIcon';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'highlight' | 'alt' | 'none';
  children: ReactNode;
  loading?: boolean;
  className?: string;
  newClassName?: string;
  onClick?: () => void;
  linkTo?: string;
  type?: 'button' | 'submit' | 'reset';
}

const buttonClassName = {
  base: 'last:w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
  primary: 'bg-primary hover:bg-indigo-800 focus:ring-indigo-800 text-white ', // dark blue
  secondary: 'bg-secondary hover:bg-gray-800 focus:gray-800 text-white ', // black
  alt: 'bg-alt hover:bg-blue-800 focus:bg-blue-800 text-white', // lighter blue
  highlight:
    'bg-highlight hover:bg-yellow-500 focus:ring-yellow-500 text-white ', // orange
    none: '' 
};

const Button = ({
  className,
  newClassName,
  variant,
  loading,
  type,
  linkTo,
  children,
  onClick
}: ButtonProps) => {
  if (linkTo) {
    return (
      <Link
        linkTo={linkTo}
        className={
          newClassName
            ? newClassName
            : `${buttonClassName.base} ${buttonClassName[variant]} ${className}`
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={
        newClassName
          ? newClassName
          : `${buttonClassName.base} ${buttonClassName[variant]} ${className}`
      }
    >
      {loading && <LoadingIcon />}
      {!loading && children}
    </button>
  );
};

export default Button;
