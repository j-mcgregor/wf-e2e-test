import { FinancialYear } from '../../../types/report';
import FinancialTrend from './FinancialTrend';
import relativeTrend from '../../../lib/utils/relative-trend';
import { TranslateInput } from '../../../types/global';
import { useTranslations } from 'use-intl';
import { addBlankObjects } from '../../../lib/utils/report-helpers';

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
  const t = useTranslations();
  const dataAsFloat = data.map(
    year =>
      (year[rowKey?.toString()] && parseFloat(year[rowKey?.toString()])) || 0
  );
  const relativeTrendData = relativeTrend(dataAsFloat);

  const yearsWithBlank = addBlankObjects(data, 5);

  return (
    <tr>
      <td className="min-w-[160px] font-semibold">{rowHeader}</td>
      {yearsWithBlank &&
        yearsWithBlank.map((year, index) => (
          <td key={index} className="relative px-2 py-1 min-w-[50px]">
            <p
              className={`${
                parseFloat(year[rowKey?.toString()]) < 0 && 'text-red-400'
              } ${!year.period && 'text-gray-200'}`}
            >
              {!year[rowKey?.toString()]
                ? year.period
                  ? 0
                  : t('na')
                : year[rowKey?.toString()]}
            </p>
          </td>
        ))}
      <FinancialTrend data={relativeTrendData} />
    </tr>
  );
};

export default SummaryFinancialRow;
