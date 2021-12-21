/* eslint-disable sonarjs/no-duplicate-string */
import { HintTypeProps } from '../../components/elements/Hint';
import { MultiGraphDataType } from '../../types/charts';

const poundsThousands = '£_thousands';
const ratio = 'ratio';

export const bondRatings = [
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
};

const createChart = (
  header: string,
  subHeader: string,
  hint: HintTypeProps,
  data: MultiGraphDataType[]
): ReportChartType => {
  // function to find max y value
  return {
    header, // translatable
    subHeader, // translate
    hint,
    data
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
  credit_rating: (data: MultiGraphDataType[]) =>
    createChart(
      'credit_rating',
      'monthly',
      {
        title: 'credit_rating.title',
        body: 'credit_rating.body'
      },
      data
    )
};

type AllFinancialTrendsChartsType = {
  [index: string]: (data: MultiGraphDataType[]) => ReportChartType;
};

export const financialTrendsCharts: AllFinancialTrendsChartsType = {
  turnover: (data: any) =>
    createChart(
      'turnover',
      poundsThousands,
      { title: 'charts.turnover.title', body: 'charts.turnover.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.turnover / 1000 || 0
        }))
      }))
    ),
  totalAssets: (data: MultiGraphDataType[]) =>
    createChart(
      'total_assets',
      poundsThousands,
      { title: 'charts.total_assets.title', body: 'charts.total_assets.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.total_assets / 1000 || 0
        }))
      }))
    ),

  ebit: (data: MultiGraphDataType[]) =>
    createChart(
      'ebit',
      poundsThousands,
      { title: 'charts.ebit.title', body: 'charts.ebit.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.ebit / 1000 || 0
        }))
      }))
    ),
  ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda',
      poundsThousands,
      { title: 'charts.ebitda.title', body: 'charts.ebitda.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.ebitda / 1000 || 0
        }))
      }))
    ),
  total_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt',
      poundsThousands,
      { title: 'total_debt.title', body: 'total_debt.body' },
      data.map((chart: any, i) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.total_debt / 1000 || 0
        }))
      }))
    ),
  cash_and_cash_equivalent: (data: MultiGraphDataType[]) =>
    createChart(
      'cash_and_cash_equivalent',
      poundsThousands,
      {
        title: 'charts.cash_and_cash_equivalent.title',
        body: 'charts.cash_and_cash_equivalent.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.cash_and_equivalents / 1000 || 0
        }))
      }))
    ),
  interest_expenses: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_expenses',
      poundsThousands,
      {
        title: 'charts.interest_expenses.title',
        body: 'charts.interest_expenses.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.interest_expenses / 1000 || 0
        }))
      }))
    ),
  net_income: (data: MultiGraphDataType[]) =>
    createChart(
      'net_income',
      poundsThousands,
      { title: 'charts.net_income.title', body: 'charts.net_income.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.net_income / 1000 || 0
        }))
      }))
    ),
  shareholders_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'shareholders_equity',
      poundsThousands,
      {
        title: 'charts.shareholders_equity.title',
        body: 'charts.shareholders_equity.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.total_shareholder_equity / 1000 || 0
        }))
      }))
    ),
  retained_earnings: (data: MultiGraphDataType[]) =>
    createChart(
      'retained_earnings',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.retained_earnings / 1000 || 0
        }))
      }))
    ),
  days_receivable: (data: MultiGraphDataType[]) =>
    createChart(
      'days_receivable',
      poundsThousands,
      {
        title: 'charts.days_receivable.title',
        body: 'charts.days_receivable.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.days_receivable / 1000 || 0
        }))
      }))
    ),
  days_payable: (data: MultiGraphDataType[]) =>
    createChart(
      'days_payable',
      poundsThousands,
      {
        title: 'charts.days_receivable.title',
        body: 'charts.days_receivable.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.days_payable / 1000 || 0
        }))
      }))
    ),
  ebitda_margin: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda_margin',
      poundsThousands,
      {
        title: 'charts.ebitda_margin.title',
        body: 'charts.ebitda_margin.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.ebitda_margin / 1000 || 0
        }))
      }))
    ),
  total_debt_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt_total_assets',
      ratio,
      {
        title: 'charts.total_debt_total_assets.title',
        body: 'charts.total_debt_total_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.debt_total_assets || 0
        }))
      }))
    ),
  debt_equity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'debt_equity_ratio',
      ratio,
      {
        title: 'charts.debt_equity_ratio.title',
        body: 'charts.debt_equity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.debt_equity || 0
        }))
      }))
    ),
  equity_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'equity_total_assets',
      poundsThousands,
      {
        title: 'charts.equity_total_assets.title',
        body: 'charts.equity_total_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.equity_book_value_total_assets || 0
        }))
      }))
    ),
  tangible_fixed_assets_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'tangible_fixed_assets_total_assets',
      ratio,
      {
        title: 'charts.tangible_fixed_assets_total_assets.title',
        body: 'charts.tangible_fixed_assets_total_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.tangible_fixed_assets || 0
        }))
      }))
    ),
  intangible_fixed_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'intangible_fixed_assets',
      ratio,
      {
        title: 'charts.intangible_fixed_assets.title',
        body: 'charts.intangible_fixed_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.intangible_fixed_assets || 0
        }))
      }))
    ),
  interest_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_coverage_ratio',
      ratio,
      {
        title: 'charts.interest_coverage_ratio.title',
        body: 'charts.interest_coverage_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.interest_cover || 0
        }))
      }))
    ),
  return_on_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'return_on_equity',
      poundsThousands,
      {
        title: 'charts.return_on_equity.title',
        body: 'charts.return_on_equity.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.return_on_equity / 1000 || 0
        }))
      }))
    ),
  return_on_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'return_on_assets',
      poundsThousands,
      {
        title: 'charts.return_on_assets.title',
        body: 'charts.return_on_assets.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.return_on_capital_employed / 1000 || 0
        }))
      }))
    ),
  liquidity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'liquidity_ratio',
      ratio,
      {
        title: 'charts.liquidity_ratio.title',
        body: 'charts.liquidity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.liquidity || 0
        }))
      }))
    ),
  current_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'current_ratio',
      ratio,
      {
        title: 'charts.liquidity_ratio.title',
        body: 'charts.liquidity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.current_ratio || 0
        }))
      }))
    ),
  net_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt',
      poundsThousands,
      {
        title: 'charts.liquidity_ratio.title',
        body: 'charts.liquidity_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.net_debt / 1000 || 0
        }))
      }))
    ),
  net_debt_ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt_ebitda',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.net_debt_ebitda / 1000 || 0
        }))
      }))
    ),
  debt_service_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'debt_service_coverage_ratio',
      ratio,
      {
        title: 'charts.debt_service_coverage_ratio.title',
        body: 'charts.debt_service_coverage_ratio.body'
      },
      data.map((chart: any) => ({
        name: chart.name,
        data: chart.data.map((year: any) => ({
          x: year.period,
          y: year.debt_service_coverage || 0
        }))
      }))
    )
};

export const batchReport = {
  averageTime: 100 // average report generation time in ms
};
