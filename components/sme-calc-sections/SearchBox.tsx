import { useState, useEffect } from 'react';
import { Report } from '../../types/global';
import { SearchIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';
import { Listbox } from '@headlessui/react';
import ClickAway from '../elements/ClickAway';

interface SearchBoxProps {
  placeholder: TranslateInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  options?: Report[];
}

const SearchBox = ({
  placeholder,
  onChange,
  value,
  disabled,
  options
}: SearchBoxProps) => {
  const [selectedOption, setSelectedOption] = useState();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    showList && setShowList(!showList);
  }, [selectedOption]);

  const handleShowList = e => {
    onChange(e);
    !showList && setShowList(true);
  };

  return (
    <div>
      <p>{selectedOption}</p>
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
          onChange={e => handleShowList(e)}
          value={value}
        />
      </div>

      {showList && (
        // <ClickAway action={() => console.log('clicked outside')}>
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
                        {({ active, selected }) => (
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
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </>
          )}
        </Listbox>
        // </ClickAway>
      )}
    </div>
  );
};

export default SearchBox;
