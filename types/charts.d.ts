import { TranslateInput } from './global';
import { FinancialYear } from './report';

export type ChartType = {
  header: TranslateInput;
  subHeader: TranslateInput;
  hint: {
    title: TranslateInput;
    body: TranslateInput;
  };
  data: GraphDataType[];
};

export type IndexedGraphDataType = {
  [index: string]: GraphDataType;
};

export interface GraphDataType {
  x: string;
  y: number;
}

export interface MultiGraphDataType {
  name?: string;
  data: GraphDataType[] | FinancialYear[];
}

export type FinancialGraphType = {
  name: string;
  data: GraphDataType[];
};

export type MacroTrend = {
  title: string;
  period: string;
  data: GraphDataType[];
};
