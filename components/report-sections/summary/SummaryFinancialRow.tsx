import React from 'react';

const SummaryFinancialRow = ({ rowHeader, data, rowKey }) => {
  return (
    <tr>
      <td className="min-w-[160px] md:min-w-[180px]">{rowHeader}</td>
      {data && data.map(
        (data, i) => (
            <td key={data.year} scope="col" className="relative px-6 py-3">
              <p
                className={`${parseInt(data[rowKey]) < 0 && 'text-red-400'}`}
              >
                {!data[rowKey] ? '0' : data[rowKey]}
              </p>
            </td>
          )
      )}
    </tr>
  );
};

export default SummaryFinancialRow;
