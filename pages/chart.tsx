import Chart from '../components/charts/Chart';

import ChartMulti from '../components/charts/ChartMulti';

const chart = () => {
  return (
    <div>
      <Chart title="GDP Growth Rate" timeFrame="Quarterly" />
      <ChartMulti />
    </div>
  );
};

export default chart;
