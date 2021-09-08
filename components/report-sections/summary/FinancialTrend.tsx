interface FinancialTrendProps {
  data: number[];
}

const FinancialTrend = ({ data }: FinancialTrendProps) => {
  return (
    <div className="flex flex-col h-12 w-[80px] py-2">
      <div className="h-1/2 w-full flex items-end">
        {data.map(year => {
          return (
            <div
              key={year}
              style={{ height: `${year}%` }}
              className={`${year > 0 && 'bg-green-500'} w-1/4 mx-[2px]`}
            />
          );
        })}
      </div>
      <div className="h-1/2 w-full flex items-start">
        {data.map(year => {
          return (
            <div
              key={year}
              style={{ height: `${Math.abs(year)}%` }}
              className={`${year < 0 && 'bg-red-500'} w-1/4 mx-[2px]`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FinancialTrend;
