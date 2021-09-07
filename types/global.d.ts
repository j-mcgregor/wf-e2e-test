import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray
} from 'react';

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

// report page props
export type SummaryProps = {
  info?: {
    regNumber: string;
    sector: string;
    description: string;
    incorporationDate: number | string;
    lastAccountDate: number | string;
  };

  contact?: {
    address_line_1: string | null;
    address_line_2: string | null;
    address_line_3: string | null;
    address_line_4: string | null;
    postal_code: string | null;
    phone_numbers: string[];
    websites: string[];
    emails: string[];
  };
};
