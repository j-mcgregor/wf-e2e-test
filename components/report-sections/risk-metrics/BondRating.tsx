import { useTranslations } from 'next-intl';
import { bondRatings } from '../../../lib/settings/report.settings';

interface BondRatingProps {
  score: Rating;
  description: string;
}
type Rating = keyof typeof RatingTypes
enum RatingTypes {
  CC,
  CCC,
  "B-",
  B,
  BB,
  BBB,
  A,
  AA,
  AAA,
}

const BondRating = ({ score, description }: BondRatingProps) => {
  const t = useTranslations();

  return (
    <div className="bg-white shadow rounded-sm px-8 py-6">
      <p className="text-xl font-bold">{t('bond rating')}</p>

      <div className="flex w-full items-center my-4 py-4">
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
                  ? 'h-36 text-4xl font-bold'
                  : 'h-28 text-lg font-semibold'
              } text-white flex items-center justify-center mx-[1px]`}
            >
              {rating.score}
            </div>
          );
        })}
      </div>

      <div className="flex items-center bg-bg p-2 rounded-sm">
        <p className="p-2 font-bold text-4xl">{score}</p>
        <p className="p-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BondRating;
