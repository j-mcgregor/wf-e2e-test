import SecondaryLayout from '../layout/SecondaryLayout';

const SkeletonReport = () => {
  return (
    <SecondaryLayout>
      <div className="flex flex-col mx-auto max-w-[900px] animate-pulse">
        {/* Summary */}
        <div className="flex w-full my-4 h-[300px]">
          <div className="w-1/2 h-full bg-gray-200 mr-3 flex flex-col rounded">
            <div className="bg-gray-200 w-full h-1/2" />
            <div className="w-full h-1/2 bg-gray-300" />
          </div>
          <div className=" w-1/2 h-full bg-gray-200 ml-3 rounded"></div>
        </div>
        <div className="h-2/3 w-full bg-gray-200" />

        {/* Risk Metrics */}
        <div className="w-full flex h-[300px]  my-4">
          <div className="w-1/3 h-full bg-gray-200 rounded" />
          <div className="w-1/3 mx-2 h-full bg-gray-200 rounded" />
          <div className="w-1/3 h-full bg-gray-200 " />
        </div>
        <div className="w-full h-[200px] bg-gray-200 rounded" />
      </div>
    </SecondaryLayout>
  );
};

export default SkeletonReport;
