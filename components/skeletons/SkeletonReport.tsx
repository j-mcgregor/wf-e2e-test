const SkeletonReport = () => {
  return (
    <div
      className="flex flex-col mx-auto max-w-5xl animate-pulse xl:pt-24 md:pt-16 pt-8"
      data-testid="skeleton-report"
    >
      {/* Summary */}
      <div className="flex w-full my-4 h-[250px] space-x-5">
        <div className=" w-1/2 h-full bg-gray-200 rounded"></div>
        <div className="w-1/2 h-full bg-gray-200  flex flex-col rounded">
          <div className="bg-gray-200 w-full h-1/2" />
          <div className="w-full h-1/2 bg-gray-300 bg-opacity-50" />
        </div>
      </div>
      <div className="h-2/3 w-full bg-gray-200" />
      <div className="w-full min-h-[200px] bg-gray-200 rounded" />
      {/* Risk Metrics */}
      <div className="w-full flex h-[300px]  my-4">
        <div className="w-1/3 h-full bg-gray-200 rounded" />
        <div className="w-1/3 mx-2 h-full bg-gray-200 rounded" />
        <div className="w-1/3 h-full bg-gray-200 " />
      </div>
    </div>
  );
};

export default SkeletonReport;
