import { LegalEvent } from '../../../types/report';
import { useState } from 'react';
import ChevronDown from '../../icons/ChevronDown';
import ChevronUp from '../../icons/ChevronUp';
import { ChevronUpIcon } from '@heroicons/react/outline';


// add in the props separately 
// types, description, date, details 
const LegalRow = ({ types, description, details, date }: LegalEvent) => {
  // move to report.settings.
  const negativeValues = ['Negative Event', 'Legal Charge', 'Charge/mortgage'];
  
  // check types array for negative values and render red/black
  const textColor = types?.some(value => negativeValues.includes(value))
    ? 'text-red-500'
    : 'text-black';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // to use for info dropdown toggle
  const handleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className={`${textColor} flex flex-col py-1`}>
      <div className="flex">
        <div className="w-full">
          <p>{description}</p>
        </div>
        <div className="w-full">
          <p>{types?.join(', ')}</p>
        </div>
        <div className="w-1/3 flex justify-between">
          <p>{date}</p>
           {/* button here */}
        <div onClick={handleDropdown} className="text-black cursor-pointer">
          {/* Add in rotation on open and close */}
          {details && <ChevronUpIcon className={`${!dropdownOpen && 'rotate-180'} w-4 transform duration-300`} /> }
        </div>
        </div>

       
      </div>
      {dropdownOpen && (
        <div className="bg-red-400 h-52 w-full py-4">
          {/* <p>{data.details}</p> */}
        </div>
      )}
    </div>
  );
};

export default LegalRow;
