import React from 'react';

type BaseSelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface SelectProps extends BaseSelectProps {
  name: string;
  key?: string | number;
  placeholder?: string | undefined;
  label?: React.ReactNode;
  labelClassName?: string;
  className?: string;
  onFocusClassName?: string;
  onErrorClassName?: string;
  isError?: boolean;
  options: { optionValue: string; optionName?: string }[];
}

const defaultFocusClasses = 'focus:ring-highlight focus:border-highlight';
const defaultErrorClasses = 'focus:ring-red-400 focus:border-red-400';
const defaultClasses =
  'appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black';
const defaultLabelClasses = 'block text-sm font-medium';

const Input = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      name,
      placeholder,
      className = defaultClasses,
      onFocusClassName = defaultFocusClasses,
      onErrorClassName = defaultErrorClasses,
      isError,
      labelClassName = defaultLabelClasses,
      ...props
    }: SelectProps,
    ref
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        {/* eslint-disable-next-line sonarjs/no-identical-expressions */}
        {props.children && props.children}
        <select
          ref={ref}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`${
            isError ? onErrorClassName : onFocusClassName
          } ${className}`}
          {...props}
        >
          {options &&
            options.map(({ optionValue, optionName }) => {
              return (
                <option key={optionValue} value={optionValue}>
                  {optionName ? optionName : optionValue}
                </option>
              );
            })}
        </select>
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
