import { useTranslations } from 'use-intl';
import { LegalEvent } from '../../../types/report';

import LegalRow from './LegalRow';

interface LegalEventTableProps {
  filter: string;
  legal_events: LegalEvent[];
}

const LegalEventTable = ({ filter, legal_events }: LegalEventTableProps) => {
  const t = useTranslations();

  return (
    <div>
      <div className="w-full my-6 flex flex-col text-xs mx-2">
        <LegalRow
          type={t('type')}
          description={t('description')}
          date={t('date')}
        />
        <div className="border-b border-gray-800 my-1" />

        {legal_events.map(legal_event => {
          return filter !== '' ? (
            legal_event.types.includes(filter) && (
              <LegalRow data={legal_event} />
            )
          ) : (
            <LegalRow data={legal_event} />
          );
        })}
      </div>
    </div>
  );
};

export default LegalEventTable;
