import { CompanyStatusType } from './global';

export type FinancialYear = {
  [index: string]: string;
  year?: string;
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

export type DataReliabilityType = {
  value: number;
  details: string[];
};

export type SummaryInfo = {
  status: CompanyStatusType[];
  reg_number: string;
  sector: string;
  description: string;
  directors: number;
  shareholders: number;
  employees: number;
  number_of_employees: number;
  overview_full?: string;
  date_of_incorporation: number | string;
  // last_account_date: number | string;
  last_annual_accounts_date: string; //* new replacing above type
  industry_sector: string | null;
  nace_code: string;
  nace_name: string;
  subsidiaries: number;
};

export type SummaryContact = {
  address?: {
    line_1: string;
    line_2: string;
    line_3: string;
    line_4: string;
    city: string;
    county: string;
    post_code: string;
    region: string;
    country: string;
  };
  status: string[];
  company_name: string | null;
  phone_numbers: string[];
  websites: string[];
  emails: string[];
  name: string | null;
  company_description: string | null;
};

export type Reliability = {
  reliability: 'reliable' | 'unreliable' | 'semi-reliable';
  comment: string;
};

interface LegalEventDetails {
  AmountSecured?: number | string;
  Class?: string;
  DateFullySatisfied?: string;
  DatePartiallySatisfied?: string;
  MortgageDetails?: string;
  PensionsEntitled?: string;
  MortgageDetailsFreeText?: string;
}

export type LegalEvent = {
  date: string;
  description: string;
  details: LegalEventDetails[];
  id?: number | string;
  source: string;
  // was previously [] which I assume is a typo. Delete comment if appropriate - Jack
  types: string[];
  forPrint?: boolean;
  is_negative: boolean;
};

export type Association = {
  title: string;
  company: string;
  from_date: string;
  to_date: string;
};

export type Profile = {
  title: string;
  name: string;
  role: string;
  linked_in_profile: string;
  profile_image: string;
  appointment_date: string;
  nationality: string;
  date_of_birth: string;
  other_associations: Association[];
};

export type ShareholderType = {
  first_name: string | null;
  last_name: string | null;
  linkedin?: string;
  percentage?: number;
  name: string | null;
  type?: string;
  peps_sanctions_enforcements: boolean;
};

export type FileContentType = string | ArrayBuffer | null | undefined;

export interface CSVValueValidation {
  header: string;
  validate?: ((value: string) => boolean | string) | null;
}

export type ValidCSVType = {
  validator: CSVValueValidation[];
};

export type BoardMember = {
  name: string;
  first_name: string;
  last_name: string;
  job_title: string;
  appointment_date: string | Date;
  resignation_date: string | Date;
  is_current: boolean;
  is_liability: boolean;
};

// schema from Swagger
export type Subsidiary = {
  id: string;
  name: string;
};

export interface DatedValue {
  date: Date | string;
  value: string;
}

export interface MacroEconomic {
  name: string;
  unit: string;
  frequency: string;
  details: string;
  history: DatedValue[];
}
export interface MacroEconomics {
  gdp_growth_rate: MacroEconomic;
  gdp_annual_growth_rate: MacroEconomic;
  gdp_per_capita: MacroEconomic;
  unemployment_rate: MacroEconomic;
  annual_inflation_rate: MacroEconomic;
  interest_rate: MacroEconomic;
  consumer_spending: MacroEconomic;
  government_debt_to_gdp: MacroEconomic;
  house_price_index: MacroEconomic;
  consumer_price_index: MacroEconomic;
  bankruptcies: MacroEconomic;
  credit_rating: MacroEconomic;
  stock_market: MacroEconomic;
}

export interface Benchmarks {
  region: {
    sme_z_score: number;
    probability_of_default_1_year: number;
    loss_given_default: number;
  };
  sector: {
    sme_z_score: number;
    probability_of_default_1_year: number;
    loss_given_default: number;
  };
}
