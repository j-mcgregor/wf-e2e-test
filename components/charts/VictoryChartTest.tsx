import { VictoryChart, VictoryLine, VictoryScatter } from 'victory';

const VictoryChartTest = () => {
  const categories = {
    x: [
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020'
    ]
  };

  const data = [
    { x: '2011', y: 262 },
    { x: '2012', y: 345 },
    { x: '2013', y: 467 },
    { x: '2014', y: 523 },
    { x: '2015', y: 598 },
    { x: '2016', y: 677 },
    { x: '2017', y: 767 },
    { x: '2018', y: 604 },
    { x: '2019', y: 812 },
    { x: '2020', y: 867 }
  ];

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-bg">
      <div className="w-1/2 shadow rounded-sm bg-white">
        <VictoryChart height={300} width={500}>
          <VictoryLine
            categories={categories}
            data={data}
            interpolation="cardinal"
            labels={({ datum }) => datum.y}
          />
          <VictoryScatter
            data={data}
            size={3}
            style={{ data: { fill: '#c43a31' } }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default VictoryChartTest;
