import { GraphData } from '../../../lib/mock-data/charts';
import ChartMulti from '../../charts/ChartMulti';

interface FinancialTrendsProps {
  data: GraphData[][]; // 2D array of arrays of objects
}

const FinancialTrends = ({ data }: FinancialTrendsProps) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
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
