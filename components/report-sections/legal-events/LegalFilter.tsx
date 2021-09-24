import { LegalEvent } from '../../../types/report';
import { TranslateInput } from '../../../types/global';

interface LegalFilterProps {
  handleFilter: (event: LegalEvent[], filter: string) => void;
  events: LegalEvent[];
  filter: string;
  activeFilter: string;
  title: TranslateInput;
}

const LegalFilter = ({
  handleFilter,
  filter,
  events,
  activeFilter,
  title
}: LegalFilterProps) => {
  return (
    <button
      onClick={() => handleFilter(events, filter)}
      className={`${
        filter === activeFilter ? 'border-highlight border-2' : 'border-gray-50 border'
      }   md:w-1/3 cursor-pointer px-6   my-1 rounded-sm bg-white shadow-sm text-left`}
    >
      <p
        className={`${
          activeFilter === 'negative events' && 'text-red-500'
        } py-2 text-2xl font-semibold`}
      >
        {events.length}
      </p>
      <p className="pb-2 text-lg">{title}</p>
    </button>
  );
};

export default LegalFilter;
