import { TranslateInput } from '../../../types/global';

interface ESGCardProps {
  result: TranslateInput;
  rating: string;
  resultText: TranslateInput;
  title: TranslateInput;
  description: TranslateInput;
}

const ESGCard = ({
  title,
  description,
  result,
  resultText,
  rating
}: ESGCardProps) => {
  return (
    <div
      className="flex bg-white rounded-sm shadow-sm my-4 px-8 py-8 items-center justify-between"
      style={{ breakInside: 'avoid' }}
      data-testid="esg-card-testid"
    >
      <div className="w-1/2">
        <p className="text-lg pb-4">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="text-center relative top-2">
        <div
          className={`${
            result === 'positive'
              ? 'bg-green-300'
              : result === 'negative'
              ? 'bg-red-300'
              : 'bg-bg'
          } w-40 px-10 py-6 rounded-lg uppercase font-bold`}
        >
          {result !== 'neutral' ? <p>{rating}</p> : <p>NEUTRAL</p>}
        </div>
        <p className="text-sm italic mt-2">{resultText}</p>
      </div>
    </div>
  );
};

export default ESGCard;
