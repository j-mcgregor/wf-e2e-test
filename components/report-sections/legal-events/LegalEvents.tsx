import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { LegalEvent } from '../../../types/report';
import LegalRow from './LegalRow';

interface LegalEventsProps {
  legal_events: LegalEvent[];
}

const LegalEvents = ({ legal_events }: LegalEventsProps) => {
  const allEvents = legal_events.map(event => event);
  const charges = allEvents.filter(event =>
    event.types.includes('Charge/mortgage')
  );
  const negativeEvents = allEvents.filter(event =>
    event.types.includes('Negative Event')
  );

  const [events, setEvents] = useState(allEvents);
  const [filter, setFilter] = useState('');

  const handleFilter = (event: LegalEvent[], filter: string): void => {
    setEvents(event);
    setFilter(filter);
  };

  const t = useTranslations();

  return (
    <div className="text-primary">
      <div className="flex my-6">
        <div
          onClick={() => handleFilter(allEvents, '')}
          className={`${
            filter === '' ? 'border-highlight' : 'border-white'
          }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
        >
          <p className="py-2 text-2xl font-semibold">{allEvents.length}</p>
          <p className="pb-2 text-lg">{t('all events')}</p>
        </div>
        <div
          onClick={() => handleFilter(charges, 'charges')}
          className={`${
            filter === 'charges' ? 'border-highlight' : 'border-white'
          }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
        >
          <p className="py-2 text-2xl font-semibold">{charges.length}</p>
          <p className="pb-2 text-lg">{t('charges')}</p>
        </div>
        <div
          onClick={() => handleFilter(negativeEvents, 'negative')}
          className={`${
            filter === 'negative' ? 'border-highlight' : 'border-white'
          }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
        >
          <p className="py-2 text-2xl font-semibold">{negativeEvents.length}</p>
          <p className="pb-2 text-lg">{t('negative events')}</p>
        </div>
      </div>

      <div>
        <div className="w-full my-6 flex flex-col text-xs mx-2">
          <div className="flex border-b pb-2 mb-2">
            <p className="w-full">Description</p>
            <p className="w-full">Type</p>
            <p className="w-1/3">Date</p>
            <div className="w-12" />
          </div>

          {events.map(event => {
            return <LegalRow data={event} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalEvents;
