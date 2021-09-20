import FilterTab from './FilterTab';
import { useTranslations } from 'next-intl';
interface FilterableStatsProps {
  handleFilter: (category: string) => void;
  filter: string;
}

const FilterableStats = ({ handleFilter, filter }: FilterableStatsProps) => {
  const t = useTranslations();

  return (
    <div className="">
      <p>{t('summary')}</p>
      <div className="flex my-6">
        <FilterTab
          handleFilter={handleFilter}
          filter={filter}
          category="All Events"
          value={38}
          header="All Events"
        />
        <FilterTab
          handleFilter={handleFilter}
          filter={filter}
          category="Charge/mortgage"
          value={12}
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
