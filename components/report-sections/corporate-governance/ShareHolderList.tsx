import { useTranslations } from 'next-intl';
import ShareHolderCard from './ShareHolderCard';
import { ShareholderType } from '../../../types/report';
import { useState } from 'react';

interface ShareHolderListProps {
  shareholders: ShareholderType[];
}

const ShareHolderList = ({ shareholders }: ShareHolderListProps) => {
  const t = useTranslations();
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  return (
    <div
      className="my-4 avoid-break "
      data-testid="corp-shareholder-section-testid"
    >
      <p className="text-xl py-4 print:text-2xl print:py-6">
        {t('all_shareholders')}
      </p>
      <ul className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2 `}>
        {shareholders.map((shareholder, index) => {
          return (
            <li key={`${shareholder.name}-${index}`}>
              <ShareHolderCard
                company_id={shareholder.company_id}
                iso_code={shareholder.iso_code}
                firstName={shareholder.first_name}
                lastName={shareholder.last_name}
                name={shareholder.name}
                linkedin={shareholder.linkedin}
                percentage={shareholder.percentage}
                type={shareholder.type}
                isPep={shareholder.peps_sanctions_enforcements}
                disabled={isGeneratingReport}
                setDisabled={setIsGeneratingReport}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShareHolderList;
