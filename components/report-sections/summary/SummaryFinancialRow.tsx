/* eslint-disable security/detect-object-injection */
import { JSXElementConstructor, ReactElement, ReactNodeArray } from 'react';

import { FinancialYear } from '../../../types/report';
import FinancialTrend from './FinancialTrend';
import relativeTrend from '../../../lib/utils/relative-trend';

interface FinancialRowProps {
  rowHeader:
    | string
    | ReactNodeArray
    | ReactElement<any, string | JSXElementConstructor<any>>;
  data: FinancialYear[];
  rowKey: string;
}

/**
 * I had to disable the detect-object-injection at the top of the file to run the linter,
 * something to look into
 * - Jack
 */
const SummaryFinancialRow = ({
  rowHeader,
  data,
  rowKey
}: FinancialRowProps) => {
  const dataAsFloat = data.map(
    year => (year[rowKey] && parseFloat(year[rowKey])) || 0
  );
  const relativeTrendData = relativeTrend(dataAsFloat);
  return (
    <tr>
      <td className="min-w-[160px] font-semibold">{rowHeader}</td>
      {data &&
        data.map((year, index) => (
          <td key={index} className="relative px-2 py-1">
            <p className={`${parseFloat(year[rowKey]) < 0 && 'text-red-400'}`}>
              {!year[rowKey] ? '0' : year[rowKey]}
            </p>
          </td>
        ))}
      <FinancialTrend data={relativeTrendData} />
    </tr>
  );
};

export default SummaryFinancialRow;
