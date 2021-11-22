import { useTranslations } from 'next-intl';

import { bondRatings } from '../../../lib/settings/report.settings';
import usePrintClasses from '../../../hooks/usePrintClasses';

const bondRatingClasses = {
  chrome: {
    container: 'flex justify-center items-center'
  }
};

interface BondRatingProps {
  score: RatingType;
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
  | 'CC';

const BondRating = ({ score }: BondRatingProps) => {
  const t = useTranslations();

  const printClasses = usePrintClasses(bondRatingClasses);

  return (
    <div
      className={`bg-white shadow rounded-sm px-4 sm:px-8 py-6 print:shadow-none print:border-2`}
    >
      <p className="text-xl font-bold">{t('bond_rating')}</p>

      <div className={`${printClasses.container} overflow-x-scroll `}>
        <div className={`flex items-center my-4 py-4 w-[600px] sm:w-full`}>
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
                    ? 'h-36 text-4xl font-bold min-w-[100px]'
                    : 'h-28 text-lg font-semibold'
                } text-white flex items-center justify-center print:mx-[2px]`}
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
