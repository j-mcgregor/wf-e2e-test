import React from 'react'

interface CheckboxProps {
  label?: React.ReactNode | string;
  id: string;
  name: string;
}


const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  id,
  name,
  ...restProps
}: CheckboxProps, ref) => {
  return (
    <>
      <input
        id={id}
        ref={ref}
        name={name}
        type="checkbox"
        className="h-4 w-4 text-highlight focus:ring-highlight rounded cursor-pointer"
        {...restProps}
      />
      <label htmlFor={name} className="ml-2 block text-sm">
        {label}
      </label>
    </>
  );
});


CheckboxInput.displayName = "CheckboxInput"

export default CheckboxInput;
