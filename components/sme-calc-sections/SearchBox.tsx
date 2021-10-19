import { useState, useEffect, useRef } from 'react';
import { Report } from '../../types/global';
import { SearchIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';
import { Listbox } from '@headlessui/react';

import useOutsideClick from '../../hooks/useOutsideClick';

interface SearchBoxProps {
  disabled?: boolean;
  placeholder: TranslateInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  resetValue?: () => void;
  options?: Report[];
  setOption?: (e: string | null) => void;
}

const SearchBox = ({
  placeholder,
  onChange,
  value,
  resetValue,
  disabled,
  options,
  setOption
}: SearchBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    showList && setShowList(!showList);
    setOption && setOption(selectedOption);
    resetValue && resetValue();
  }, [selectedOption]);

  const handleShowList = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    !showList && setShowList(true);
  };

  const listboxRef = useRef(null);

  useOutsideClick(listboxRef, () => {
    setShowList(false);
  });

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
          placeholder={`${placeholder}`}
          onChange={e => handleShowList(e)}
          value={value}
        />
      </div>

      {showList && (
        <div ref={listboxRef}>
          <Listbox value={selectedOption} onChange={setSelectedOption}>
            {({ open }) => (
              <>
                {!open && options?.length !== 0 && (
                  <div className="border border-primary rounded px-6 py-2 cursor-pointer">
                    <Listbox.Options static>
                      {options?.map(option => (
                        <Listbox.Option
                          key={option.id}
                          value={option.company_name}
                        >
                          <li className="border-l-primary border-l flex justify-between my-4 pl-4 hover:bg-bg hover:text-highlight p-2">
                            <div>
                              <p className="font-semibold pb-1">
                                {option.company_name}
                              </p>
                              <p>ID: 1212233434555621</p>
                            </div>
                            <div className="text-right">
                              <p>
                                Registered: <strong>12th June 1990</strong>
                              </p>
                              <p>123 Regent Street, London, England</p>
                            </div>
                          </li>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </>
            )}
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default SearchBox;