import { useState } from 'react';
import { VictoryArea, VictoryScatter } from 'victory';
import ChartContainer from './ChartContainer';
import { darkBlue } from './theme';
import { GraphDataType } from '../../types/charts';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Button from '../elements/Button';
import InfoPopover from '../elements/InfoPopover';
import { TranslateInput } from '../../types/global';

interface ChartProps {
  title: TranslateInput;
  subtitle: TranslateInput;
  data: GraphDataType[];
  hintTitle: TranslateInput;
  hintBody: TranslateInput;
}

const Chart = ({ title, subtitle, data, hintBody, hintTitle }: ChartProps) => {
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-between items-center p-4 text-xs bg-white shadow-sm rounded-sm">
      <div className="w-full flex justify-between">
        <div>
          <p className="font-bold pb-2">{title}</p>
          <p className="opacity-70">{subtitle}</p>
        </div>

        <InfoPopover title={hintTitle} body={hintBody} />
      </div>

      <div onMouseLeave={() => setToolTipValue(null)}>
        <ChartContainer
          height={250}
          width={400}
          max={1000}
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
