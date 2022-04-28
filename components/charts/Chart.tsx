import { useState } from 'react';
import { VictoryArea, VictoryScatter, VictoryTooltip } from 'victory';

import { GraphDataType, MultiGraphDataType } from '../../types/charts';
import { TranslateInput } from '../../types/global';
import Hint from '../elements/Hint';
import ChartContainer from './ChartContainer';
import { companyBlue } from './theme';

interface ChartProps {
  title: TranslateInput;
  subtitle: TranslateInput;
  data: GraphDataType[] | MultiGraphDataType[];
  hintTitle?: TranslateInput;
  hintBody?: TranslateInput;
  showLabels?: boolean;
  tickCount?: number;
}

const Chart = ({
  title,
  subtitle,
  data,
  hintBody,
  hintTitle,
  showLabels = true,
  tickCount
}: ChartProps) => {
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  const getYValue = (d: GraphDataType | MultiGraphDataType) =>
    'y' in d ? d.y : 0;

  const maxDomain =
    (data && Math.floor(Math.max(...data.map(getYValue)) * 1.5)) || 1000;

  // only calculate and show minDomain if negative values present,
  let minDomain = 0;
  const hasNegativeValues = data?.some(d => ('y' in d ? d.y < 0 : false));
  if (hasNegativeValues) {
    minDomain =
      (data && Math.floor(Math.min(...data.map(getYValue)) * 1.5)) || -1000;
  }

  const InnerChart = () => (
    <>
      {' '}
      <VictoryArea
        data={data}
        interpolation="natural"
        labels={({ datum }) => datum.y}
        style={{
          labels: { fill: 'transparent ' },
          data: { strokeWidth: 1.5 }
        }}
      />
      <VictoryScatter
        data={data}
        size={3}
        style={{ data: { fill: companyBlue } }}
        labels={({ datum }) => (toolTipValue !== datum.y ? datum.y : null)}
      />
    </>
  );

  return (
    <div
      className="max-w-[450px] flex flex-col justify-between items-center px-4 pt-4 text-xs bg-white shadow-sm rounded-sm print:shadow-none w-full"
      data-testid="chart-testid"
    >
      <div className="w-full flex justify-between">
        <div>
          <p className="font-bold pb-2">{title}</p>
          <p className="opacity-70">{subtitle}</p>
        </div>
        {hintTitle && hintBody && <Hint title={hintTitle} body={hintBody} />}
      </div>

      <div onMouseLeave={() => setToolTipValue(null)}>
        <ChartContainer
          height={250}
          width={480}
          max={maxDomain}
          {...(hasNegativeValues && { min: minDomain })}
          xAxisLabelAngle={45}
          tickCount={tickCount}
        >
          <VictoryArea
            data={data}
            interpolation="natural"
            {...(showLabels && { labels: ({ datum }) => datum.y })}
            style={{
              labels: { fill: 'transparent' },
              data: { strokeWidth: 1.5 }
            }}
          />
          <VictoryScatter
            data={data}
            size={3}
            style={{ data: { fill: 'transparent' } }} // transparent to hide dots
            y0={() => minDomain * 0.8}
            {...(showLabels && {
              labels: ({ datum }) => (toolTipValue !== datum.y ? datum.y : null)
            })}
            labelComponent={
              <VictoryTooltip
                flyoutHeight={25}
                style={{
                  fill: '#fff',
                  fontSize: 18,
                  padding: 5
                }}
                flyoutStyle={{
                  fill: companyBlue
                }}
              />
            }
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default Chart;
