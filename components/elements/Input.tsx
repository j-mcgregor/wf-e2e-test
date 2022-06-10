import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

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
  'appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black relative h-full';
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
        <div className="relative h-9 w-full">
          <input
            ref={ref}
            type={inputType}
            name={name}
            id={name}
            placeholder={placeholder}
            className={`${
              isError ? onErrorClassName : onFocusClassName
            } ${className} ${showEye && 'pr-9'} peer`}
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
          {type === 'number' && (
            <div className="absolute inset-y-0 top-2 right-0 h-full flex items-center text-sm border-r border-y border-gray-500 peer-focus:border-highlight rounded-r-md ">
              <div className="h-full overflow-hidden rounded-r">
                <button
                  type="button"
                  className="bg-gray-300 w-10 h-1/2 flex justify-center items-center hover:bg-highlight hover:text-white duration-150"
                >
                  <ChevronUpIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="bg-gray-300 w-10 h-1/2 flex justify-center items-center hover:bg-highlight hover:text-white duration-150"
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
