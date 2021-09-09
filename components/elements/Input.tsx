import React from 'react';

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
}

const defaultFocusClasses = 'focus:ring-highlight focus:border-highlight';
const defaultErrorClasses = 'focus:ring-red-400 focus:border-red-400';
const defaultClasses =
  'appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black';
const defaultLabelClasses = 'block text-sm font-medium';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      className = defaultClasses,
      onFocusClassName = defaultFocusClasses,
      onErrorClassName = defaultErrorClasses,
      isError,
      labelClassName = defaultLabelClasses,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`${
            isError ? onErrorClassName : onFocusClassName
          } ${className}`}
          {...props}
        />
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
