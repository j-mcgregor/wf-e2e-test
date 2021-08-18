import { CheckboxProps } from '../../types/input';

const CheckboxInput = ({
  label,
  inputId,
  inputName,
  inputType,
  isRequired,
  isChecked,
  onToggleChecked
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        id={inputId}
        name={inputName}
        type={inputType}
        required={isRequired}
        checked={isChecked}
        onChange={onToggleChecked}
        className="h-4 w-4 text-highlight focus:ring-highlight rounded"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
