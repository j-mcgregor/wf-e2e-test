import { useTranslations } from 'next-intl';

interface ShareHoldingCardProps {
  total: number;
  above10: number;
  fiveToTen: number;
  oneToFive: number;
  belowOne: number;
}

const ShareHoldingCard = ({
  total,
  above10,
  fiveToTen,
  oneToFive,
  belowOne
}: ShareHoldingCardProps) => {
  const t = useTranslations();

  return (
    <div className="my-6">
      <p className="text-xl">{t('shareholders')}</p>
      <div className="p-6 my-4 bg-white rounded-sm shadow-sm flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col w-full sm:w-1/2 px-8 sm:px-0 sm:mr-10 mb-10 sm:mb-0">
          <div className="flex justify-between font-bold pb-10">
            <p>{t('total_shareholders')}</p>
            <p>{total}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>{t('above_10')}</p>
            <p>{above10}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>{t('between_5-10')}</p>
            <p>{fiveToTen}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>{t('between_1-5')}</p>
            <p>{oneToFive}</p>
          </div>
          <div className="flex justify-between py-1">
            <p>{t('below_1')}</p>
            <p>{belowOne}</p>
          </div>
        </div>
        <div className="w-56 h-56 bg-primary rounded-full" />
      </div>
    </div>
  );
};

export default ShareHoldingCard;
