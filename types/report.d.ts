



export type FinancialYear = {
  [index: string]: string;
  year: string;
  sales: string;
  profit_and_loss_before_tax: string;
  total_shareholder_funds: string;
  capital: string; // couldn't see key for 'tangible worth'
  tangible_fixed_assets: string;
  total_assets: string;
  current_assets: string;
  current_liabilities: string;
  net_current_assets: string;
  employees: string;
  value: string;
};

export type SummaryInfo = {
  regNumber: string;
  sector: string;
  description: string;
  incorporationDate: number | string;
  lastAccountDate: number | string;
};

export type SummaryContact = {
  address_line_1: string | null;
  address_line_2: string | null;
  address_line_3: string | null;
  address_line_4: string | null;
  postal_code: string | null;
  phone_numbers: string[];
  websites: string[];
  emails: string[];
};
