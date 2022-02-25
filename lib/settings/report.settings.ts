/* eslint-disable sonarjs/no-duplicate-string */
import { HintTypeProps } from '../../components/elements/Hint';
import { MultiGraphDataType } from '../../types/charts';

const thousands = 'thousands';
const ratio = 'ratio';

export const bondRatings = [
  {
    score: 'D',
    bgColor: 'rgb(153 27 27), rgb(220,44,20)',
    width: '9.09%'
  },
  {
    score: 'CC',
    bgColor: 'rgb(220,11,23), rgb(220,44,20)',
    width: '9.09%'
  },
  {
    score: 'CCC-',
    bgColor: 'rgb(220,11,23), rgb(220,44,20)',
    width: '9.09%'
  },
  {
    score: 'CCC',
    bgColor: 'rgb(220,11,23), rgb(220,44,20)',
    width: '9.09%'
  },
  {
    score: 'CCC+',
    bgColor: 'rgb(220,80,17), rgb(217,124,13)',
    width: '9.09%'
  },
  {
    score: 'B-',
    bgColor: 'rgb(217,124,13), rgb(216,181,9)',
    width: '9.09%'
  },
  {
    score: 'B',
    bgColor: 'rgb(216,181,9), rgb(216,181,9)',
    width: '9.09%'
  },
  {
    score: 'BB',
    bgColor: 'rgb(216,181,9), rgb(159,180,7)',
    width: '9.09%'
  },
  {
    score: 'BBB-',
    bgColor: 'rgb(159,180,7), rgb(94,145,5)',
    width: '9.09%'
  },
  {
    score: 'BBB',
    bgColor: 'rgb(94,145,5), rgb(52,120,1)',
    width: '9.09%'
  },
  {
    score: 'BBB+',
    bgColor: 'rgb(94,145,5), rgb(52,120,1)',
    width: '9.09%'
  },
  {
    score: 'A',
    bgColor: 'rgb(52,120,1), rgb(27,102,2)',
    width: '9.09%'
  }
];

// negative values used in legal events table
export const negativeValues = ['Negative Event'];

export type ReportChartType = {
  header: string;
  subHeader: string;
  hint: HintTypeProps;
  data: MultiGraphDataType[];
  type?: string;
};

const createChart = (
  header: string,
  subHeader: string,
  hint: HintTypeProps,
  data: MultiGraphDataType[],
  type?: 'currency' | 'ratio' | 'percentage' | 'days'
): ReportChartType => {
  // function to find max y value
  return {
    header, // translatable
    subHeader, // translate
    hint,
    data,
    type
    // data: dataMap ? dataMap(data) : data
  };
};

type AllMultiGraphChartsType = {
  [index: string]: (data: MultiGraphDataType[]) => ReportChartType;
};

export const macroEconomicTrendCharts: AllMultiGraphChartsType = {
  gdp_growth_rate: (data: MultiGraphDataType[]) =>
    createChart(
      'gdp_growth_rate',
      'quarterly',
      {
        title: 'gdp_growth_rate.title',
        body: 'gdp_growth_rate.body'
      },
      data
    ),
  gdp_annual_growth_rate: (data: MultiGraphDataType[]) =>
    createChart(
      'gdp_annual_growth_rate',
      'quarterly',
      {
        title: 'gdp_annual_growth.title',
        body: 'gdp_annual_growth.body'
      },
      data
    ),
  gdp_per_capita: (data: MultiGraphDataType[]) =>
    createChart(
      'gdp_per_capita',
      'yearly',
      {
        title: 'gdp_per_capita.title',
        body: 'gdp_per_capita.body'
      },
      data
    ),
  unemployment_rate: (data: MultiGraphDataType[]) =>
    createChart(
      'unemployment_rate',
      'monthly',
      {
        title: 'unemployment_rate.title',
        body: 'unemployment_rate.body'
      },
      data
    ),
  annual_inflation_rate: (data: MultiGraphDataType[]) =>
    createChart(
      'annual_inflation_rate',
      'monthly',
      {
        title: 'annual_inflation_rate.title',
        body: 'annual_inflation_rate.body'
      },
      data
    ),
  interest_rate: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_rate',
      'daily',
      {
        title: 'interest_rate.title',
        body: 'interest_rate.body'
      },
      data
    ),
  consumer_spending_millions: (data: MultiGraphDataType[]) =>
    createChart(
      'consumer_spending_millions',
      'quarterly',
      {
        title: 'consumer_spending_millions.title',
        body: 'consumer_spending_millions.body'
      },
      data
    ),
  government_debt_to_gdp: (data: MultiGraphDataType[]) =>
    createChart(
      'government_debt_to_gdp',
      'yearly',
      {
        title: 'government_debt_to_gdp.title',
        body: 'government_debt_to_gdp.body'
      },
      data
    ),
  house_price_index: (data: MultiGraphDataType[]) =>
    createChart(
      'house_price_index',
      'monthly',
      {
        title: 'house_price_index.title',
        body: 'house_price_index.body'
      },
      data
    ),
  stock_market_uk: (data: MultiGraphDataType[]) =>
    createChart(
      'stock_market_uk',
      'daily',
      {
        title: 'stock_market_uk.title',
        body: 'stock_market_uk.body'
      },
      data
    ),
  consumer_price_index: (data: MultiGraphDataType[]) =>
    createChart(
      'consumer_price_index',
      'monthly',
      {
        title: 'consumer_price_index.title',
        body: 'consumer_price_index.body'
      },
      data
    ),
  bankruptcies: (data: MultiGraphDataType[]) =>
    createChart(
      'bankruptcies',
      'quarterly',
      {
        title: 'bankruptcies.title',
        body: 'bankruptcies.body'
      },
      data
    )
  // credit_rating: (data: MultiGraphDataType[]) =>
  //   createChart(
  //     'credit_rating',
  //     'monthly',
  //     {
  //       title: 'credit_rating.title',
  //       body: 'credit_rating.body'
  //     },
  //     data
  //   )
};

type AllFinancialTrendsChartsType = {
  [index: string]: (data: MultiGraphDataType[]) => ReportChartType;
};

export const financialTrendsCharts: AllFinancialTrendsChartsType = {
  turnover: (data: any) =>
    createChart(
      'turnover',
      thousands,
      {
        title: 'report_hints.charts.turnover.title',
        body: 'report_hints.charts.turnover.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,

          y: Number(year?.turnover?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  totalAssets: (data: MultiGraphDataType[]) => {
    return createChart(
      'total_assets',
      thousands,
      {
        title: 'report_hints.charts.total_assets.title',
        body: 'report_hints.charts.total_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.total_assets?.toFixed(2)) || 0
        }))
      })),
      'currency'
    );
  },

  ebit: (data: MultiGraphDataType[]) =>
    createChart(
      'ebit',
      thousands,
      {
        title: 'report_hints.charts.ebit.title',
        body: 'report_hints.charts.ebit.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.ebit?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda',
      thousands,
      {
        title: 'report_hints.charts.ebitda.title',
        body: 'report_hints.charts.ebitda.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.ebitda?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  total_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt',
      thousands,
      {
        title: 'report_hints.charts.total_debt.title',
        body: 'report_hints.charts.total_debt.body'
      },
      data.map((chart: any, i) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number((year?.total_debt / 1000).toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  cash_and_cash_equivalent: (data: MultiGraphDataType[]) =>
    createChart(
      'cash_and_cash_equivalent',
      thousands,
      {
        title: 'report_hints.charts.cash_and_cash_equivalent.title',
        body: 'report_hints.charts.cash_and_cash_equivalent.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year.cash_and_equivalents?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  interest_expenses: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_expenses',
      thousands,
      {
        title: 'report_hints.charts.interest_expenses.title',
        body: 'report_hints.charts.interest_expenses.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.interest_expenses?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  net_income: (data: MultiGraphDataType[]) =>
    createChart(
      'net_income',
      thousands,
      {
        title: 'report_hints.charts.net_income.title',
        body: 'report_hints.charts.net_income.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.net_income?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  shareholders_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'shareholders_equity',
      thousands,
      {
        title: 'report_hints.charts.shareholders_equity.title',
        body: 'report_hints.charts.shareholders_equity.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.total_shareholder_equity?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  retained_earnings: (data: MultiGraphDataType[]) =>
    createChart(
      'retained_earnings',
      thousands,
      {
        title: 'report_hints.charts.ebit.title',
        body: 'report_hints.charts.ebit.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year.retained_earnings?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  days_receivable: (data: MultiGraphDataType[]) =>
    createChart(
      'days_receivable',
      thousands,
      {
        title: 'report_hints.charts.days_receivable.title',
        body: 'report_hints.charts.days_receivable.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year.days_receivable?.toFixed(2)) || 0
        }))
      })),
      'days'
    ),
  days_payable: (data: MultiGraphDataType[]) =>
    createChart(
      'days_payable',
      thousands,
      {
        title: 'report_hints.charts.days_payable.title',
        body: 'report_hints.charts.days_payable.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.days_payable?.toFixed(2)) || 0
        }))
      })),
      'days'
    ),
  ebitda_margin: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda_margin',
      thousands,
      {
        title: 'report_hints.charts.ebitda_margin.title',
        body: 'report_hints.charts.ebitda_margin.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.ebitda_margin?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  total_debt_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt_total_assets',
      ratio,
      {
        title: 'report_hints.charts.total_debt_total_assets.title',
        body: 'report_hints.charts.total_debt_total_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.debt_total_assets?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  debt_equity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'debt_equity_ratio',
      ratio,
      {
        title: 'report_hints.charts.debt_equity_ratio.title',
        body: 'report_hints.charts.debt_equity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.debt_equity?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  equity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'equity_ratio',
      thousands,
      {
        title: 'report_hints.charts.equity_ratio.title',
        body: 'report_hints.charts.equity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.equity_book_value_total_assets?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  tangible_fixed_assets_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'tangible_fixed_assets_total_assets',
      ratio,
      {
        title: 'report_hints.charts.tangible_fixed_assets_total_assets.title',
        body: 'report_hints.charts.tangible_fixed_assets_total_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number((year?.tangible_total_assets).toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  intangible_fixed_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'intangible_fixed_assets',
      ratio,
      {
        title: 'report_hints.charts.intangible_fixed_assets.title',
        body: 'report_hints.charts.intangible_fixed_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number((year?.intangible_total_assets).toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  interest_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_coverage_ratio',
      ratio,
      {
        title: 'report_hints.charts.interest_coverage_ratio.title',
        body: 'report_hints.charts.interest_coverage_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.interest_cover?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  return_on_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'return_on_equity',
      thousands,
      {
        title: 'report_hints.charts.return_on_equity.title',
        body: 'report_hints.charts.return_on_equity.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number((year?.return_on_equity * 100).toFixed(3)) || 0
        }))
      })),
      'percentage'
    ),
  return_on_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'return_on_assets',
      thousands,
      {
        title: 'report_hints.charts.return_on_assets.title',
        body: 'report_hints.charts.return_on_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.return_on_capital_employed?.toFixed(3)) || 0
        }))
      })),
      'percentage'
    ),
  liquidity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'liquidity_ratio',
      ratio,
      {
        title: 'report_hints.charts.liquidity_ratio.title',
        body: 'report_hints.charts.liquidity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.liquidity?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  current_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'current_ratio',
      ratio,
      {
        title: 'report_hints.charts.current_ratio.title',
        body: 'report_hints.charts.current_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.current_ratio?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  net_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt',
      thousands,
      {
        title: 'report_hints.charts.liquidity_ratio.title',
        body: 'report_hints.charts.liquidity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.net_debt?.toFixed(2)) || 0
        }))
      })),
      'currency'
    ),
  net_debt_ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt_ebitda',
      thousands,
      {
        title: 'report_hints.charts.ebit.title',
        body: 'report_hints.charts.ebit.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.net_debt_ebitda?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    ),
  debt_service_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'debt_service_coverage_ratio',
      ratio,
      {
        title: 'report_hints.charts.debt_service_coverage_ratio.title',
        body: 'report_hints.charts.debt_service_coverage_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: Number(year?.debt_service_coverage?.toFixed(2)) || 0
        }))
      })),
      'ratio'
    )
};

export const batchReport = {
  averageTime: 1000 * 30 // average report generation time in ms
};
