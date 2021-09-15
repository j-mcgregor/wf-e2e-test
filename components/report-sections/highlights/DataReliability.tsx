import { useTranslations } from 'use-intl';

interface DataReliabilityProps {
  comment: string;
}

const DataReliability = ({ comment }: DataReliabilityProps) => {
  const t = useTranslations();

  return (
    <div className="bg-[#2BAD0133] border-2 border-[#2BAD01] rounded w-1/2 h-1/2 text-sm py-4 px-3">
      <p className="font-bold pb-2">{t('data reliability')}</p>
      <p>{comment}</p>
    </div>
  );
};

export default DataReliability;
