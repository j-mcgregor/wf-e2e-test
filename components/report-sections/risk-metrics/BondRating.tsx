import { useTranslations } from 'next-intl';
import { bondRatings } from '../../../lib/settings/report.settings';
import usePrintClasses from '../../../hooks/usePrintClasses';
import { ReactElement } from 'react';
const bondRatingClasses = {
  chrome: {
    container: 'flex justify-center items-center'
  },
  'microsoft edge': {
    container: 'flex justify-center items-center'
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
  | 'BBB-'
  | 'BB'
  | 'B'
  | 'B-'
  | 'CCC+'
  | 'CCC'
  | 'CCC-'
  | 'CC'
  | 'D';

const BondRating = ({ score, hint }: BondRatingProps) => {
  const t = useTranslations();

  const printClasses = usePrintClasses(bondRatingClasses);
  return (
    <div
      className={`bg-white shadow rounded-sm px-4 sm:px-8 py-6 print:shadow-none print:border-2`}
    >
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold">{t('bond_rating_equivalent')}</p>
        {hint}
      </div>

      <div className={`${printClasses.container}`}>
        <div className={`flex items-center my-4 py-4 sm:w-full`}>
          {bondRatings.map((rating, i) => {
            return (
              <div
                style={{
                  background: `linear-gradient(to right, ${rating.bgColor})`,
                  width: rating.width
                }}
                key={i}
                className={`${
                  rating.score === score
                    ? 'h-36 text-2xl sm:text-4xl font-bold min-w-[70px] sm:min-w-[100px]'
                    : 'h-28 text-sm sm:text-lg font-semibold px-1'
                } text-white flex items-center justify-center print:mx-[2px] border border-white`}
                data-testid={rating.score === score ? 'bond-rating' : ''}
              >
                {rating.score}
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
