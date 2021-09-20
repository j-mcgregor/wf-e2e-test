interface FilterTabProps {
  handleFilter: (category: string) => void;
  filter: string;
  category: string;
  value: number;
  header: string;
}

const FilterTab = ({
  handleFilter,
  filter,
  category,
  value,
  header
}: FilterTabProps) => {
  return (
    <div
      onClick={() => handleFilter(category)}
      className={`${
        filter === category ? 'border-highlight' : 'border-white'
      }  border-2 w-1/3 cursor-pointer px-4 mx-1 rounded bg-white shadow`}
    >
      <p className="py-2 text-2xl font-semibold">{value}</p>
      <p className="pb-2 text-lg">{header}</p>
    </div>
  );
};

export default FilterTab;
