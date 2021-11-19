import { useTranslations } from 'next-intl';
import ShareHolderCard from './ShareHolderCard';
import { Shareholder } from '../../../types/report';

interface ShareHolderListProps {
  shareholders: Shareholder[];
}

const ShareHolderList = ({ shareholders }: ShareHolderListProps) => {
  const t = useTranslations();

  return (
    <div
      className="my-4 avoid-break "
      data-testid="corp-shareholder-section-testid"
    >
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('all_shareholders')}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 print:flex print:flex-wrap print:border-2 print:p-4">
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
