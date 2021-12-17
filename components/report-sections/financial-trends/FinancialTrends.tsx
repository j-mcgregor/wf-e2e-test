import { useTranslations } from 'use-intl';
import { useMemo } from 'react';
import ChartMulti from '../../charts/ChartMulti';
import { financialTrendsCharts } from '../../../lib/settings/report.settings';

interface FinancialTrendsProps {
  financialData: {
    [key: string]: number | string | null;
  }[]; // 2D array of arrays of objects
  companyName: string;
}

const FinancialTrends = ({
  financialData,
  companyName
}: FinancialTrendsProps) => {
  const t = useTranslations();

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
      <ChartMulti
        key={allCharts.turnover.header}
        header={`${t(allCharts.turnover.header)}`}
        subHeader={`${t(allCharts.turnover.subHeader)}`}
        graphData={allCharts.turnover.data}
        hintTitle={allCharts.turnover.hint.title}
        hintBody={allCharts.turnover.hint.body}
      />
      <ChartMulti
        key={allCharts.total_assets.header}
        header={`${t(allCharts.total_assets.header)}`}
        subHeader={`${t(allCharts.total_assets.subHeader)}`}
        graphData={allCharts.total_assets.data}
        hintTitle={allCharts.total_assets.hint.title}
        hintBody={allCharts.total_assets.hint.body}
      />
      <ChartMulti
        key={allCharts.ebit.header}
        header={`${t(allCharts.ebit.header)}`}
        subHeader={`${t(allCharts.ebit.subHeader)}`}
        graphData={allCharts.ebit.data}
        hintTitle={allCharts.ebit.hint.title}
        hintBody={allCharts.ebit.hint.body}
      />
      <ChartMulti
        key={allCharts.ebitda.header}
        header={`${t(allCharts.ebitda.header)}`}
        subHeader={`${t(allCharts.ebitda.subHeader)}`}
        graphData={allCharts.ebitda.data}
        hintTitle={allCharts.ebitda.title}
        hintBody={allCharts.ebitda.body}
      />
      <ChartMulti
        key={allCharts.total_debt.header}
        header={`${t(allCharts.total_debt.header)}`}
        subHeader={`${t(allCharts.total_debt.subHeader)}`}
        graphData={allCharts.total_debt.data}
        hintTitle={allCharts.total_debt.hint.title}
        hintBody={allCharts.total_debt.hint.body}
      />
      <ChartMulti
        key={allCharts.cash_and_cash_equivalent.header}
        header={`${t(allCharts.cash_and_cash_equivalent.header)}`}
        subHeader={`${t(allCharts.cash_and_cash_equivalent.subHeader)}`}
        graphData={allCharts.cash_and_cash_equivalent.data}
        hintTitle={allCharts.cash_and_cash_equivalent.hint.title}
        hintBody={allCharts.cash_and_cash_equivalent.hint.body}
      />
      <ChartMulti
        key={allCharts.interest_expenses.header}
        header={`${t(allCharts.interest_expenses.header)}`}
        subHeader={`${t(allCharts.interest_expenses.subHeader)}`}
        graphData={allCharts.interest_expenses.data}
        hintTitle={allCharts.interest_expenses.hint.title}
        hintBody={allCharts.interest_expenses.hint.body}
      />
      <ChartMulti
        key={allCharts.net_income.header}
        header={`${t(allCharts.net_income.header)}`}
        subHeader={`${t(allCharts.net_income.subHeader)}`}
        graphData={allCharts.net_income.data}
        hintTitle={allCharts.net_income.hint.title}
        hintBody={allCharts.net_income.hint.body}
      />
      <ChartMulti
        key={allCharts.shareholders_equity.header}
        header={`${t(allCharts.shareholders_equity.header)}`}
        subHeader={`${t(allCharts.shareholders_equity.subHeader)}`}
        graphData={allCharts.shareholders_equity.data}
        hintTitle={allCharts.shareholders_equity.hint.title}
        hintBody={allCharts.shareholders_equity.hint.body}
      />
      <ChartMulti
        key={allCharts.retained_earnings.header}
        header={`${t(allCharts.retained_earnings.header)}`}
        subHeader={`${t(allCharts.retained_earnings.subHeader)}`}
        graphData={allCharts.retained_earnings.data}
        hintTitle={allCharts.retained_earnings.hint.title}
        hintBody={allCharts.retained_earnings.hint.body}
      />
      <ChartMulti
        key={allCharts.days_receivable.header}
        header={`${t(allCharts.days_receivable.header)}`}
        subHeader={`${t(allCharts.days_receivable.subHeader)}`}
        graphData={allCharts.days_receivable.data}
        hintTitle={allCharts.days_receivable.hint.title}
        hintBody={allCharts.days_receivable.hint.body}
      />
      <ChartMulti
        key={allCharts.days_payable.header}
        header={`${t(allCharts.days_payable.header)}`}
        subHeader={`${t(allCharts.days_payable.subHeader)}`}
        graphData={allCharts.days_payable.data}
        hintTitle={allCharts.days_payable.hint.title}
        hintBody={allCharts.days_payable.hint.body}
      />
      <ChartMulti
        key={allCharts.ebitda_margin.header}
        header={`${t(allCharts.ebitda_margin.header)}`}
        subHeader={`${t(allCharts.ebitda_margin.subHeader)}`}
        graphData={allCharts.ebitda_margin.data}
        hintTitle={allCharts.ebitda_margin.hint.title}
        hintBody={allCharts.ebitda_margin.hint.body}
      />
      <ChartMulti
        key={allCharts.total_debt_total_assets.header}
        header={`${t(allCharts.total_debt_total_assets.header)}`}
        subHeader={`${t(allCharts.total_debt_total_assets.subHeader)}`}
        graphData={allCharts.total_debt_total_assets.data}
        hintTitle={allCharts.total_debt_total_assets.hint.title}
        hintBody={allCharts.total_debt_total_assets.hint.body}
      />
      <ChartMulti
        key={allCharts.debt_equity_ratio.header}
        header={`${t(allCharts.debt_equity_ratio.header)}`}
        subHeader={`${t(allCharts.debt_equity_ratio.subHeader)}`}
        graphData={allCharts.debt_equity_ratio.data}
        hintTitle={allCharts.debt_equity_ratio.hint.title}
        hintBody={allCharts.debt_equity_ratio.hint.body}
      />
      <ChartMulti
        key={allCharts.equity_total_assets.header}
        header={`${t(allCharts.equity_total_assets.header)}`}
        subHeader={`${t(allCharts.equity_total_assets.subHeader)}`}
        graphData={allCharts.equity_total_assets.data}
        hintTitle={allCharts.equity_total_assets.hint.title}
        hintBody={allCharts.equity_total_assets.hint.body}
      />
      <ChartMulti
        key={allCharts.tangible_fixed_assets_total_assets.header}
        header={`${t(allCharts.tangible_fixed_assets_total_assets.header)}`}
        subHeader={`${t(
          allCharts.tangible_fixed_assets_total_assets.subHeader
        )}`}
        graphData={allCharts.tangible_fixed_assets_total_assets.data}
        hintTitle={allCharts.tangible_fixed_assets_total_assets.hint.title}
        hintBody={allCharts.tangible_fixed_assets_total_assets.hint.body}
      />
      <ChartMulti
        key={allCharts.intangible_fixed_assets.header}
        header={`${t(allCharts.intangible_fixed_assets.header)}`}
        subHeader={`${t(allCharts.intangible_fixed_assets.subHeader)}`}
        graphData={allCharts.intangible_fixed_assets.data}
        hintTitle={allCharts.intangible_fixed_assets.hint.title}
        hintBody={allCharts.intangible_fixed_assets.hint.body}
      />
      <ChartMulti
        key={allCharts.interest_coverage_ratio.header}
        header={`${t(allCharts.interest_coverage_ratio.header)}`}
        subHeader={`${t(allCharts.interest_coverage_ratio.subHeader)}`}
        graphData={allCharts.interest_coverage_ratio.data}
        hintTitle={allCharts.interest_coverage_ratio.hint.title}
        hintBody={allCharts.interest_coverage_ratio.hint.body}
      />
      <ChartMulti
        key={allCharts.return_on_equity.header}
        header={`${t(allCharts.return_on_equity.header)}`}
        subHeader={`${t(allCharts.return_on_equity.subHeader)}`}
        graphData={allCharts.return_on_equity.data}
        hintTitle={allCharts.return_on_equity.hint.title}
        hintBody={allCharts.return_on_equity.hint.body}
      />
      <ChartMulti
        key={allCharts.return_on_assets.header}
        header={`${t(allCharts.return_on_assets.header)}`}
        subHeader={`${t(allCharts.return_on_assets.subHeader)}`}
        graphData={allCharts.return_on_assets.data}
        hintTitle={allCharts.return_on_assets.hint.title}
        hintBody={allCharts.return_on_assets.hint.body}
      />
      <ChartMulti
        key={allCharts.liquidity_ratio.header}
        header={`${t(allCharts.liquidity_ratio.header)}`}
        subHeader={`${t(allCharts.liquidity_ratio.subHeader)}`}
        graphData={allCharts.liquidity_ratio.data}
        hintTitle={allCharts.liquidity_ratio.hint.title}
        hintBody={allCharts.liquidity_ratio.hint.body}
      />
      <ChartMulti
        key={allCharts.current_ratio.header}
        header={`${t(allCharts.current_ratio.header)}`}
        subHeader={`${t(allCharts.current_ratio.subHeader)}`}
        graphData={allCharts.current_ratio.data}
        hintTitle={allCharts.current_ratio.hint.title}
        hintBody={allCharts.current_ratio.hint.body}
      />
      <ChartMulti
        key={allCharts.net_debt.header}
        header={`${t(allCharts.net_debt.header)}`}
        subHeader={`${t(allCharts.net_debt.subHeader)}`}
        graphData={allCharts.net_debt.data}
        hintTitle={allCharts.net_debt.hint.title}
        hintBody={allCharts.net_debt.hint.body}
      />

      <ChartMulti
        key={allCharts.net_debt_ebitda.header}
        header={`${t(allCharts.net_debt_ebitda.header)}`}
        subHeader={`${t(allCharts.net_debt_ebitda.subHeader)}`}
        graphData={allCharts.net_debt_ebitda.data}
        hintTitle={allCharts.net_debt_ebitda.hint.title}
        hintBody={allCharts.net_debt_ebitda.hint.body}
      />
      <ChartMulti
        key={allCharts.debt_service_coverage_ratio.header}
        header={`${t(allCharts.debt_service_coverage_ratio.header)}`}
        subHeader={`${t(allCharts.debt_service_coverage_ratio.subHeader)}`}
        graphData={allCharts.debt_service_coverage_ratio.data}
        hintTitle={allCharts.debt_service_coverage_ratio.hint.title}
        hintBody={allCharts.debt_service_coverage_ratio.hint.body}
      />
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
