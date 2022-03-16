import { useTranslations } from 'use-intl';
import { convertNumberToPercentage } from '../../../lib/utils/text-helpers';
import { TranslateInput } from '../../../types/global';
import LoadingIcon from '../../svgs/LoadingIcon';

interface ESGCardProps {
  result?: TranslateInput;
  rating?: string | number;
  resultText?: TranslateInput;
  title: TranslateInput;
  description: TranslateInput;
  asteriskText?: TranslateInput;
  results?: { sector: string; match: string }[];
}

const ESGCard = ({
  title,
  description,
  result,
  resultText,
  rating,
  results,
  asteriskText
}: ESGCardProps) => {
  const t = useTranslations();

  const ratingRender = () => {
    if (!!rating && rating !== 0) {
      return (
        <div
          className={`${result === 'positive' ? 'bg-green-300' : 'bg-bg'}
           w-40 px-10 py-6 rounded-lg uppercase font-bold`}
        >
          {result !== 'neutral' ? <p>{rating}</p> : <p>{t('neutral')}</p>}
        </div>
      );
    } else if (rating !== 0) {
      return (
        <div
          className={
            'bg-red-200 w-40 px-10 py-6 rounded-lg uppercase font-bold'
          }
        >
          <p>{rating}</p>
        </div>
      );
    } else {
      return (
        <div className={'bg-bg w-40 px-10 py-6 rounded-lg uppercase font-bold'}>
          <p>{rating}</p>
        </div>
      );
    }
  };

  const resultsRender = (
    <ul className="space-y-3">
      {results?.map((result, index) => {
        const industry = `industries.${result.sector.toLowerCase()}`;
        return (
          <li
            className={`text-sm text-left flex justify-between space-x-3 bg-primary ${
              index === 0
                ? 'bg-opacity-20'
                : index === 1
                ? 'bg-opacity-10'
                : 'bg-opacity-5'
            } px-2 py-1 rounded-md `}
            key={result.sector}
          >
            <span className="">{t(industry)}</span>
            <span className="font-bold">
              {convertNumberToPercentage(Number(result.match))}
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className="flex bg-white rounded-sm shadow-sm my-4 px-8 py-8 items-center justify-between
      block avoid-break"
      data-testid="esg-card-testid"
    >
      <div className="w-1/2">
        <p className="text-lg pb-4">{title}</p>
        <p className="text-sm">{description}</p>
        {asteriskText && result === 'negative' && (
          <p className="text-xs mt-2 ">*{asteriskText}</p>
        )}
      </div>
      <div className="text-center relative top-2">
        {title !== 'Activities' && ratingRender()}
        {results?.length !== 0 && resultsRender}
        <p
          className={`text-sm italic mt-2 ${
            results?.length === 0 && 'bg-bg px-10 py-6 rounded-lg'
          }`}
        >
          {resultText}
        </p>
      </div>
    </div>
  );
};

export default ESGCard;
