import { InputProps } from '../../types/input';

const TextInput = ({
  label,
  inputId,
  inputName,
  inputType,
  autoComplete,
  isRequired
}: InputProps) => {
  {
  }
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={inputId}
          name={inputName}
          type={inputType}
          autoComplete={autoComplete}
          required={isRequired}
          className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none placeholder-gray-400 focus:ring-highlight focus:border-highlight sm:text-sm text-black"
        />
      </div>
    </div>
  );
};

export default TextInput;
