import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { LegalEvent } from '../../../types/report';

import LegalRow from './LegalRow';

interface LegalEventTableProps {
  filter: string;
  legal_events: LegalEvent[];
}

const LegalEventTable = ({ filter, legal_events }: LegalEventTableProps) => {
  const [dropDown, setDropdown] = useState(false);
  const t = useTranslations();

  // to use for info dropdown toggle
  const handleDropdown = () => {
    setDropdown(!dropDown);
  };
  return (
    <div>
      {filter}

      <div className="w-full my-6 flex flex-col text-xs mx-2">
        <LegalRow
          type={t('type')}
          description={t('description')}
          date={t('date')}
        />
        <div className="border-b border-gray-800 my-1" />
        {legal_events.map(legal_event => {
          return (
            <LegalRow
              types={legal_event.types}
              description={legal_event.description}
              date={legal_event.date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LegalEventTable;
