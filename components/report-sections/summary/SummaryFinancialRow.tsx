import { FinancialYear } from '../../../types/report';
import FinancialTrend from './FinancialTrend';
import relativeTrend from '../../../lib/utils/relative-trend';
import { TranslateInput } from '../../../types/global';

interface FinancialRowProps {
  rowHeader: TranslateInput;
  data: FinancialYear[];
  rowKey: string;
}

const SummaryFinancialRow = ({
  rowHeader,
  data,
  rowKey
}: FinancialRowProps) => {
  const dataAsFloat = data.map(
    year =>
      (year[rowKey?.toString()] && parseFloat(year[rowKey?.toString()])) || 0
  );
  const relativeTrendData = relativeTrend(dataAsFloat);

  return (
    <tr>
      <td className="min-w-[160px] font-semibold">{rowHeader}</td>
      {data &&
        data.map((year, index) => (
          <td key={index} className="relative px-2 py-1">
            <p
              className={`${
                parseFloat(year[rowKey?.toString()]) < 0 && 'text-red-400'
              }`}
            >
              {!year[rowKey?.toString()] ? '0' : year[rowKey?.toString()]}
            </p>
          </td>
        ))}
      <FinancialTrend data={relativeTrendData} />
    </tr>
  );
};

export default SummaryFinancialRow;
