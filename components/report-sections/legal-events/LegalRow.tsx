import { TranslateInput } from '../../../types/global';

interface LegalRowProps {
  types?: string[];
  type?: TranslateInput; // for 'Type' header only
  description: TranslateInput;
  date: TranslateInput;
}

const LegalRow = ({ types, type, description, date }: LegalRowProps) => {
  return (
    <div className="flex py-1">
      <div className="flex w-full">
        <p>{description}</p>
      </div>
      <div className="flex w-full">
        <p>{types ? types.join(', ') : type}</p>
      </div>
      <div className="flex w-1/3">
        <p>{date}</p>
      </div>
    </div>
  );
};

export default LegalRow;
