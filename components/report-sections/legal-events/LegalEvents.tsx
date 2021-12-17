import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LegalEvent } from '../../../types/report';
import LegalRow from './LegalRow';
import LegalFilter from './LegalFilter';

interface LegalEventsProps {
  legalEvents: LegalEvent[];
  forPrint?: boolean;
}

const FILTERS = {
  ALL: 'all_events',
  NEGATIVE: 'negative_events',
  CHARGES: 'charges'
};

const LegalEvents = ({ legalEvents, forPrint }: LegalEventsProps) => {
  const allEvents = legalEvents.map(event => event);

  const charges = allEvents.filter(event =>
    /Charge\/mortgage/.test(event.types.join(', '))
  );
  const negativeEvents = allEvents.filter(event =>
    /Negative event/.test(event.types.join(', '))
  );

  const [events, setEvents] = useState(allEvents);

  const legalEventSections: LegalEvent[][] =
    events &&
    events.reduce(
      (acc: any, curr: any, index) =>
        (index % 12 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
        acc,
      []
    );

  // console.log(legalEventSections);

  const [filter, setFilter] = useState(FILTERS.ALL);

  const handleFilter = (event: LegalEvent[], filter: string): void => {
    setEvents(event);
    setFilter(filter);
  };

  const t = useTranslations();

  return (
    <div
      className="text-primary px-4 md:px-1"
      data-testid="legal-events-testid"
    >
      <p className="text-xl">{t('summary')}</p>
      <div
        className="flex flex-col md:flex-row my-6  print:flex-row print:justify-evenly print:border-2 "
        data-testid="legal-events-summary-testid"
      >
        <LegalFilter
          events={allEvents}
          filter={filter}
          handleFilter={() => handleFilter(allEvents, FILTERS.ALL)}
          title={t('all_events')}
          activeFilter={FILTERS.ALL}
        />
        <div className="print:border-l-2" />
        <LegalFilter
          events={charges}
          filter={filter}
          handleFilter={() => handleFilter(charges, FILTERS.CHARGES)}
          title={t('charges')}
          activeFilter={FILTERS.CHARGES}
        />
        <div className=" print:border-l-2 " />
        <LegalFilter
          events={negativeEvents}
          filter={filter}
          handleFilter={() => handleFilter(negativeEvents, FILTERS.NEGATIVE)}
          title={t('negative_events')}
          activeFilter={FILTERS.NEGATIVE}
        />
      </div>

      <p className="text-xl">{t(filter)}</p>

      <div className="bg-white shadow-sm p-2 my-6 rounded-sm print:shadow-none break-after-page ">
        <div
          className="w-full my-6 flex flex-col text-xs px-2"
          data-testid="legal-events-table-testid"
        >
          <div className="flex border-b pb-2 mb-2">
            <p className="w-full">{t('description')}</p>
            <p className="w-full">{t('type')}</p>
            <div className="w-[230px]">
              <p>{t('date')}</p>
            </div>
          </div>

          {/* {legalEventSections.map((eventsArray, index) => {
            return (
              <div
                key={index}
                className={``}
              > */}
          {events.map((event, index) => {
            return <LegalRow forPrint={forPrint} key={index} {...event} />;
          })}
          {/* </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default LegalEvents;
