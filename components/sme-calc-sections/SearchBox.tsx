import { useTranslations } from 'use-intl';
import { useState, useEffect, useRef } from 'react';
import { Company } from '../../types/global';

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
  options?: Company[] | null;
  setOption?: (e: Company | null) => void;
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
  const t = useTranslations();
  const [selectedOption, setSelectedOption] = useState<Company | null>(null);
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

  // click outside handler
  // ref attached to element to control
  const listboxRef = useRef(null);
  // hook runs function when clicked outside of ref element - hides list
  useOutsideClick(listboxRef, () => {
    setShowList(false);
  });

  return (
    <div>
      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>

        <input
          disabled={disabled}
          type="text"
          name="email"
          id="email"
          className="focus:ring-highlight focus:border-highlight block w-full pl-10 text-sm border-primary rounded bg-bg"
          placeholder={`${placeholder}`}
          onChange={e => handleShowList(e)}
          value={value}
        />
        {options && options.length > 0 && (
          <label className="absolute right-5">{options?.length} results</label>
        )}
      </div>

      {showList && (
        <div ref={listboxRef}>
          <Listbox value={selectedOption} onChange={setSelectedOption}>
            {({ open }) => (
              <>
                {!open && options?.length !== 0 && (
                  <div className="border border-primary rounded px-6 py-2 cursor-pointer">
                    <Listbox.Options static>
                      {options &&
                        options?.map(option => (
                          <Listbox.Option
                            key={option.company_number}
                            value={option}
                          >
                            <li className="border-l-primary border-l flex justify-between my-4 pl-4 hover:bg-bg hover:text-highlight p-2">
                              <div>
                                <p className="font-semibold pb-1">
                                  {option.title}
                                </p>
                                <p>
                                  {t('id')}: {option.company_number}
                                </p>
                              </div>
                              <div className="text-right">
                                <p>
                                  {t('registered')}:{' '}
                                  <strong>{option.date_of_creation}</strong>
                                </p>
                                <p>{option.address_snippet}</p>
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
