import { LegalEvent } from '../../../types/report';
import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { negativeValues } from '../../../lib/settings/report.settings';
import { camelCaseToSentenceCase } from '../../../lib/utils/text-helpers';

const LegalRow = ({
  types,
  description,
  details,
  date,
  forPrint
}: LegalEvent) => {
  const textColor = types?.some(value => negativeValues.includes(value))
    ? 'text-red-500'
    : 'text-black';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);

  // useEffect for opening dropdown's in print mode - disabled for now

  // useEffect(() => {
  //   forPrint && setDropdownOpen(true);
  // }, []);

  return (
    <div
      className={`${textColor} flex flex-col py-1.5 print:border-b print:always-break mb-2  `}
      data-testid="legal-row-testid "
    >
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
            {details && !forPrint && (
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
        <div className="w-full my-2 ">
          {details.map((detail, index) => {
            return (
              <div
                key={index}
                className="flex flex-wrap justify-between bg-bg rounded my-2 "
              >
                {Object.entries(detail).map(keyValueArray => {
                  const header = camelCaseToSentenceCase(keyValueArray[0]);
                  const description = keyValueArray[1]
                    ? camelCaseToSentenceCase(keyValueArray[1])
                    : 'N/A';
                  return (
                    <div
                      key={header}
                      className={`flex flex-col px-6 py-4 ${
                        description?.length > 30 ? 'w-full' : 'w-1/2'
                      } lg:w-auto`}
                    >
                      <p className="py-1">{header}</p>
                      <p className={`font-semibold print:text-sm`}>
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LegalRow;
