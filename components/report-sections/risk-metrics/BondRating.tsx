import { useTranslations } from 'next-intl';
import { ReactElement } from 'react';

import usePrintClasses from '../../../hooks/usePrintClasses';
import { bondRatings } from '../../../lib/settings/report.settings';
import { RatingType } from '../../../types/report';

const bondRatingClasses = {
  chrome: {
    container: 'avoid-break',
    ratings: 'flex justify-center items-center'
  },
  'microsoft edge': {
    container: 'avoid-break',
    ratings: 'flex justify-center items-center'
  }
};

interface BondRatingProps {
  score: RatingType;
  hint: ReactElement;
}

const determineScore = (score: RatingType): number => {
  switch (score) {
    case 'CC-':
    case 'CC+':
    case 'CC':
      return 1;
    case 'B+':
    case 'B':
      return 6;
    case 'BB-':
    case 'BB':
      return 7;
    case 'BB+':
    case 'BBB-':
      return 8;
    case 'A-':
      return bondRatings.findIndex(rating => rating.score === 'A');
    default:
      return bondRatings.findIndex(rating => rating.score === score);
  }
};

const BondRating = ({ score, hint }: BondRatingProps) => {
  const t = useTranslations();

  // decide which index the score should correspond to in the bondRatings array
  // then use this value when rendering to specify the option to focus on/value to display
  const indexOfScoreToRender = determineScore(score);

  const printClasses = usePrintClasses(bondRatingClasses);

  return (
    <div
      className={`${printClasses.container} bg-white shadow rounded-sm px-4 sm:px-8 py-6 print:shadow-none print:border-2 avoid-break print:translate-y-[10px] `}
    >
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold">{t('bond_rating_equivalent')}</p>
        {hint}
      </div>
      <div className={`${printClasses.ratings}`}>
        <div className={`flex items-center my-4 py-4 sm:w-full print:w-full`}>
          {bondRatings.map((rating, i) => {
            return (
              <div
                style={{
                  background: score
                    ? `linear-gradient(to right, ${rating.bgColor})`
                    : '#dddddd',
                  width: rating.width
                }}
                key={i}
                className={`${
                  indexOfScoreToRender === i
                    ? 'h-36 text-2xl sm:text-4xl font-bold min-w-[70px] sm:min-w-[100px]'
                    : 'h-28 text-sm sm:text-lg font-semibold px-1'
                } text-white flex items-center justify-center print:mx-[2px] border border-white`}
                data-testid={rating.score === score ? 'bond-rating' : ''}
              >
                {i === indexOfScoreToRender ? score : rating.score}
              </div>
            );
          })}
        </div>
      </div>
      {score && (
        <div className="flex items-center bg-bg p-2 rounded-sm">
          <p className="p-2 font-bold text-4xl">{score}</p>
          <p className="p-2 text-sm print:text-xs">
            {t(`bond_rating_descriptions.${score}`)}
          </p>
        </div>
      )}
    </div>
  );
};

export default BondRating;
