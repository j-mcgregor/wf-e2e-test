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
  reg_number: string;
  sector: string;
  description: string;
  date_of_incorporation: number | string;
  last_account_date: number | string;
  industry_sector: string | null;
  nace_code: string;
  nace_name: string;
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
  phone: string[];
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
  linkedin: string;
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
