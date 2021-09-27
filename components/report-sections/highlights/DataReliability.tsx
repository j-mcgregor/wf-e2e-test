import { useTranslations } from 'next-intl';

interface DataReliabilityProps {
  comment: string;
}

const DataReliability = ({ comment }: DataReliabilityProps) => {
  const t = useTranslations();

  return (
    <div className="sm:w-1/2 md:w-full lg:w-1/2 h-full py-6">
      <div className="bg-[#2BAD0133] border-2 border-[#2BAD01] rounded  h-1/2 text-sm py-4 px-3">
        <p className="font-bold pb-2">{t('data reliability')}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default DataReliability;
