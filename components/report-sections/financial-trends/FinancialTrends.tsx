/* eslint-disable security/detect-object-injection */
import { useTranslations } from 'use-intl';
import { useMemo } from 'react';
import ChartMulti from '../../charts/ChartMulti';
import { financialTrendsCharts } from '../../../lib/settings/report.settings';

interface FinancialTrendsProps {
  financialData: any[];
  benchmarkData: any[];
  companyName: string;
}

const FinancialTrends = ({
  financialData,
  benchmarkData,
  companyName
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
            name: 'Industry Benchmarks',
            data: benchmarkData
          }
        ])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // print assistance (breaking up page)
  // const graphSections: MultiGraphDataType[][] = chartsToRender.reduce(
  //   (acc: any, curr: any, index) =>
  //     (index % 6 == 0 ? acc.push([curr]) : acc[acc.length - 1].push(curr)) &&
  //     acc,
  //   []
  // );

  const allCharts = chartsToRender.reduce((obj: any, key) => {
    obj[key.header] = key;
    return obj;
  }, {});

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 print:grid-cols-3 sm:print:grid-cols-3  mt-2  md:print:grid-cols-3 avoid-break">
      {Object.keys(allCharts).map((key: any) => (
        <ChartMulti
          key={allCharts[key].header}
          header={`${t(allCharts[key].header)}`}
          subHeader={`${t(allCharts[key].subHeader)}`}
          graphData={allCharts[key].data}
          hintTitle={allCharts[key].hint.title}
          hintBody={allCharts[key].hint.body}
        />
      ))}

      {/* {graphSections.map(
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
      )} */}
    </div>
  );
};

export default FinancialTrends;
