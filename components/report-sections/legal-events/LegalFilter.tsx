import { LegalEvent } from '../../../types/report';
import { TranslateInput } from '../../../types/global';

interface LegalFilterProps {
  // eslint-disable-next-line no-unused-vars
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
  if (!events) {
    return null;
  }
  const reverseTextStyle = 'print:flex print:flex-col-reverse';

  return (
    <button
      onClick={() => handleFilter(events, filter)}
      className={`${
        filter === activeFilter
          ? 'border-highlight border-2'
          : 'border-gray-50 border'
      }   md:w-1/3 cursor-pointer px-6  my-1 rounded-sm bg-white shadow-sm text-left avoid-break print:border-none print:text-center print:shadow-none`}
    >
      <div className={reverseTextStyle}>
        <p
          className={`${
            activeFilter === 'negative events' && 'text-red-500'
          } py-2 text-2xl print:text-lg font-semibold `}
        >
          {events.length}
        </p>
        <p className="pb-2 text-lg print:text-base">{title}</p>
      </div>
    </button>
  );
};

export default LegalFilter;
