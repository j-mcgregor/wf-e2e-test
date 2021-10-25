import { useTranslations } from 'use-intl';
import { useState, useEffect, useRef } from 'react';
import { CompanyType } from '../../types/global';
import { SearchIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';
import useOutsideClick from '../../hooks/useOutsideClick';

interface SearchBoxProps {
  disabled?: boolean;
  required?: boolean;
  placeholder: TranslateInput;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  resetValue?: () => void;
  options?: CompanyType[] | null;
  setOption?: (e: CompanyType | null) => void;
}

const SearchBox = ({
  placeholder,
  onChange,
  value,
  resetValue,
  disabled,
  required,
  options,
  setOption
}: SearchBoxProps) => {
  const t = useTranslations();
  const [selectedOption, setSelectedOption] = useState<CompanyType | null>(
    null
  );
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
        <div ref={listboxRef} className="relative">
          {options && options.length > 0 && (
            <ul className="px-4 border border-primary rounded overflow-scroll h-[50vh]">
              {options.map(option => {
                return (
                  <button
                    key={option.company_number}
                    className="flex justify-between pl-4 border-l border-primary my-4 hover:bg-bg hover:text-highlight p-2 cursor-pointer"
                    onClick={() => setSelectedOption(option)}
                  >
                    <div>
                      <p className="font-semibold pb-1">{option.title}</p>
                      <p>
                        {t('id')}: {option.company_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>
                        {t('registered')}:
                        <strong>{option.date_of_creation}</strong>
                      </p>
                      <p>{option.address_snippet}</p>
                    </div>
                  </button>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
