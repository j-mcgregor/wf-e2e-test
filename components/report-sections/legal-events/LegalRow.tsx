import { TranslateInput } from '../../../types/global';
import { LegalEvent } from '../../../types/report';
import InfoIcons from '../../icons/InfoIcon';
import { useState } from 'react';

interface LegalRowProps {
  type?: TranslateInput; // for 'Type' header only
  description?: TranslateInput;
  date?: TranslateInput;
  handleDropdown?: () => void;
  dropdown?: boolean;
  data?: LegalEvent;
}

const LegalRow = ({ type, data, description, date }: LegalRowProps) => {
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
        <div className="flex w-full">
          <p>{data?.description || description}</p>
        </div>
        <div className="flex w-full">
          <p>{data?.types.join(', ') || type}</p>
        </div>
        <div className="flex w-1/3">
          <p>{data?.date || date}</p>
        </div>
        {!type && (
          <div onClick={handleDropdown} className="text-black cursor-pointer">
            <InfoIcons />
          </div>
        )}
      </div>
      {!type && dropdown && <div className="bg-red-400 h-52 w-full"></div>}
    </div>
  );
};

export default LegalRow;
