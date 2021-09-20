import { useState } from 'react';
import FilterableStats from './FilterableStats';
import LegalEventTable from './LegalEventTable';
import { LegalEvent } from '../../../types/report';

interface LegalEventsProps {
  legal_events: LegalEvent[];
}

const LegalEvents = ({ legal_events }: LegalEventsProps) => {
  const [filter, setFilter] = useState('');

  const handleFilter = (category: string): void => {
    setFilter(category);
  };

  console.log(legal_events);

  return (
    <div className="text-primary">
      <FilterableStats
        handleFilter={handleFilter}
        filter={filter}
        legal_events={legal_events}
      />
      <LegalEventTable legal_events={legal_events} filter={filter} />
    </div>
  );
};

export default LegalEvents;
