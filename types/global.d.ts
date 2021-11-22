import { JSXElementConstructor, ReactElement, ReactNodeArray } from 'react';
import { DefaultValue, RecoilValue } from 'recoil';
import { StringMap } from 'ts-jest/dist/types';

export type TranslateInput =
  | string
  | ReactNodeArray
  | ReactElement<any, string | JSXElementConstructor<any>>;

export type StatDataType = string | number | Date;

export type Report = {
  id: number;
  company_name: string;
  sme_zscore: number;
  bond_rating: string;
  created_at: number;
  bookmarked: boolean;
  probability_of_default?: string;
};

export type BatchedReportType = {
  id: number;
  company_name: string;
  name: string;
  sme_zscore: number;
  bond_rating: string;
  create_date: number;
  finish_date: number;
  total_reports: number;
  company_list: Report[];
};

type ContactInformation = {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  street_address: string;
  city: string;
  state: string;
  postcode: string;
  company_name: string;
  company_hq_location: string;
};

export type UserType = {
  //TODO: do we want this as name?
  full_name?: string | null;
  email?: string | null;
  is_SSO?: boolean;
  contact_information?: ContactInformation;
  preferences?: {
    defaults?: {
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
  reports?: Report[];
  batched_report_jobs?: BatchedReportType[];
};

export interface RecoilUserType {
  user: UserType | Promise<UserType> | RecoilValue<UserType>;
  // default: {}
}

export type CompanyType = {
  company_id?: string;
  name?: string;
  registered_address?: string;
  registration_date?: Date | string;
  // companies house options
  address_snippet?: string;
  company_number?: string;
  date_of_creation?: string;
  title?: string;
};

export type ApiResType = {
  ok: boolean;
  data?: ResDataType;
  error?: boolean;
};

export type ResDataType = {
  [index: string]: any;
  items?: [];
};

// redundant?
export type BatchReportType = {
  id: number;
  company_name: string;
  sme_zscore: string;
  bond_rating: string;
  default: string;
};

export type BatchReportsType = {
  id: number;
  results: BatchReportType[];
  created: string;
};
