import { SearchIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';

interface SearchBoxProps {
  placeholder: TranslateInput;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
}

const SearchBox = ({
  placeholder,
  onChange,
  value,
  disabled
}: SearchBoxProps) => {
  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <input
          disabled={disabled}
          type="text"
          name="email"
          id="email"
          className="focus:ring-highlight focus:border-highlight block w-full pl-10 sm:text-sm border-primary rounded bg-bg"
          placeholder={placeholder}
          onChange={e => onChange(e)}
          value={value}
        />
      </div>
    </div>
  );
};

export default SearchBox;
