import ReactTimeAgo from 'react-time-ago'; //unsure of ts/linting error - is working?

type StatType = {
  header: React.ReactNode;
  data: number;
  timeAgo?: boolean;
};

interface StatsProps {
  stats: StatType[];
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-5 bg-white shadow  overflow-hidden sm:p-6 ${
              i === 0
                ? 'rounded-l'
                : i === stats.length - 1
                ? 'rounded-r'
                : 'rounded-none'
            }`}
          >
            <dt className="text-3xl font-medium text-highlight truncate">
              {item.timeAgo ? <ReactTimeAgo date={item.data} /> : item.data}
            </dt>

            <dd className="mt-1 text-lg  font-semibold text-gray-900">
              {item.header}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
