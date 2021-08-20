import { TranslateInput } from "../../types/global";


type ErrorMessage = {
  text: TranslateInput
  className?: string
}

const ErrorMessage = ({text, className}: ErrorMessage) => {
  return <p className={`text-sm text-red-400 ${className}`}>{text}</p>;
};

export default ErrorMessage;
