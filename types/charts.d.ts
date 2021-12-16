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

export type GraphDataType = {
  x: string;
  y: number;
};

export type MultiGraphDataType = {
  name?: string;
  data: GraphDataType[] | FinancialYear[];
};

export type MacroTrend = {
  title: string;
  period: string;
  data: GraphDataType[];
};
