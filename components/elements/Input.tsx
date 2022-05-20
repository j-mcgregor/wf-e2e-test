import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

type BaseInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface InputProps extends BaseInputProps {
  name: string;
  type?: string;
  placeholder?: string | undefined;
  label?: React.ReactNode;
  labelClassName?: string;
  className?: string;
  onFocusClassName?: string;
  onErrorClassName?: string;
  isError?: boolean;
  select?: boolean;
  options?: { optionValue: string; optionName: string }[];
  showEye?: boolean | { isOpen: boolean };
}

const defaultFocusClasses = 'focus:ring-highlight focus:border-highlight';
const defaultErrorClasses = 'focus:ring-red-400 focus:border-red-400';
const defaultClasses =
  'appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black relative';
const defaultLabelClasses = 'block text-sm font-medium';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      className = defaultClasses,
      onFocusClassName = defaultFocusClasses,
      onErrorClassName = defaultErrorClasses,
      isError,
      labelClassName = defaultLabelClasses,
      showEye,
      ...props
    }: InputProps,
    ref
  ) => {
    const eyeOpenByDefault = typeof showEye === 'object' && showEye.isOpen;

    const [showPassword, setShowPassword] = useState(eyeOpenByDefault);

    const inputType = showEye ? (showPassword ? 'text' : 'password') : type;

    return (
      <>
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            name={name}
            id={name}
            placeholder={placeholder}
            className={`${
              isError ? onErrorClassName : onFocusClassName
            } ${className} ${showEye && 'pr-9'}`}
            {...props}
          />
          {showEye && (
            <div className="absolute inset-y-0 right-0 h-full pr-3 flex items-center text-sm leading-5">
              {showPassword ? (
                <EyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-5 w-5 cursor-pointer fill-black"
                />
              ) : (
                <EyeOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-5 w-5 cursor-pointer fill-black"
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
