import { GraphDataType } from '../../../lib/mock-data/charts';
import ChartMulti from '../../charts/ChartMulti';

interface FinancialTrendsProps {
  data: GraphDataType[][]; // 2D array of arrays of objects
}

const FinancialTrends = ({ data }: FinancialTrendsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {data?.map(company => {
        return (
          <ChartMulti
            graphData={company}
            category="Interest Expenses"
            units="Thousands"
          />
        );
      })}
    </div>
  );
};

export default FinancialTrends;
