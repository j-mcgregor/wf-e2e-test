export interface InputProps {
  label: React.ReactNode;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: any) => void;
}

const TextInput = ({
  label,
  id,
  name,
  type,
  autoComplete,
  required,
  value,
  onChange
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
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none placeholder-gray-400 focus:ring-highlight focus:border-highlight sm:text-sm text-black"
        />
      </div>
    </div>
  );
};

export default TextInput;
