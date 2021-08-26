import React, {
  ReactElement,
  ReactNodeArray,
  JSXElementConstructor
} from 'react';

export type TranslateInput =
  | string
  | ReactNodeArray
  | ReactElement<any, string | JSXElementConstructor<any>>;

export type StatDataType = string | number | Date;

export type Report = {
  id: number;
  company_Name: string;
  sme_zscore: number;
  bond_rating: string;
  created_at: number;
};
