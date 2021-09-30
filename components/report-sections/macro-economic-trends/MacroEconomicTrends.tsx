import Chart from '../../charts/Chart';
import { macroEconomicTrendCharts } from '../../../lib/settings/report.settings';
import { MacroTrend } from '../../../types/charts';

interface MacroEconomicTrendsProps {
  trends: MacroTrend[];
}
const MacroEconomicTrends = ({ data }: MacroEconomicTrendsProps) => {
  const chartsToRender = Object.keys(macroEconomicTrendCharts).map(
    (key: string) =>
      macroEconomicTrendCharts[key]([
        { x: '2011', y: 304 },
        { x: '2012', y: 410 },
        { x: '2013', y: 350 },
        { x: '2014', y: 371 },
        { x: '2015', y: 510 },
        { x: '2016', y: 649 },
        { x: '2017', y: 600 },
        { x: '2018', y: 604 },
        { x: '2019', y: 867 },
        { x: '2020', y: 880 }
      ])
  );

  return (
    <div className="grid md:grid-cols-2 gap-2">
      {chartsToRender.map(chart => (
        <Chart
          title={chart.title}
          subtitle={chart.subHeader}
          data={chart.data}
        />
      ))}
    </div>
  );
};

export default MacroEconomicTrends;
