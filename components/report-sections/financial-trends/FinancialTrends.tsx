/* eslint-disable security/detect-object-injection */
import { useTranslations } from 'use-intl';
import { useMemo } from 'react';
import ChartMulti from '../../charts/ChartMulti';
import { financialTrendsCharts } from '../../../lib/settings/report.settings';
import { MultiGraphDataType } from '../../../types/charts';
import countryCodes from '../../../lib/data/countryCodes.json';

interface FinancialTrendsProps {
  financialData: any[];
  benchmarkData: any[];
  companyName: string;
  currency: string;
}

const FinancialTrends = ({
  financialData,
  benchmarkData,
  companyName,
  currency
}: FinancialTrendsProps) => {
  const t = useTranslations();

  const chartsToRender = useMemo(
    () =>
      Object.keys(financialTrendsCharts).map((key: string) =>
        financialTrendsCharts[key.toString()]([
          {
            name: companyName,
            data: financialData
          },
          {
            name: 'Wiserfunding Benchmarks',
            data: benchmarkData
          }
        ])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // OLD CODE BELOW
  //* remove all charts with all empty company chart y values and divide into arrays of 6 for print layout
  // const filteredCharts = chartsToRender
  //   .filter((chart: any) =>
  //     chart.data[0].data.every((data: any) => data.y !== 0)
  //   )
  //   .reduce(
  //     (acc: any, curr: any, index) =>
  //       (index % 6 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
  //       acc,
  //     []
  //   );

  // NEW CODE BELOW -
  // charts split into arrays of 6 for print layout
  const filteredCharts = chartsToRender.reduce(
    (acc: any, curr: any, index) =>
      (index % 6 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
      acc,
    []
  );

  // find currency symbol from currency code
  const currencySymbol = countryCodes.find(
    country => country.currency_code === currency
  )?.currency_symbol;

  return (
    <div>
      {filteredCharts.map(
        (graphSection: MultiGraphDataType[], index: number) => {
          return (
            <div
              key={index}
              className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-2 print:grid-cols-3 sm:print:grid-cols-3  mt-2  md:print:grid-cols-3 avoid-break ${
                index !== 0 && 'print:pt-20'
              }`}
            >
              {graphSection.map((chart: any) => {
                return (
                  <ChartMulti
                    currencySymbol={currencySymbol}
                    // render graph as disabled when no data
                    disabled={chart.data[0].data.every(
                      (data: any) => data.y === 0
                    )}
                    key={chart.header}
                    header={`${t(chart.header)}`}
                    subHeader={`${t(chart.subHeader)}`}
                    graphData={chart.data}
                    hintTitle={chart.hint.title}
                    hintBody={chart.hint.body}
                    chartType={chart.type}
                  />
                );
              })}
            </div>
          );
        }
      )}
    </div>
  );
};

export default FinancialTrends;
