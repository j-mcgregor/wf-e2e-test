export const mdi_example_body = {
  currency: 'string',
  iso_code: 'string',
  company_id: 'string',
  company_type: 'enum', // Large | Medium | Small
  company_age: 'number',
  details: {
    name: 'string',
    industry_sector_code: 'number',
    website: 'string',
    nace_code: 'number'
  },
  financials: [
    {
      cash_and_equivalents: 'number',
      creditors: 'number',
      current_assets: 'number',
      current_liabilities: 'number',
      debtors: 'number',
      ebit: 'number',
      ebitda: 'number',
      fixed_assets: 'number',
      intangible_fixed_assets: 'number',
      interest_expenses: 'number',
      inventory: 'number',
      loans: 'number',
      long_term_debt: 'number',
      management_experience: 'ENUM', // High | Medium | Low
      net_income: 'number',
      non_current_liabilities: 'number',
      number_of_directors: 'number',
      number_of_subsidiaries: 'number',
      number_of_employees: 'number',
      other_non_current_liabilities: 'number',
      period: 'date',
      retained_earnings: 'number',
      short_term_debt: 'number',
      tangible_fixed_assets: 'number',
      total_assets: 'number',
      total_liabilities: 'number',
      total_shareholder_equity: 'number',
      turnover: 'number',
      working_capital: 'number'
      // ======= incoming =======
      // sqrt_equity_total_assets: 'number',
      // sqrt_debt_total_assets: 'number',
      // ln_cash_total_assets: 'number',
      // retained_earnings_equity: 'number'
    }
  ]
};
