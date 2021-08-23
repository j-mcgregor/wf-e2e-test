const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' }
];

const Stats = () => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(item => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded overflow-hidden sm:p-6 "
          >
            <dt className="text-3xl font-medium text-highlight truncate">
              {item.stat}
            </dt>
            <dd className="mt-1 text-lg  font-semibold text-gray-900">
              {item.name}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
