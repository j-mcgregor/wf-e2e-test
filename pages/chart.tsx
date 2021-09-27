import SingleChart from '../components/charts/SingleChart';
import MultiChart from '../components/charts/MultiChart';

const chart = () => {
  return (
    <div>
      <SingleChart title="GDP Growth Rate" timeFrame="Quarterly" />
      <MultiChart />
    </div>
  );
};

export default chart;
