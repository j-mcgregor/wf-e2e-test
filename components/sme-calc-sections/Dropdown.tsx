import { useState, Fragment } from 'react';
import { Listbox } from '@headlessui/react';

interface DropdownProps {
  options: string[];
}
const Dropdown = ({ options }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <Listbox.Button>{selectedOption}</Listbox.Button>
          {!open && (
            <div>
              <Listbox.Options static>
                {options.map((option, i) => (
                  <Listbox.Option key={i} value={option}>
                    {option}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </>
      )}
    </Listbox>
  );
};

export default Dropdown;
