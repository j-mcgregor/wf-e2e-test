import { TranslateInput } from '../../types/global';

interface EmptyCardProps {
  text: TranslateInput;
  icon?: React.ReactElement;
}

const EmptyCard = ({ text, icon }: EmptyCardProps) => {
  return (
    <div className="w-[224px] h-[136px] bg-gray-200 rounded flex flex-col items-center justify-center font-semibold text-xs text-primary">
      <div>{icon}</div>
      <p className="pt-3">{text}</p>
    </div>
  );
};
export default EmptyCard;
