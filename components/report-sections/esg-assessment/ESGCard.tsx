import { TranslateInput } from '../../../types/global';
import LoadingIcon from '../../svgs/LoadingIcon';

interface ESGCardProps {
  result?: TranslateInput;
  rating?: string | number;
  resultText: TranslateInput;
  title: TranslateInput;
  description: TranslateInput;
  results?: { name: string; score: number }[];
}

const ESGCard = ({
  title,
  description,
  result,
  resultText,
  rating,
  results
}: ESGCardProps) => {
  return (
    <div
      className="flex bg-white rounded-sm shadow-sm my-4 px-8 py-8 items-center justify-between
      block avoid-break"
      data-testid="esg-card-testid"
    >
      <div className="w-1/2">
        <p className="text-lg pb-4">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="text-center relative top-2">
        {result && rating && (
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
        )}

        {results && (
          <ul className="space-y-3">
            {results.map((result, index) => (
              <li
                className={`text-sm text-left flex justify-between space-x-3 bg-primary ${
                  index === 0
                    ? 'bg-opacity-20'
                    : index === 1
                    ? 'bg-opacity-10'
                    : 'bg-opacity-5'
                } px-2 py-1 rounded-md `}
                key={result.name}
              >
                <span className="">{result.name.replace(/_/g, ' ')} </span>
                <span className="font-bold">{result.score}</span>
              </li>
            ))}
          </ul>
        )}

        {!results && !result && !rating && (
          <div className="bg-gray-200 animate-pulse h-12 rounded-md flex justify-center items-center">
            <LoadingIcon />
          </div>
        )}
        <p className="text-sm italic mt-2">{resultText}</p>
      </div>
    </div>
  );
};

export default ESGCard;
