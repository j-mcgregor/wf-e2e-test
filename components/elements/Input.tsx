import React, { MutableRefObject, useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import useCombinedRefs from '../../hooks/useCombinedRefs';

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
  max?: string | number;
  min?: string | number;
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
      max,
      min,
      ...props
    }: InputProps,
    ref
  ) => {
    const eyeOpenByDefault = typeof showEye === 'object' && showEye.isOpen;

    const [showPassword, setShowPassword] = useState(eyeOpenByDefault);

    const inputType = showEye
      ? showPassword
        ? 'text'
        : 'password'
      : type === 'number' // If the type is number, we need to use text in order to set a dash as zero
      ? 'text'
      : type;

    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs<HTMLInputElement>(innerRef, ref);

    const increment = () => {
      const newValue =
        combinedRef?.current?.value === '-'
          ? 1
          : Number(combinedRef?.current?.value) + 1;

      const isGreaterThanMax = typeof max !== 'undefined' && newValue > max;

      if (combinedRef?.current?.value) {
        if (newValue === 0 || (isGreaterThanMax && max === 0)) {
          combinedRef.current.value = '-';
        } else if (isGreaterThanMax) {
          combinedRef.current.value = max?.toString();
        } else {
          combinedRef.current.value = newValue.toString();
        }
      }
    };

    const decrement = () => {
      const newValue =
        combinedRef?.current?.value === '-'
          ? -1
          : Number(combinedRef?.current?.value) - 1;

      const isLessThanMin = typeof min !== 'undefined' && newValue < min;

      if (combinedRef?.current?.value) {
        if (newValue === 0 || (isLessThanMin && min === 0)) {
          combinedRef.current.value = '-';
        } else if (isLessThanMin) {
          combinedRef.current.value = min?.toString();
        } else {
          combinedRef.current.value = newValue.toString();
        }
      }
    };

    const setToDashIfEmptyOrZero = () => {
      if (
        type === 'number' &&
        (combinedRef?.current?.value === '' ||
          combinedRef?.current?.value === '0')
      ) {
        combinedRef.current.value = '-';
      }
    };

    useEffect(() => {
      // Set the value to dash if type is number and value is empty
      setToDashIfEmptyOrZero();
    }, [combinedRef?.current?.value]);

    return (
      <>
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        <div className="relative h-9 w-full">
          <input
            ref={combinedRef}
            type={inputType}
            name={name}
            id={name}
            placeholder={placeholder}
            onKeyPress={
              // We need to make sure only numbers can be entered if type is number
              type === 'number'
                ? event => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }
                : undefined
            }
            onChange={
              type === 'number' ? () => setToDashIfEmptyOrZero() : undefined
            }
            className={`${
              isError ? onErrorClassName : onFocusClassName
            } ${className} ${showEye && 'pr-9'} peer ${
              type === 'number' && 'pr-12'
            }`}
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
                  className="bg-gray-300 w-10 h-1/2 flex justify-center items-center hover:bg-highlight hover:text-white duration-150 disabled:opacity-75 disabled:hover:bg-gray-300 disabled:hover:text-secondary"
                  onClick={increment}
                  disabled={props.disabled}
                >
                  <ChevronUpIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="bg-gray-300 w-10 h-1/2 flex justify-center items-center hover:bg-highlight hover:text-white duration-150 disabled:opacity-75 disabled:hover:bg-gray-300 disabled:hover:text-secondary"
                  onClick={decrement}
                  disabled={props.disabled}
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
