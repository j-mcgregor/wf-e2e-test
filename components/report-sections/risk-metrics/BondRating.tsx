import { useTranslations } from 'use-intl';

interface BondRatingProps {
  score: string;
}

const BondRating = ({ score }: BondRatingProps) => {
  const t = useTranslations();

  const ratings = [
    {
      score: 'CC',
      bgColor: 'rgb(220,11,23), rgb(220,44,20)',
      width: 'w-1/12'
    },
    {
      score: 'CCC',
      bgColor: 'rgb(220,44,20), rgb(220,80,17)',
      width: 'w-1/12'
    },
    {
      score: 'B-',
      bgColor: 'rgb(220,80,17), rgb(217,124,13)',
      width: 'w-2/12'
    },
    {
      score: 'BB',
      bgColor: 'rgb(217,124,13), rgb(216,181,9)',
      width: 'w-2/12'
    },
    {
      score: 'BBB',
      bgColor: 'rgb(216,181,9), rgb(159,180,7)',
      width: 'w-3/12'
    },
    {
      score: 'A',
      bgColor: 'rgb(159,180,7), rgb(94,145,5)',
      width: 'w-3/12'
    },
    {
      score: 'AA',
      bgColor: 'rgb(94,145,5), rgb(52,120,1)',
      width: 'w-1/12'
    },
    {
      score: 'AAA',
      bgColor: 'rgb(52,120,1), rgb(27,102,2)',
      width: 'w-1/12'
    }
  ];

  return (
    <div className="bg-white shadow rounded-sm px-8 py-6">
      <p className="text-xl font-bold">{t('bond rating')}</p>

      <div className="flex w-full items-center my-4 py-4">
        {ratings.map((rating, i) => {
          return (
            <div
              style={{
                background: `linear-gradient(to right, ${rating.bgColor})`
              }}
              key={i}
              className={`${
                rating.score === score
                  ? 'h-36 text-4xl font-bold'
                  : 'h-28 text-lg font-semibold'
              } ${rating.width}
              } text-white flex items-center justify-center mx-[1px]`}
            >
              {rating.score}
            </div>
          );
        })}
      </div>

      <div className="flex items-center bg-bg p-2 rounded-sm">
        <p className="p-2 font-bold text-4xl">{score}</p>
        <p className="p-2 text-sm">
          Velit duis duis incididunt velit enim nisi ea fugiat non ut nostrud
          Id. cillum deserunt dolore ut nulla esse anim eu exercitation.
        </p>
      </div>
    </div>
  );
};

export default BondRating;
