interface FinancialTrendProps {
  data: number[];
}

const FinancialTrend = ({ data }: FinancialTrendProps) => {
  return (
    <td className="flex flex-col h-9 w-[80px]">
      <div className="h-1/2 w-full flex items-end">
        {data.map((year, index) => {
          return (
            <span
              key={index}
              style={{ height: `${year}%` }}
              className={`${
                year > 0
                  ? 'bg-green-500 print:z-100'
                  : year === 0
                  ? 'border-b border-black'
                  : null
              } w-full mx-[2px] max-w-[10px]`}
            />
          );
        })}
      </div>
      <div className="h-1/2 w-full flex items-start">
        {data.map((year, index) => {
          return (
            <span
              key={index}
              style={{ height: `${Math.abs(year)}%` }}
              className={`${
                year < 0 && 'bg-red-500'
              } w-full mx-[2px] max-w-[10px]`}
            />
          );
        })}
      </div>
    </td>
  );
};

export default FinancialTrend;
