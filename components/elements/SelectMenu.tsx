import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { TranslateInput } from '../../types/global';
import { SimpleValue } from '../sme-calc-sections/AdvancedSearch';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface SelectMenuProps {
  defaultValue?: TranslateInput | SimpleValue;
  values?: SimpleValue[];
  selectedValue?: SimpleValue;
  setSelectedValue: (value: SimpleValue) => void;
  disabled?: boolean;
}

const SelectMenu = ({
  values,
  selectedValue,
  setSelectedValue,
  defaultValue,
  disabled
}: SelectMenuProps) => {
  return (
    <Listbox
      value={selectedValue}
      onChange={setSelectedValue}
      disabled={disabled}
    >
      <div className={`mt-1 relative`}>
        <Listbox.Button
          className={`${
            disabled && 'border-opacity-20'
          } bg-bg relative w-full border border-primary rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-highlight focus:border-highlight sm:text-sm`}
        >
          <span className={`block truncate'`}>
            {selectedValue ? selectedValue.optionName : defaultValue}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className={`${disabled && 'opacity-20'} h-6 w-6 text-primary`}
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {values?.map(value => (
              <Listbox.Option
                key={value.optionValue}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-highlight' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9'
                  )
                }
                value={value}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={classNames(
                        selected ? 'font-semibold' : 'font-normal',
                        'block truncate'
                      )}
                    >
                      {value.optionName}
                    </span>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? 'text-white' : 'text-primary',
                          'absolute inset-y-0 right-0 flex items-center pr-4'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectMenu;
