import { TranslateInput } from "../../types/global";


type ErrorMessageProps = {
  text: TranslateInput
  className?: string
}

const ErrorMessage = ({text, className}: ErrorMessageProps) => {
  return <p className={`text-sm text-red-400 ${className}`}>{text}</p>;
};

export default ErrorMessage;
