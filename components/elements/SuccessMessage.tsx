import { CheckIcon } from '@heroicons/react/outline';
import { TranslateInput } from '../../types/global';

type SuccessMessageProps = {
  text: TranslateInput;
  className?: string;
};

const SuccessMessage = ({ text, className }: SuccessMessageProps) => {
  return (
    <p className={`text-sm text-green-500 flex items-center ${className}`}>
      <CheckIcon className="text-green-500 w-6 h-6 mr-3 " />
      <span className="block ">{text}</span>
    </p>
  );
};

export default SuccessMessage;
