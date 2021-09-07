import FinancialTrend from './FinancialTrend';

const SummaryFinancialRow = ({ rowHeader, data, rowKey }) => {
  return (
    <tr>
      <td className="min-w-[160px] md:min-w-[180px]">{rowHeader}</td>
      {data &&
        data.map((data, i: number) => (
          <td key={data.year} scope="col" className="relative px-6 py-3">
            <p className={`${parseInt(data[rowKey]) < 0 && 'text-red-400'}`}>
              {!data[rowKey] ? '0' : data[rowKey]}
            </p>
          </td>
        ))}
      <FinancialTrend first={-12} second={70} third={60} fourth={10} />
    </tr>
  );
};

export default SummaryFinancialRow;
