interface CheckboxProps {
  label: React.ReactNode;
  id: string;
  name: string;
  type: string;
  required?: boolean;
  checked?: boolean;
  onChange?: () => void;
}


const CheckboxInput = ({
  label,
  id,
  name,
  type,
  required,
  checked,
  onChange
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-highlight focus:ring-highlight rounded"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm">
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
