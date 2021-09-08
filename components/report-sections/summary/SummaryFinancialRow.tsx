import FinancialTrend from './FinancialTrend';

const SummaryFinancialRow = ({ rowHeader, data, rowKey }) => {
  return (
    <tr>
      <td className="min-w-[160px]">{rowHeader}</td>
      {data &&
        data.map((data, i: number) => (
          <td key={data.year} scope="col" className="relative px-2 py-3">
            <p className={`${parseInt(data[rowKey]) < 0 && 'text-red-400'}`}>
              {!data[rowKey] ? '0' : data[rowKey]}
            </p>
          </td>
        ))}
      <FinancialTrend data={[-40, 82, 92, -35, 12]} />
    </tr>
  );
};

export default SummaryFinancialRow;
