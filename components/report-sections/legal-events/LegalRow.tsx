import { LegalEvent } from '../../../types/report';
import { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { negativeValues } from '../../../lib/settings/report.settings';

const LegalRow = ({ types, description, details, date }: LegalEvent) => {
  const textColor = types?.some(value => negativeValues.includes(value))
    ? 'text-red-500'
    : 'text-black';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);

  const splitCamelCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <div className={`${textColor} flex flex-col py-1.5`}>
      <div className="flex">
        <div className="w-full mr-1">
          <p>{description}</p>
        </div>
        <div className="w-full mr-1">
          <p>{types?.join(', ')}</p>
        </div>
        <div className="w-[230px] flex justify-between">
          <p>{date}</p>

          <button
            onClick={handleDropdown}
            className="text-black cursor-pointer"
          >
            {details && (
              <ChevronUpIcon
                className={`${
                  !dropdownOpen && 'rotate-180'
                } w-4 transform duration-300`}
              />
            )}
          </button>
        </div>
      </div>
      {details && dropdownOpen && (
        <div className="w-full my-2">
          {details.map(detail => {
            return (
              <div className="flex flex-wrap justify-between bg-bg rounded my-2 ">
                {Object.entries(detail).map(key => (
                  <div className="flex flex-col px-6 py-4">
                    <p className="py-1">{splitCamelCase(key[0])}</p>
                    <p
                      className={`${
                        key[1]?.length < 20 ? 'text-sm' : 'text-xs'
                      } font-semibold`}
                    >
                      {key[1] === null ? 'N/A' : splitCamelCase(key[1])}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LegalRow;
