import { useTranslations } from 'next-intl';
import { bondRatings } from '../../../lib/settings/report.settings';
import usePrintClasses from '../../../hooks/usePrintClasses';
import { ReactElement } from 'react';
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
export type RatingType =
  | 'A'
  | 'BBB+'
  | 'BBB'
  | 'BB+'
  | 'BBB-'
  | 'BB-'
  | 'BB'
  | 'B+'
  | 'B'
  | 'B-'
  | 'CCC+'
  | 'CCC'
  | 'CCC-'
  | 'CC'
  | 'CC-'
  | 'CC+'
  | 'D';

const BondRating = ({ score, hint }: BondRatingProps) => {
  const t = useTranslations();

  // does score fit within the CC/CC+/CC- range?
  const isCC = score === 'CC+' || score === 'CC' || score === 'CC-';

  // decide which index the score should correspond to in the bondRatings array
  // then use this value when rendering to specify the option to focus on/value to display
  const indexOfScoreToRender = isCC
    ? 1
    : score === ('B+' || 'B')
    ? 6
    : score === ('BB-' || 'BB')
    ? 7
    : score === ('BB+' || 'BBB-')
    ? 8
    : bondRatings.findIndex(rating => rating.score === score);

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
                  background: `linear-gradient(to right, ${rating.bgColor})`,
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
      <div className="flex items-center bg-bg p-2 rounded-sm">
        <p className="p-2 font-bold text-4xl">{score}</p>
        <p className="p-2 text-sm">{t(`bond_rating_descriptions.${score}`)}</p>
      </div>
    </div>
  );
};

export default BondRating;
