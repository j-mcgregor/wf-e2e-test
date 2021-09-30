import Chart from '../../charts/Chart';

import { MacroTrend } from '../../../lib/mock-data/charts';

interface MacroEconomicTrendsProps {
  trends: MacroTrend[];
}
const MacroEconomicTrends = ({ trends }: MacroEconomicTrendsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {trends.map(trend => (
        <Chart title={trend.title} subtitle={trend.period} data={trend.data} />
      ))}
    </div>
  );
};

export default MacroEconomicTrends;
