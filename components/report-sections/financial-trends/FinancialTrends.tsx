import { useTranslations } from 'use-intl';
import { useMemo } from 'react';
import ChartMulti from '../../charts/ChartMulti';
import { MultiGraphDataType, GraphDataType } from '../../../types/charts';
import { financialTrendsCharts } from '../../../lib/settings/report.settings';
import { FinancialYear } from '../../../types/report';

interface FinancialTrendsProps {
  financialData: FinancialYear[]; // 2D array of arrays of objects
  companyName: string;
}

const FinancialTrends = ({
  financialData,
  companyName
}: FinancialTrendsProps) => {
  const t = useTranslations();

  // 5 years of financial data
  // data = array of chart data
  // console.log(financialData);
  const chartsToRender = useMemo(
    () =>
      Object.keys(financialTrendsCharts).map((key: string) =>
        financialTrendsCharts[key.toString()]([
          {
            // replace with company name
            name: companyName,
            data: financialData
          }
          // {
          //   name: 'Industry Benchmark',
          //   data: [
          //     { x: '2016', y: 400 },
          //     { x: '2017', y: 380 },
          //     { x: '2018', y: 341 },
          //     { x: '2019', y: 500 },
          //     { x: '2020', y: 645 }
          //   ]
          // },
          // {
          //   name: 'Region Benchmark',
          //   data: [
          //     { x: '2016', y: 500 },
          //     { x: '2017', y: 480 },
          //     { x: '2018', y: 580 },
          //     { x: '2019', y: 740 },
          //     { x: '2020', y: 780 }
          //   ]
          // }
        ])
      ),
    []
  );

  // eslint-disable-next-line no-console
  console.log(chartsToRender);

  // print assistance (breaking up page)
  const graphSections: MultiGraphDataType[][] = chartsToRender.reduce(
    (acc: any, curr: any, index) =>
      (index % 6 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
      acc,
    []
  );

  return (
    <div>
      {graphSections.map(
        (graphSection: MultiGraphDataType[], index: number) => {
          return (
            <div
              key={index}
              className={`grid sm:grid-cols-2 md:grid-cols-3 gap-2 print:grid-cols-3 sm:print:grid-cols-3  mt-2  md:print:grid-cols-3 avoid-break ${
                index !== 0 && 'print:pt-20'
              }`}
            >
              {graphSection.map((chart: any) => {
                return (
                  <ChartMulti
                    key={chart.header}
                    header={`${t(chart.header)}`}
                    subHeader={`${t(chart.subHeader)}`}
                    graphData={chart.data}
                    hintTitle={chart.hint.title}
                    hintBody={chart.hint.body}
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
