import { TranslateInput } from './global';

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
  data: GraphDataType[];
};

export type MacroTrend = {
  title: string;
  period: string;
  data: GraphDataType[];
};
