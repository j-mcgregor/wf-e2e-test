import { InputProps } from '../../types/input';

const CheckboxInput = ({
  label,
  inputId,
  inputName,
  inputType,
  isRequired
}: InputProps) => {
  return (
    <div className="flex items-center">
      <input
        id={inputId}
        name={inputName}
        type={inputType}
        className="h-4 w-4 text-highlight focus:ring-highlight rounded"
        required={isRequired}
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
