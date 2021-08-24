import ReactTimeAgo from 'react-timeago'; //unsure of ts/linting error - is working?

type StatType = {
  header: React.ReactNode;
  data?: number | string | Date;
  timeAgo?: boolean;
};

interface StatsProps {
  stats: StatType[];
  className?: string;
}

const Stats = ({ stats, className }: StatsProps) => {
  return (
    <div className={className}>
      <dl className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-5 bg-white shadow overflow-hidden sm:p-4 first:rounded-l last:rounded-r `}
          >
            <dt className="text-2xl font-medium text-highlight truncate before">
              {item.data && !item.timeAgo && (
                <p className="before:content-['l'] before:ml-[-5px] before:opacity-0">
                  {item.data}
                </p>
              )}
              {item.timeAgo && item.data && <ReactTimeAgo date={item.data} />}
              {item.timeAgo && !item.data && <p>Never</p>}
            </dt>
            <dd className="mt-1 text-base text-gray-900">{item.header}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
