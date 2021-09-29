import Chart from '../../charts/Chart';

import { macroTrendData } from '../../../lib/mock-data/charts';

console.log(macroTrendData);

const MacroEconomicTrends = () => {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      <Chart title="GDP Growth Rate" subtitle="Quarterly" />
      <Chart title="GDP Growth Rate" subtitle="Quarterly" />
      <Chart title="GDP Growth Rate" subtitle="Quarterly" />
      <Chart title="GDP Growth Rate" subtitle="Quarterly" />
    </div>
  );
};

export default MacroEconomicTrends;
