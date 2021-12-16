/* eslint-disable sonarjs/no-duplicate-string */
import { HintTypeProps } from '../../components/elements/Hint';
import { MultiGraphDataType } from '../../types/charts';

const poundsThousands = '£_thousands';

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

const fixedNum = (value: number) => {
  return value && Number(value.toFixed(2));
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
      { title: 'turnover.title', body: 'turnover.body' },

      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.turnover
          }))
        }
      ]
    ),
  totalAssets: (data: MultiGraphDataType[]) =>
    createChart(
      'total_assets',
      poundsThousands,
      { title: 'total_assets.title', body: 'total_assets.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.total_assets
          }))
        }
      ]
    ),

  ebit: (data: MultiGraphDataType[]) =>
    createChart(
      'ebit',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.ebit
          }))
        }
      ]
    ),
  ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.ebitda
          }))
        }
      ]
    ),
  total_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt',
      poundsThousands,
      { title: 'total_debt.title', body: 'total_debt.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.total_debt
          }))
        }
      ]
    ),
  cash_and_cash_equivalent: (data: MultiGraphDataType[]) =>
    createChart(
      'cash_and_cash_equivalent',
      poundsThousands,
      { title: 'cash_and_cash_equivalent.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.cash_and_cash_equivalents
          }))
        }
      ]
    ),
  interest_expenses: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_expenses',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.interest_expenses
          }))
        }
      ]
    ),
  net_income: (data: MultiGraphDataType[]) =>
    createChart(
      'net_income',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.net_income
          }))
        }
      ]
    ),
  shareholders_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'shareholders_equity',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.total_shareholders_equity
          }))
        }
      ]
    ),
  retained_earnings: (data: MultiGraphDataType[]) =>
    createChart(
      'retained_earnings',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.retained_earnings
          }))
        }
      ]
    ),
  days_receivable: (data: MultiGraphDataType[]) =>
    createChart(
      'days_receivable',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  days_payable: (data: MultiGraphDataType[]) =>
    createChart(
      'days_payable',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  ebitda_margin: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda_margin',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  total_debt_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt_total_assets',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: fixedNum(year.total_debt / year.total_assets)
          }))
        }
      ]
    ),
  debt_equity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'debt_equity_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: fixedNum(year.total_debt / year.total_shareholders_equity)
          }))
        }
      ]
    ),
  equity_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'equity_total_assets',
      poundsThousands,
      { title: 'equity_total_assets.title', body: 'ebit.body' },
      data
    ),
  tangible_fixed_assets_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'tangible_fixed_assets_total_assets',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: fixedNum(year.tangible_fixed_assets / year.total_assets)
          }))
        }
      ]
    ),
  intangible_fixed_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'intangible_fixed_assets',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: fixedNum(year.intangible_fixed_assets / year.total_assets)
          }))
        }
      ]
    ),
  interest_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_coverage_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.turnover
          }))
        }
      ]
    ),
  return_on_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'return_on_equity',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  return_on_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'return_on_assets',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  liquidity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'liquidity_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  current_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'current_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: fixedNum(year.current_ratio)
          }))
        }
      ]
    ),
  net_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      [
        {
          name: data[0].name,
          data: data[0].data.map((year: any) => ({
            x: year.period,
            y: year.net_debt
          }))
        }
      ]
    ),
  net_debt_ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt_ebitda',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  deby_service_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'deby_service_coverage_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    )
};

export const batchReport = {
  averageTime: 100 // average report generation time in ms
};
