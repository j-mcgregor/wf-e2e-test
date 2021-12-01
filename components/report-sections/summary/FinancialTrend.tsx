interface FinancialTrendProps {
  data: number[];
}

const FinancialTrend = ({ data }: FinancialTrendProps) => {
  const reverseOrderDate = data?.reverse();
  return (
    <td className="flex flex-col h-9 w-[80px] py-2">
      <div className="h-1/2 w-full flex items-end">
        {reverseOrderDate?.map((year, index) => {
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
        {reverseOrderDate?.map((year, index) => {
          return (
            <span
              key={index}
              // temp fix halving negative values as they are overflowing
              style={{ height: `${Math.abs(year / 2)}%` }}
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
