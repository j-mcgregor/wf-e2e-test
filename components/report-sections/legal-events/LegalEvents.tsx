import { useState } from 'react';
import { useTranslations } from 'use-intl';
import { LegalEvent } from '../../../types/report';
import LegalRow from './LegalRow';

interface LegalEventsProps {
  legalEvents: LegalEvent[];
}

const LegalEvents = ({ legalEvents }: LegalEventsProps) => {
  const allEvents = legalEvents.map(event => event);
  const charges: Array<LegalEvent> =  allEvents.filter((event): boolean =>{
    return event.types.indexOf('Charge/mortgage') !== -1 }
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

  // to do
  // mobile responsiveness
  // stack the filters
  // add padding to the edges on mobile
  // add filters to own component
  // find uses of SVGs that are heroicons and use the hero icons from the installed package
  // change div to button 
    // 1. legal events chevron 
    // 2. filter to button as well as component
  // complete the mapping function for the details
  //  - check the length of rendering string to assign large size if required
  //  - render keys as normal text converting from camel case
  //  - implement css for this
  // only negative events should be in red
  // add array to report.settings
  // add in translations 

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

          {events.map((event, index) => {
            return <LegalRow key={index} {...event} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalEvents;
