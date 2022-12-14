export interface OrganisationType {
  name?: string;
  max_users?: number;
  send_user_limit_email?: boolean;
  id?: string;
  features: OrganisationFeature[];
  quota?: {
    enable_quota?: boolean;
    quota_limit?: number;
    quota_used?: number;
    renewal_date?: string;
    renewal_date_advance_days?: number;
    send_renewal_email?: boolean;
    send_quota_limit_email?: boolean;
    assigned_wf_user?: string;
    assigned_customer_email?: string;
  };
}

export type OrganisationFeatureKeys =
  | 'REPORT_GEO_LOCATION'
  | 'REPORT_FAVICON'
  | 'REPORT_DIRECTORS'
  | 'REPORT_EXECUTIVES'
  | 'REPORT_PARENTS'
  | 'REPORT_RISK_METRICS'
  | 'REPORT_RELABILITY_INDEX'
  | 'REPORT_MACROECONOMICS'
  | 'REPORT_BENCHMARKS'
  | 'REPORT_FINANCIALS'
  | 'REPORT_FINANCIAL_RATIOS'
  | 'REPORT_SUBSIDIARIES'
  | 'REPORT_SHAREHOLDERS'
  | 'REPORT_LEGAL_EVENTS'
  | 'REPORT_RISK_OUTLOOK'
  | 'REPORT_NEWS'
  | 'REPORT_ESG'
  | 'REPORT_CODAT';
export interface OrganisationFeature {
  name: OrganisationFeatureKeys;
  description: null;
  meta: {};
}

export type OrganisationFeaturesObject =
  | Record<OrganisationFeatureKeys, OrganisationFeature>
  | {
      [key: string]: OrganisationFeature;
    };

export interface OrganisationUser {
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string;
  organisation_id: string;
  preferences: {
    defaults: {
      locale: string;
      currency: string;
      home_page: string;
      reporting_country: string;
    };
    communication: {
      batch_report_email: boolean;
      service_updates: boolean;
      company_updates: boolean;
    };
  };
  organisation_role: string;
  id: string;
  total_reports: number;
}

export interface OrganisationUserSchema {
  email?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string;
  organisation_id?: string;
  preferences?: {
    defaults?: {
      locale?: string;
      currency?: string;
      home_page?: string;
      reporting_country?: string;
    };
    communication?: {
      batch_report_email?: boolean;
      service_updates?: boolean;
      company_updates?: boolean;
    };
  };
  password?: string;
}

export interface OrganisationUserReport {
  id: string;
  company_name: string;
  iso_code: string;
  company_id: string;
  sme_z_score: number;
  bond_rating_equivalent: string;
  loss_given_default: number;
  probability_of_default_1_year: number;
  created_at: string;
}
