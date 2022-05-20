import { JSXElementConstructor, ReactElement, ReactNodeArray } from 'react';
import { DefaultValue, RecoilValue } from 'recoil';
import { StringMap } from 'ts-jest/dist/types';

import type { BatchReportResponse } from './batch-reports';
import type { CsvValueValidation } from './report';
import type { ErrorCodeKeys } from './errors';

export type TranslateInput =
  | string
  | ReactNodeArray
  | ReactElement<any, string | JSXElementConstructor<any>>;

type Messages = typeof import('../messages/en/general.en.json');
declare interface IntlMessages extends Messages {}

export type StatDataType = string | number | Date;

export type ReportSnippetType = {
  id: string;
  company_name: string;
  company_id?: number;
  iso_code?: string;
  sme_z_score: number;
  bond_rating_equivalent: string;
  bond_rating?: string;
  created_at: string;
  bookmarked?: boolean;
  probability_of_default_1_year: number;
  probability_of_default?: number;
};

export type BatchedReportType = {
  id: number;
  company_name: string;
  name: string;
  sme_z_score: number;
  bond_rating: string;
  create_date: number;
  finish_date: number;
  total_reports: number;
  company_list: ReportSnippetType[];
};

type BatchReportJob = BatchReportResponse & BatchedReportType;

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
  id: string | number;
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
  reports?: ReportSnippetType[];
  bookmarked_reports?: ReportSnippetType[];
  batchReportJobs?: BatchReportResponse[];
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
  // EU API result options
  NAME?: string;
  BVDID?: string;
  ADDRESS_LINE1?: string;
  ADDRESS_LINE2?: string;
  CITY?: string;
  COUNTRY?: string;
  POSTCODE?: string;
  WEBSITE?: string[];
};

export type ApiResType = {
  ok: boolean;
  data?: ResDataType;
  error?: boolean; // <- string?
  message?: string;
  status?: number;
};

export type ApiError = {
  error: ErrorCodeKeys;
  message: string | object;
};

export type ResDataType = {
  [index: string]: any;
  items?: [];
};

// redundant?
export type BatchReportType = {
  id: string;
  company_name: string;
  sme_z_score: string;
  bond_rating: string;
  default: string;
};

export type BatchReportsType = {
  id: string;
  results: BatchReportType[];
  created: string;
};

export type ValidateFunction = (
  value: string,
  rowNumber?: number
) => boolean | string;

export interface CSVValidationHeaderProps {
  required?: ((value: string, rowNumber?: number) => boolean | string) | false;
  validator?: ValidateFunction;
  formatted: string;
}

type CompanyStatusOptions =
  | 'Active'
  | 'Distressed'
  | 'Active (protection)'
  | 'Active (dormant)'
  | 'Bankrupt'
  | 'In liquidation'
  | 'Dissolved'
  | 'Inactive'
  | 'N.A.';

export type CompanyStatusType = CompanyStatusOptions[];

// export type ErrorCodeKeys =
//   | 'UNAUTHORISED'
//   | 'UNPROCESSABLE_ENTITY'
//   | 'NO_REPORT_ID'
//   | 'SIGNED_OUT'
//   | 'USER_404'
//   | 'USER_403'
//   | 'USER_422'
//   | 'USER_500'
//   | 'COMPANY_404'
//   | 'COMPANY_422'
//   | 'COMPANY_500'
//   | 'NO_REPORT'
//   | 'NO_REPORT_FOUND'
//   | 'REPORT_FETCHING_ERROR'
//   | 'BATCH_REPORT_FETCHING_ERROR'
//   | 'GENERIC_API_ERROR'
//   | 'GENERIC_API_ERROR_FORM'
//   | 'VALID_EMAIL_REQUIRED'
//   | 'EMAIL_REQUIRED'
//   | 'INVALID_SSO_LOGIN'
//   | 'PASSWORD_REQUIRED'
//   | 'INCORRECT_DETAILS'
//   | 'FULL_NAME_REQUIRED'
//   | 'NEW_PASSWORD_REQUIRED'
//   | 'CONFIRM_PASSWORD_MATCH'
//   | 'SEARCH_ERROR'
//   | 'INVALID_COUNTRY_CODE'
//   | 'COUNTRY_CODE_REQUIRED'
//   | 'COMPANY_NAME_REQUIRED'
//   | 'COMPANY_WEBSITE_REQUIRED'
//   | 'INVALID_REQUEST_TYPE'
//   | 'METHOD_NOT_ALLOWED'
//   | 'MISSING_DATA'
//   | 'NO_COMPANY_ID'
//   | 'NO_CURRENCY'
//   | 'NO_ISO_CODE'
//   | 'VALIDATION_ERROR';

export type ReportTypeEnum = 'BATCH_AUTO' | 'BATCH_MANUAL' | 'REPORT_MANUAL';

export interface UploadReportType {
  apiUrl: string;
  type: ReportTypeEnum;
  validator: CsvValueValidation[];
  iso_code?: string;
}

export declare global {
  interface Window {
    HubSpotConversations: any;
    hsConversationsOnReady: any;
    hsConversationsSettings: any;
  }
}
