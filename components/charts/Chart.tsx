import { useState } from 'react';
import { VictoryArea, VictoryScatter } from 'victory';
import ChartContainer from './ChartContainer';
import { darkBlue } from './theme';
import { GraphDataType, MultiGraphDataType } from '../../types/charts';
import Hint from '../elements/Hint';
import { TranslateInput } from '../../types/global';

interface ChartProps {
  title: TranslateInput;
  subtitle: TranslateInput;
  data: GraphDataType[] | MultiGraphDataType[];
  hintTitle: TranslateInput;
  hintBody: TranslateInput;
}

const Chart = ({ title, subtitle, data, hintBody, hintTitle }: ChartProps) => {
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  const maxDomain = 1000;

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
        style={{ data: { fill: darkBlue } }}
        labels={({ datum }) => (toolTipValue !== datum.y ? datum.y : null)}
      />
    </>
  );

  return (
    <div
      className="flex flex-col justify-between items-center px-4 pt-4 text-xs bg-white shadow-sm rounded-sm"
      data-testid="chart-testid"
    >
      <div className="w-full flex justify-between">
        <div>
          <p className="font-bold pb-2">{title}</p>
          <p className="opacity-70">{subtitle}</p>
        </div>
        <Hint title={hintTitle} body={hintBody} />
      </div>

      <div onMouseLeave={() => setToolTipValue(null)}>
        <ChartContainer
          height={250}
          width={480}
          max={maxDomain}
          tooltipValue={toolTipValue}
          handleSetTooltip={setToolTipValue}
        >
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
            style={{ data: { fill: darkBlue } }}
            labels={({ datum }) => (toolTipValue !== datum.y ? datum.y : null)}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default Chart;
