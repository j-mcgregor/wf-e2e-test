import {
  VictoryArea,
  VictoryChart,
  VictoryLabel,
  VictoryScatter
} from 'victory';

import { theme, darkBlue } from './theme';
import { data } from './data';

const VictoryChartTest = () => {
  const selectedDataPoint = 2;

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-bg">
      <div className="w-1/2 shadow rounded-sm bg-white">
        <VictoryChart
          height={250}
          width={400}
          theme={theme}
          maxDomain={{ y: 1000 }}
          minDomain={{ y: 200 }}
        >
          <VictoryArea
            data={data}
            interpolation="natural"
            labels={({ datum, data }) =>
              datum.y === data[selectedDataPoint].y ? datum.y : null
            }
          />
          {/* DATA MARKER DOTS */}
          <VictoryScatter
            data={data}
            size={2}
            style={{ data: { fill: darkBlue } }}
            labels={({ datum, data }) =>
              datum.y !== data[selectedDataPoint].y ? datum.y : null
            }
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default VictoryChartTest;

// THIS FUNCTION IN A LABELS PROP GETS THE LABEL FOR THE SPECIFIED INDEX FROM THE DATA ARRAY

// labels={({ datum, data }) =>
// datum.y === data[3].y ? datum.y : null
// }
