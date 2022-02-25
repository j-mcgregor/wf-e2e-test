import { SetStateAction } from 'react';
import { ApiError } from './global';

import { CompanyStatusType } from './global';

export type FinancialYear = {
  [index: string]: string;
  period?: string;
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
  is_accounts_filing_overdue: boolean;
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
  is_charge: boolean;
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
  validate?: ((value: string) => boolean | string)[];
  required?: boolean;
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
  iso_code: string;
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

export interface ShareHolderCardProps {
  firstName?: string | null;
  lastName?: string | null;
  linkedin?: string;
  percentage?: number;
  name: string | null;
  type?: string;
}

export interface RiskOutlookData {
  leverage: string;
  liquidity: string;
  profitability: string;
  governance: {
    judgements_12_months: number;
    payment_remarks_12_months: number;
  };
  benchmark: {
    region: string;
    sector: string;
  };
}

/**
 * **********************
 * CSV Report Upload:
 * * The following type is a list of permitted headers.
 * * For CSVs with multiple rows per report, only the 'FINANCIALS' should change.
 * * Should map to ReportUploadRequestBody below
 * **********************
 */

export type CsvReportUploadHeaders =
  // MAIN
  | 'currency'
  | 'iso_code'
  | 'company_id' // TODO - remove when API updated
  | 'accounts_type'
  // DETAILS
  | 'details_industry_sector_code'
  | 'details_nace_code'
  | 'details_status'
  | 'details_name'
  // FINANCIALS
  | 'address_region'
  | 'cash_and_equivalents'
  | 'depreciation'
  | 'ebit'
  | 'ebitda'
  | 'intangible_fixed_assets'
  | 'interest_expenses'
  | 'long_term_debt'
  | 'net_income'
  | 'number_of_directors'
  | 'number_of_employees'
  | 'period'
  | 'production_costs'
  | 'retained_earnings'
  | 'short_term_debt'
  | 'tangible_fixed_assets'
  | 'total_assets'
  | 'total_debt'
  | 'total_liabilities'
  | 'total_shareholder_equity'
  | 'turnover'
  | 'working_capital'
  // OTHER - expected for the API but not necessarily provided by the CSV
  | 'management_experience' // High, Medium (default) or Low only
  | 'creditors'
  | 'debtors'
  | 'fixed_assets'
  | 'inventory'
  | 'loans'
  | 'non_current_liabilities'
  | 'number_of_subsidiaries'
  | 'other_non_current_liabilities'
  | 'net_debt';

// taken from swagger schema
export enum AccountTypeEnum {
  0 = 0,
  1 = 1,
  2 = 2,
  3 = 3,
  4 = 4,
  5 = 5,
  6 = 6,
  7 = 7
}

export interface ReportUploadFinancialRequestBody {
  cash_and_equivalents: number;
  creditors: number;
  current_assets: number;
  current_liabilities: number;
  debtors: number;
  ebit: number;
  ebitda: number;
  fixed_assets: number;
  intangible_fixed_assets: number;
  interest_expenses: number;
  inventory: number;
  loans: number;
  long_term_debt: number;
  management_experience: string; // High, Medium (default) or Low only
  net_debt: number;
  net_income: number;
  non_current_liabilities: number;
  number_of_directors: number;
  number_of_employees: number;
  number_of_subsidiaries: number;
  other_non_current_liabilities: number;
  period: string;
  retained_earnings: number;
  short_term_debt: number;
  tangible_fixed_assets: number;
  total_assets: number;
  total_debt: number;
  total_liabilities: number;
  total_shareholder_equity: number;
  turnover: number;
  working_capital: number;
}

export interface ReportUploadDetailsReuestBody {
  nace_code: number;
  industry_sector_code: number;
  status: string;
  name: string;
}

/**
 * **********************
 * CSV Report Upload POST body:
 * * key-values taken from https://api.saggio-credito.co.uk/docs#/reports/create_manual_data_input_report_api_v1_reports_upload_post
 * * CsvReportUploadHeaders must map to this as much as possible
 * * Some values are missing for now but have been marked as such in useCSVValidator > makeReqBody()
 * **********************
 */
export interface ReportUploadRequestBody {
  // MAIN
  iso_code: string;
  company_id?: string; // TODO - remove when API updated
  currency: string;
  accounts_type: AccountTypeEnum;
  // DETAILS
  details: ReportUploadDetailsReuestBody;
  // DETAILS
  financials: ReportUploadFinancialRequestBody[];
}

export type SubmitReportType = (
  setError: (value: SetStateAction<ApiError>) => void,
  setLoading: (value: SetStateAction<boolean>) => void
) => Promise<boolean | undefined>;

export interface UploadReport422ErrorResponse {
  detail: Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}

/**
 * *************************************
 * ENVIRONMENTAL-SOCIAL-GOVERNANCE (ESG)
 * *************************************
 */

export type ESG_SectorKeys =
  | 'Accounting'
  | 'Airlines_Aviation'
  | 'Alternative_Dispute_Resolution'
  | 'Alternative_Medicine'
  | 'Animation'
  | 'Apparel_and_Fashion'
  | 'Architecture_and_Planning'
  | 'Arts_and_Crafts'
  | 'Automotive'
  | 'Aviation_and_Aerospace'
  | 'Banking'
  | 'Biotechnology'
  | 'Broadcast_Media'
  | 'Building_Materials'
  | 'Business_Supplies_and_Equipment'
  | 'Capital_Markets'
  | 'Chemicals'
  | 'Civic_and_Social_Organization'
  | 'Civil_Engineering'
  | 'Commercial_Real_Estate'
  | 'Computer_Games'
  | 'Computer_Hardware'
  | 'Computer_Networking'
  | 'Computer_Software'
  | 'Computer_and_Network_Security'
  | 'Construction'
  | 'Consumer_Electronics'
  | 'Consumer_Goods'
  | 'Consumer_Services'
  | 'Cosmetics'
  | 'Dairy'
  | 'Defense_and_Space'
  | 'Design'
  | 'E-Learning'
  | 'Education_Management'
  | 'Electrical_Electronic_Manufacturing'
  | 'Entertainment'
  | 'Environmental_Services'
  | 'Events_Services'
  | 'Executive_Office'
  | 'Facilities_Services'
  | 'Farming'
  | 'Financial_Services'
  | 'Fine_Art'
  | 'Fishery'
  | 'Food_Production'
  | 'Food_and_Beverages'
  | 'Fund-Raising'
  | 'Furniture'
  | 'Gambling_and_Casinos'
  | 'Glass_Ceramics_and_Concrete'
  | 'Government_Administration'
  | 'Government_Relations'
  | 'Graphic_Design'
  | 'Health_Wellness_and_Fitness'
  | 'Higher_Education'
  | 'Hospital_and_Health_Care'
  | 'Hospitality'
  | 'Human_Resources'
  | 'Import_and_Export'
  | 'Individual_and_Family_Services'
  | 'Industrial_Automation'
  | 'Information_Services'
  | 'Information_Technology_and_Services'
  | 'Insurance'
  | 'International_Affairs'
  | 'International_Trade_and_Development'
  | 'Internet'
  | 'Investment_Banking'
  | 'Investment_Management'
  | 'Judiciary'
  | 'Law_Enforcement'
  | 'Law_Practice'
  | 'Legal_Services'
  | 'Legislative_Office'
  | 'Leisure_Travel_and_Tourism'
  | 'Libraries'
  | 'Logistics_and_Supply_Chain'
  | 'Luxury_Goods_and_Jewelry'
  | 'Machinery'
  | 'Management_Consulting'
  | 'Maritime'
  | 'Market_Research'
  | 'Marketing_and_Advertising'
  | 'Mechanical_or_Industrial_Engineering'
  | 'Media_Production'
  | 'Medical_Devices'
  | 'Medical_Practice'
  | 'Mental_Health_Care'
  | 'Military'
  | 'Mining_and_Metals'
  | 'Motion_Pictures_and_Film'
  | 'Museums_and_Institutions'
  | 'Music'
  | 'Nanotechnology'
  | 'Newspapers'
  | 'Nonprofit_Organization_Management'
  | 'Oil_and_Energy'
  | 'Online_Media'
  | 'Outsourcing_Offshoring'
  | 'Package_Freight_Delivery'
  | 'Packaging_and_Containers'
  | 'Paper_and_Forest_Products'
  | 'Performing_Arts'
  | 'Pharmaceuticals'
  | 'Philanthropy'
  | 'Photography'
  | 'Plastics'
  | 'Political_Organization'
  | 'Primary_Secondary_Education'
  | 'Printing'
  | 'Professional_Training_and_Coaching'
  | 'Program_Development'
  | 'Public_Policy'
  | 'Public_Relations_and_Communications'
  | 'Public_Safety'
  | 'Publishing'
  | 'Railroad_Manufacture'
  | 'Ranching'
  | 'Real_Estate'
  | 'Recreational_Facilities_and_Services'
  | 'Religious_Institutions'
  | 'Renewables_and_Environment'
  | 'Research'
  | 'Restaurants'
  | 'Retail'
  | 'Security_and_Investigations'
  | 'Semiconductors'
  | 'Shipbuilding'
  | 'Sporting_Goods'
  | 'Sports'
  | 'Staffing_and_Recruiting'
  | 'Supermarkets'
  | 'Telecommunications'
  | 'Textiles'
  | 'Think_Tanks'
  | 'Tobacco'
  | 'Translation_and_Localization'
  | 'Transportation_Trucking_Railroad'
  | 'Utilities'
  | 'Venture_Capital_and_Private_Equity'
  | 'Veterinary'
  | 'Warehousing'
  | 'Wholesale'
  | 'Wine_and_Spirits'
  | 'Wireless'
  | 'Writing_and_Editing';

export type RiskLevels = 'low' | 'medium' | 'high';

export interface Risk {
  country_risk: RiskLevels;
  sector_risk: RiskLevels;
}

type PhysicalRiskType = {
  overall: RiskLevels;
  country: RiskLevels;
  sector: RiskLevels;
};

export interface EnvironmentalSocialGovernance {
  sector: string;
  // sectors: Array<{
  //   sector: ESG_SectorKeys;
  //   match: string;
  // }>;
  transition: {
    transition_risk: number;
    carbon_intensity: number;
    overall: RiskLevels;
  };
  physical: {
    drought: PhysicalRiskType;
    flooding: PhysicalRiskType;
    overall: PhysicalRiskType;
  };
}

/**
 * *************************************
 * RISK METRIC
 * *************************************
 */
export type RatingType =
  | 'A'
  | 'BBB+'
  | 'BBB'
  | 'BB+'
  | 'BBB-'
  | 'BB-'
  | 'BB'
  | 'B+'
  | 'B'
  | 'B-'
  | 'CCC+'
  | 'CCC'
  | 'CCC-'
  | 'CC'
  | 'CC-'
  | 'CC+'
  | 'D';

/**
 * *************************************
 * REPORT DATA
 * @description This is the master object and should reflect what the API sends in Swagger
 * *************************************
 */

export interface ReportDataProps {
  [x: string]: any;
  id: string | number;
  benchmarks: Benchmarks;
  board_members?: BoardMember[];
  company_id: string;
  company_name: string;
  created_at?: string;
  currency: string;
  details: SummaryContact & SummaryInfo;
  directors: BoardMember[];
  error?: string;
  esg: EnvironmentalSocialGovernance;
  executives: BoardMember[];
  financial_ratios: {
    [key: string]: number;
  }[];
  financials: FinancialYear[];
  highlights: {
    data_reliability: Reliability;
    risk_outlook: string[];
  };
  legal_events: LegalEvent[];
  macroeconomics: MacroEconomics;
  message?: string;
  reliability_index: DataReliabilityType;
  risk_metrics: {
    bond_rating_equivalent: RatingType;
    sme_z_score: number;
    period: string;
    probability_of_default_1_year: number;
    loss_given_default: number;
  }[];
  risk_outlook: RiskOutlookData;
  shareholders: ShareholderType[];
  subsidiaries: Subsidiary[];
  /**
   * @deprecated
   * use ReportDataProps.details & ReportDataProps.board_members
   */
  personal: {
    directors: Profile[];
    senior_management: Profile[];
    ceo: string;
    cfo: string;
    chairman: string;
  };
}
