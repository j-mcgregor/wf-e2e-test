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

export type SummaryInfo = {
  reg_number: string;
  sector: string;
  description: string;
  incorporation_date: number | string;
  last_account_date: number | string;
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
  name: string;
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
  types: [];
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

export type Shareholder = {
  first_name: string;
  last_name: string;
  linkedin: string;
};

export type FileContentType = string | ArrayBuffer | null | undefined;

export interface CSVValueValidation {
  header: string;
  validate: ((value: string) => boolean | string) | null;
}

export type ValidCSVType = {
  validator: CSVValueValidation[];
};
