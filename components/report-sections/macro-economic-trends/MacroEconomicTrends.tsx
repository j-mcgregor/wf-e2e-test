import { useMemo } from 'react';
import { useTranslations } from 'use-intl';

import { macroEconomicTrendCharts } from '../../../lib/settings/report.settings';
import { MacroTrend } from '../../../types/charts';
import { MacroEconomic, MacroEconomics } from '../../../types/report';
import Chart from '../../charts/Chart';
import { renderArrayForPrint } from '../../../lib/utils/print-helpers';

interface MacroEconomicTrendsProps {
  trends: MacroEconomics;
}

interface ChartData {
  header: string;
  subHeader: string;
  hint: {
    title: string;
    body: string;
  };
  data: [
    {
      data: Array<{ x: string; y: number }>;
    }
  ];
}

const MacroEconomicTrends = ({ trends }: MacroEconomicTrendsProps) => {
  const t = useTranslations();

  const chartsToRender = useMemo(
    () =>
      Object.entries(trends)
        .map(([key, value]: [string, MacroEconomic]) => {
          if (macroEconomicTrendCharts[key.toString()]) {
            const data = value?.history?.map(h => ({
              // DD/MM/YY eg 29/06/21
              x: new Date(h.date).toLocaleString('en-GB', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
              }),
              y: !isNaN(Number(h.value)) ? Number(h.value) : 0
            }));

            return macroEconomicTrendCharts[key.toString()]?.([
              {
                data
              }
            ]);
          }
        })
        .filter(Boolean),
    []
  );

  const graphSections: ChartData[][] = renderArrayForPrint(chartsToRender, 8);

  const chartTicksXaxis: Record<string, number> = {
    daily: 12,
    monthly: 12,
    quarterly: 16,
    yearly: 20
  };

  return (
    <div className="">
      {graphSections.map((graphSection: ChartData[], index: number) => {
        return (
          <div
            key={index}
            className={`grid md:grid-cols-2 sm:print:grid-cols-2 print:grid-cols-2 gap-2 mt-2 avoid-break ${
              index !== 0 && 'print:pt-10'
            }`}
          >
            {graphSection.map((chart, i) => {
              const chartData = chart?.data[0]?.data;
              return (
                chartData && (
                  <Chart
                    key={i}
                    title={`${t(chart.header)}`}
                    subtitle={`${t(chart.subHeader)}`}
                    data={chart.data[0].data}
                    showLabels={true}
                    tickCount={chartTicksXaxis[chart.subHeader]}
                  />
                )
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MacroEconomicTrends;
