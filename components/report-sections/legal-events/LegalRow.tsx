import { LegalEvent } from '../../../types/report';
import { useState } from 'react';
import ChevronDown from '../../icons/ChevronDown';
import ChevronUp from '../../icons/ChevronUp';

interface LegalRowProps {
  data: LegalEvent;
}

const LegalRow = ({ data }: LegalRowProps) => {
  const negativeValues = ['Negative Event', 'Legal Charge', 'Charge/mortgage'];
  // check types array for negative values and render red/black
  const textColor = data?.types.some(value => negativeValues.includes(value))
    ? 'text-red-500'
    : 'text-black';

  const [dropdown, setDropdown] = useState(false);

  // to use for info dropdown toggle
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className={`${textColor} flex flex-col py-1`}>
      <div className="flex">
        <div className="w-full">
          <p>{data?.description}</p>
        </div>
        <div className="w-full">
          <p>{data?.types.join(', ')}</p>
        </div>
        <div className="w-1/3">
          <p>{data?.date}</p>
        </div>

        <div onClick={handleDropdown} className="text-black cursor-pointer">
          {dropdown ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      {dropdown && (
        <div className="bg-red-400 h-52 w-full py-4">
          {/* <p>{data.details}</p> */}
        </div>
      )}
    </div>
  );
};

export default LegalRow;
