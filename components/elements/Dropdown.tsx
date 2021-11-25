import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ReportSnippetType } from '../../types/global';

interface DropdownProps {
  options: ReportSnippetType[];
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
                {options.map(option => (
                  <Listbox.Option key={option.id} value={option.company_name}>
                    {option.company_name}
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
