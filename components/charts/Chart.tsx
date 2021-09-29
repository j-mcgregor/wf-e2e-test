import { useState } from 'react';
import { VictoryArea, VictoryScatter } from 'victory';

import ChartContainer from './ChartContainer';
import { darkBlue } from './theme';
import { company1 } from './data';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Button from '../elements/Button';

interface ChartProps {
  title: string;
  subtitle: string;
}

const Chart = ({ title, subtitle }: ChartProps) => {
  const company = company1;

  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  return (
    <div className="flex flex-col justify-between items-center p-4 text-xs bg-white shadow-sm rounded-sm">
      <div className="w-full flex justify-between">
        <div>
          <p className="font-bold pb-2">{title}</p>
          <p className="opacity-70">{subtitle}</p>
        </div>
        <Button variant="none" newClassName="w-6 h-6">
          <InformationCircleIcon />
        </Button>
      </div>

      <div onMouseLeave={() => setToolTipValue(null)}>
        <ChartContainer
          height={350}
          width={600}
          max={1000}
          tooltipValue={toolTipValue}
          handleSetTooltip={setToolTipValue}
        >
          <VictoryArea
            data={company}
            interpolation="natural"
            labels={({ datum }) => datum.y}
            style={{
              labels: { fill: 'transparent ' },
              data: { strokeWidth: 1.5 }
            }}
          />
          <VictoryScatter
            data={company}
            size={3}
            style={{ data: { fill: darkBlue }, labels: { fontSize: 14 } }}
            labels={({ datum }) => (toolTipValue !== datum.y ? datum.y : null)}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default Chart;
