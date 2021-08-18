import { ReactNode } from 'react';

interface InputProps {
  label: ReactNode;
  inputId: string;
  inputName: string;
  inputType: string;
  autoComplete?: string;
  isRequired?: boolean;
  className?: string;
}

export const TextInput = ({
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

export const CheckboxInput = ({
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
