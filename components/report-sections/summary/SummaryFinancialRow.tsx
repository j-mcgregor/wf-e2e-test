import { JSXElementConstructor, ReactElement, ReactNodeArray } from 'react';

import { FinancialYear } from '../../../types/report';
import FinancialTrend from './FinancialTrend';
import relativeTrend from '../../../lib/func/relative-trend';


interface FinancialRowProps {
  rowHeader: string | ReactNodeArray | ReactElement<any, string | JSXElementConstructor<any>>
  data: FinancialYear[]
  rowKey: string
}

const SummaryFinancialRow = ({ rowHeader, data, rowKey }: FinancialRowProps) => {
  
  const dataAsFloat = data.map( year => (year[rowKey] && parseFloat(year[rowKey]))|| 0)
  const relativeTrendData = relativeTrend(dataAsFloat)
  console.log(relativeTrendData)
  return (
    <tr>
      <td className="min-w-[160px] md:min-w-[180px]">{rowHeader}</td>
      {data &&
        data.map((year) => (
          <td key={year.year} className="relative px-6 py-3">
            <p className={`${parseFloat(year[rowKey]) < 0 && 'text-red-400'}`}>
              {!year[rowKey] ? '0' : year[rowKey]}
            </p>
          </td>
        ))}
      <FinancialTrend first={-12} second={70} third={60} fourth={10} />
    </tr>
  );
};

export default SummaryFinancialRow;
