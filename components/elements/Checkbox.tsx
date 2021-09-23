import React from 'react';

interface CheckboxProps {
  label?: React.ReactNode | string;
  id: string;
  name: string;
  paragraph?: string | React.ReactNode;
  className?: {
    inputClassName?: string;
    labelClassName?: string;
    pClassName?: string;
  };
}

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      id,
      paragraph,
      name,
      className: {
        inputClassName = 'h-4 w-4 text-highlight focus:ring-highlight rounded cursor-pointer',
        labelClassName = 'ml-2 block text-sm',
        pClassName = 'ml-2 text-gray-500'
      } = {},
      ...restProps
    }: CheckboxProps,
    ref
  ) => {
    return (
      <div className={'flex items-start'}>
        <input
          id={id}
          ref={ref}
          name={name}
          type="checkbox"
          className={inputClassName}
          {...restProps}
        />

        {paragraph ? (
          <div className="text-sm flex flex-col">
            <label htmlFor={name} className={labelClassName}>
              {label}
            </label>
            <p className={pClassName}>{paragraph}</p>
          </div>
        ) : (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;
