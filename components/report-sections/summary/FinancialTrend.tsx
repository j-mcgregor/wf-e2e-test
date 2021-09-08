interface FinancialTrendProps {
  first: number;
  second: number;
  third: number;
  fourth: number;
}

const FinancialTrend = ({
  first,
  second,
  third,
  fourth
}: FinancialTrendProps) => {
  const bar = (value: number) => {
    if (value > 80 && value <= 100) {
      return <div className="h-full w-1/4 bg-green-500 mx-1" />;
    }
    if (value < 80 && value > 50) {
      return <div className="h-5/6 w-1/4 bg-green-500 mx-1" />;
    }
    if (value < 50 && value > 25) {
      return <div className="h-2/6 w-1/4 bg-green-500 mx-1" />;
    }
    if (value < 25 && value > 0) {
      return <div className="h-1/6 w-1/4 bg-green-500 mx-1" />;
    }
    if (value < 0 && value > -25) {
      return <div className="h-1/6 w-1/4 bg-red-500 mx-1" />;
    }
  };

  const emptyBar = <div className="h-1/6 w-1/4 bg-none mx-1" />;

  return (
    <div className="flex flex-col h-12 w-[80px] py-2">
      <div className="h-1/2 w-full flex items-end">
        {first > 0 ? bar(first) : emptyBar}
        {second > 0 ? bar(second) : emptyBar}
        {third > 0 ? bar(third) : emptyBar}
        {fourth > 0 ? bar(fourth) : emptyBar}
      </div>
      <div className="h-1/2 w-full flex items-start">
        {first < 0 ? bar(first) : emptyBar}
        {second < 0 ? bar(second) : emptyBar}
        {third < 0 ? bar(third) : emptyBar}
        {fourth < 0 ? bar(fourth) : emptyBar}
      </div>
    </div>
  );
};

export default FinancialTrend;
