import { JSXElementConstructor, ReactElement, ReactNodeArray } from 'react';
import { DefaultValue, RecoilValue } from 'recoil';

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

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  recent_usage?: {
    reports_ran: StatDataType;
    api_requests: StatDataType;
    last_login: StatDataType;
  };
  is_SSO?: boolean;
  contact_information?: ContactInformation;
  preferences?: {
    localisation: string;
    default_currency: string;
    default_login_screen: string;
    default_reporting_country: string;
    communication: {
      comments: boolean;
      candidates: boolean;
      offers: boolean;
    };
  };
  reports?: Report[];
};

export interface RecoilUserType {
  user: User | Promise<User> | RecoilValue<User>;
  // default: {}
}

export type Company = {
  company_id?: string;
  name?: string;
  registered_address?: string;
  registration_date?: Date;
  // companies house options
  address_snippet?: string;
  company_number?: string;
  date_of_creation?: string;
  title?: string;
};
