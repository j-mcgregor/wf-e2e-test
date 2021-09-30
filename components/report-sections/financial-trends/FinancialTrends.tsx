import { useTranslations } from 'use-intl';
import ChartMulti from '../../charts/ChartMulti';
import { MultiGraphDataType } from '../../../types/charts';
import { financialTrendsCharts } from '../../../lib/settings/report.settings';

interface FinancialTrendsProps {
  data: MultiGraphDataType[][]; // 2D array of arrays of objects
}

const FinancialTrends = ({ data }: FinancialTrendsProps) => {
  const t = useTranslations();

  const chartsToRender = Object.keys(financialTrendsCharts).map((key: string) =>
    financialTrendsCharts[key]([
      {
        name: 'Scottish Seabird Center LTD',
        data: [
          { x: '2016', y: 200 },
          { x: '2017', y: 210 },
          { x: '2018', y: 410 },
          { x: '2019', y: 389 },
          { x: '2020', y: 700 }
        ]
      },
      {
        name: 'Industry Benchmark',
        data: [
          { x: '2016', y: 400 },
          { x: '2017', y: 380 },
          { x: '2018', y: 341 },
          { x: '2019', y: 500 },
          { x: '2020', y: 645 }
        ]
      },
      {
        name: 'Region Benchmark',
        data: [
          { x: '2016', y: 500 },
          { x: '2017', y: 480 },
          { x: '2018', y: 580 },
          { x: '2019', y: 740 },
          { x: '2020', y: 780 }
        ]
      }
    ])
  );

  chartsToRender.map(chart => console.log(chart));

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {chartsToRender.map(chart => (
        <ChartMulti
          header={`${t(chart.header)}`}
          subHeader={`${t(chart.subHeader)}`}
          graphData={chart.data}
          // hintTitle={`${t(chart.hint.title)}`}
          // hintBody={`${t(chart.hint.body)}`}
        />
      ))}
    </div>
  );
};

export default FinancialTrends;
