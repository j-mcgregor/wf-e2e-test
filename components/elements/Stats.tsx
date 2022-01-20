import ReactTimeAgo from 'react-timeago'; //unsure of ts/linting error - is working?

import { useTranslations } from 'next-intl';
import Link from './Link';

type StatType = {
  header: React.ReactNode;
  data?: number | string | Date;
  linkTo?: string | undefined;
  timeAgo?: boolean;
};

interface StatsProps {
  stats: StatType[];
  className?: string;
}

const Stats = ({ stats, className }: StatsProps) => {
  const t = useTranslations();
  return (
    <div className={className}>
      <dl className="grid grid-cols-1 sm:grid-cols-3">
        {stats.map((item, i) => (
          <Link key={i} linkTo={item.linkTo}>
            <div
              className={`px-4 py-2 sm:p-4 bg-white shadow overflow-hidden  first:rounded-t  sm:first:rounded-l sm:last:rounded-r sm:first:rounded-r-none last:rounded-b sm:last:rounded-l-none`}
              data-testid="stat-card"
            >
              <dt className="text-2xl font-medium text-highlight truncate before">
                {item.data && !item.timeAgo && (
                  <p className="before:content-['l'] before:ml-[-5px] before:opacity-0">
                    {item.data}
                  </p>
                )}
                {item.timeAgo && item.data && <ReactTimeAgo date={item.data} />}
                {item.timeAgo && !item.data && <p>{t('never')}</p>}
              </dt>
              <dd className="mt-1 text-base text-gray-900">{item.header}</dd>
            </div>
          </Link>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
