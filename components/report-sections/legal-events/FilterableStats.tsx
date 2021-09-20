import FilterTab from './FilterTab';
import { useTranslations } from 'next-intl';
import { LegalEvent } from '../../../types/report';

interface FilterableStatsProps {
  handleFilter: (category: string) => void;
  filter: string;
  legal_events: LegalEvent[];
}

const FilterableStats = ({
  handleFilter,
  filter,
  legal_events
}: FilterableStatsProps) => {
  const t = useTranslations();

  const qtyAll = legal_events.length;

  // const qtyCharge = legal_events.map(event =>
  //   event.types.filter('Negative Event')
  // );

  return (
    <div>
      <p>{t('summary')}</p>
      <div className="flex my-6">
        <FilterTab
          handleFilter={handleFilter}
          filter={filter}
          category=""
          value={qtyAll} // FIX TO RENDER BASED ON NUMBER OF MATCHES
          header="All Events"
        />
        <FilterTab
          handleFilter={handleFilter}
          filter={filter}
          category="Charge/mortgage"
          value={10}
          header="Charges"
        />
        <FilterTab
          handleFilter={handleFilter}
          filter={filter}
          category="Negative Event"
          value={2}
          header="Negative Events"
        />
      </div>
    </div>
  );
};

export default FilterableStats;
