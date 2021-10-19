/* eslint-disable sonarjs/no-duplicate-string */
import { HintTypeProps } from '../../components/elements/Hint';
import { MultiGraphDataType, GraphDataType } from '../../types/charts';

const poundsThousands = '£_thousands';

export const bondRatings = [
  {
    score: 'CC',
    bgColor: 'rgb(220,11,23), rgb(220,44,20)',
    width: '8.5%'
  },
  {
    score: 'CCC',
    bgColor: 'rgb(220,44,20), rgb(220,80,17)',
    width: '8.5%'
  },
  {
    score: 'B-',
    bgColor: 'rgb(220,80,17), rgb(217,124,13)',
    width: '17%'
  },
  {
    score: 'BB',
    bgColor: 'rgb(217,124,13), rgb(216,181,9)',
    width: '17%'
  },
  {
    score: 'BBB',
    bgColor: 'rgb(216,181,9), rgb(159,180,7)',
    width: '25.5%'
  },
  {
    score: 'A',
    bgColor: 'rgb(159,180,7), rgb(94,145,5)',
    width: '25.5%'
  },
  {
    score: 'AA',
    bgColor: 'rgb(94,145,5), rgb(52,120,1)',
    width: '8.5%'
  },
  {
    score: 'AAA',
    bgColor: 'rgb(52,120,1), rgb(27,102,2)',
    width: '8.5%'
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
        title: 'gdp_annual_growth_rate.title',
        body: 'gdp_annual_growth_rate.body'
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
  turnover: (data: MultiGraphDataType[]) =>
    createChart(
      'turnover',
      poundsThousands,
      { title: 'turnover.title', body: 'turnover.body' },
      data
    ),

  turnover2: (data: MultiGraphDataType[]) =>
    createChart(
      'turnover2',
      poundsThousands,
      { title: 'turnover.title', body: 'turnover.body' },
      data
    ),

  ebit: (data: MultiGraphDataType[]) =>
    createChart(
      'ebit',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  ebitda: (data: MultiGraphDataType[]) =>
    createChart(
      'ebitda',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  total_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'total_debt',
      poundsThousands,
      { title: 'total_debt.title', body: 'total_debt.body' },
      data
    ),
  cash_and_cash_equivalent: (data: MultiGraphDataType[]) =>
    createChart(
      'cash_and_cash_equivalent',
      poundsThousands,
      { title: 'cash_and_cash_equivalent.title', body: 'ebit.body' },
      data
    ),
  interest_expenses: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_expenses',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  net_income: (data: MultiGraphDataType[]) =>
    createChart(
      'net_income',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  shareholders_equity: (data: MultiGraphDataType[]) =>
    createChart(
      'shareholders_equity',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  retained_earnings: (data: MultiGraphDataType[]) =>
    createChart(
      'retained_earnings',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
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
      data
    ),
  debt_equity_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'debt_equity_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  equity_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'days_payable',
      poundsThousands,
      { title: 'days_payable.title', body: 'ebit.body' },
      data
    ),
  tangible_fixed_assets_total_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'tangible_fixed_assets_total_assets',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  intangible_fixed_assets: (data: MultiGraphDataType[]) =>
    createChart(
      'intangible_fixed_assets',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
    ),
  interest_coverage_ratio: (data: MultiGraphDataType[]) =>
    createChart(
      'interest_coverage_ratio',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
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
      data
    ),
  net_debt: (data: MultiGraphDataType[]) =>
    createChart(
      'net_debt',
      poundsThousands,
      { title: 'ebit.title', body: 'ebit.body' },
      data
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

export const validHeaders = [
  'company_name',
  'company_id',
  'sme_z_score',
  'p_d_ratio\r'
];

export const requiredValues = [
  'sme_z_score',
  'company_name',
  'company_id',
  'p_d_ratio\r'
];
