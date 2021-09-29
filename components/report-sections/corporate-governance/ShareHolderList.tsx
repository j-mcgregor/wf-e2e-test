import { useTranslations } from 'next-intl';
import ShareHolderCard from './ShareHolderCard';
import { Shareholder } from '../../../types/report';

interface ShareHolderListProps {
  shareholders: Shareholder[];
}

const ShareHolderList = ({ shareholders }: ShareHolderListProps) => {
  const t = useTranslations();

  return (
    <div className="my-4">
      <p className="text-xl py-4">{t('all shareholders')}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shareholders.map((shareholder, index) => {
          return (
            <ShareHolderCard
              key={shareholder.first_name + index}
              firstName={shareholder.first_name}
              lastName={shareholder.last_name}
              linkedin={shareholder.linkedin}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShareHolderList;
