import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LegalEvent } from '../../../types/report';
import LegalRow from './LegalRow';
import LegalFilter from './LegalFilter';

interface LegalEventsProps {
  legalEvents: LegalEvent[];
}

const FILTERS = {
  ALL: 'all events',
  NEGATIVE: 'negative event',
  CHARGES: 'charges'
}

const LegalEvents = ({ legalEvents }: LegalEventsProps) => {
  const allEvents = legalEvents.map(event => event);

  const charges = allEvents.filter(event =>
    /Charge\/mortgage/.test(event.types.join(', '))
  );
  const negativeEvents = allEvents.filter(event =>
    /Negative event/.test(event.types.join(', '))
  );

  const [events, setEvents] = useState(allEvents);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const handleFilter = (event: LegalEvent[], filter: string): void => {
    setEvents(event);
    setFilter(filter);
  };

  const t = useTranslations();

  return (
    <div className="text-primary px-4 md:px-1">
      <p className="text-xl">{t('summary')}</p>
      <div className="flex flex-col md:flex-row my-6 justi ">
        <LegalFilter
          events={allEvents}
          filter={filter}
          handleFilter={() => handleFilter(allEvents, FILTERS.ALL)}
          title={t('all events')}
          activeFilter={FILTERS.ALL}
        />
        <LegalFilter
          events={charges}
          filter={filter}
          handleFilter={() => handleFilter(charges, FILTERS.CHARGES)}
          title={t('charges')}
          activeFilter={FILTERS.CHARGES}
        />
        <LegalFilter
          events={negativeEvents}
          filter={filter}
          handleFilter={() => handleFilter(negativeEvents, FILTERS.NEGATIVE)}
          title={t('negative events')}
          activeFilter={FILTERS.NEGATIVE}
        />
      </div>

      <p className="text-xl">{t(filter)}</p>

      <div className="bg-white shadow-sm p-2 my-6 rounded-sm">
        <div className="w-full my-6 flex flex-col text-xs px-2">
          <div className="flex border-b pb-2 mb-2">
            <p className="w-full">{t('description')}</p>
            <p className="w-full">{t('type')}</p>
            <div className="w-[230px]">
              <p>{t('date')}</p>
            </div>
          </div>
          {events.map((event, index) => {
            return <LegalRow key={index} {...event} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalEvents;
