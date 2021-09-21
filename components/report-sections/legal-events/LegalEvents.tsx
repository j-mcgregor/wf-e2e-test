import { useState, useEffect } from 'react';

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
  console.log(events);
  const handleFilter = (event: []): void => {
    setEvents(event);
  };

  return (
    <div className="text-primary">
      <div className="flex my-6">
        <div
          onClick={() => setEvents(allEvents)}
          className={`${
            events === allEvents ? 'border-highlight' : 'border-white'
          }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
        >
          <p className="py-2 text-2xl font-semibold">{allEvents.length}</p>
          <p className="pb-2 text-lg">All Events</p>
        </div>
        <div
          onClick={() => setEvents(charges)}
          className={`${
            events === charges ? 'border-highlight' : 'border-white'
          }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
        >
          <p className="py-2 text-2xl font-semibold">{charges.length}</p>
          <p className="pb-2 text-lg">Charges</p>
        </div>
        <div
          onClick={() => setEvents(negativeEvents)}
          className={`${
            events === negativeEvents ? 'border-highlight' : 'border-white'
          }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
        >
          <p className="py-2 text-2xl font-semibold">{negativeEvents.length}</p>
          <p className="pb-2 text-lg">Negative Events</p>
        </div>
      </div>

      <div>
        <div className="w-full my-6 flex flex-col text-xs mx-2">
          <div className="border-b border-gray-800 my-1" />

          {events.map(event => {
            return <LegalRow data={event} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalEvents;
