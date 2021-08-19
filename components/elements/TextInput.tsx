import { useForm } from 'react-hook-form';

interface InputProps {
  label: React.ReactNode;
  placeholder: string;
  name: string;
  type: string;
  customCSS: string;
  require: boolean;
  onChange?: (e: any) => void;
}

const TextInput = ({
  label,
  name,
  type,
  placeholder,
  customCSS,
  require,
  onChange
}: InputProps) => {
  {
  }

  const {
    register,
    formState: { errors }
  } = useForm();

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        {...register(name, { required: require })}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`${customCSS} appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-400 sm:text-sm text-black`}
      />
    </div>
  );
};

export default TextInput;
