import { useState, useEffect } from 'react';
import { VictoryArea, VictoryScatter, VictoryGroup } from 'victory';
import ChartContainer from './ChartContainer';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { MultiGraphDataType } from '../../types/charts';
import Button from '../elements/Button';
import { TranslateInput } from '../../types/global';

interface ChartMultiProps {
  graphData: MultiGraphDataType[];
  header: TranslateInput;
  subHeader: TranslateInput;
  hintTitle?: TranslateInput;
  hintBody?: TranslateInput;
}

const ChartMulti = ({ graphData, header, subHeader }: ChartMultiProps) => {
  const [data, setData] = useState<MultiGraphDataType[] | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(0);
  const [toolTipValue, setToolTipValue] = useState<number | null>(null);

  useEffect(() => {
    data !== graphData && setData(graphData);
  }, []);

  const black = '#022D45';
  const blue = '#278EC8';
  const green = '#2BAD01';

  const graphColors = (i: number): string => {
    return i === 0 ? black : i === 1 ? blue : green;
  };

  return (
    <div className="shadow rounded-sm bg-white flex flex-col">
      <div className="flex justify-between items-start p-4 text-xs">
        <div>
          <p className="font-bold pb-2">{header}</p>
          <p className="opacity-70">{subHeader}</p>
        </div>

        <Button variant="none" newClassName="w-6 h-6">
          <InformationCircleIcon />
        </Button>
      </div>
      <ChartContainer
        height={250}
        width={200}
        max={800}
        tooltipValue={toolTipValue}
        handleSetTooltip={setToolTipValue}
      >
        <VictoryGroup style={{ data: { strokeWidth: 1.5 } }}>
          {data?.map(
            (company, i) =>
              company.data.length > 0 && (
                <VictoryArea
                  animate={{
                    duration: 500,
                    onLoad: { duration: 500 }
                  }}
                  data={company.data}
                  interpolation="natural"
                  style={{
                    data: {
                      fill: graphColors(i),
                      fillOpacity: i === selectedCompany ? '0.5' : '0.2',
                      stroke: graphColors(i),
                      strokeOpacity: i === selectedCompany ? '0.9' : '0.15'
                    }
                  }}
                />
              )
          )}
        </VictoryGroup>
        <VictoryGroup>
          {data?.map(
            (company, i) =>
              company.data.length > 0 && (
                <VictoryScatter
                  data={company.data}
                  size={2}
                  style={{
                    data: {
                      strokeWidth: 1,
                      stroke: graphColors(i),
                      strokeOpacity: i === selectedCompany ? '1' : '0.3',
                      fill: i !== selectedCompany ? 'white' : graphColors(i),
                      fillOpacity: i === selectedCompany ? '1' : '0.3'
                    }
                  }}
                  labels={({ datum }) =>
                    data.indexOf(company) === selectedCompany &&
                    toolTipValue !== datum.y
                      ? datum.y
                      : null
                  }
                />
              )
          )}
        </VictoryGroup>
      </ChartContainer>

      <div className="flex flex-col text-xs px-1 lg:px-4 pb-4 w-full items-evenly justify-evenly text-primary">
        {data?.map((company, i) => {
          const bg =
            company.name === 'Industry Benchmark'
              ? `bg-[#278EC8]`
              : company.name === 'Region Benchmark'
              ? `bg-[#2BAD01]`
              : `bg-[#022D45]`;

          const border =
            company.name === 'Industry Benchmark'
              ? `border-[#278EC8]`
              : company.name === 'Region Benchmark'
              ? `border-[#2BAD01]`
              : `border-[#022D45]`;

          return !company.data.length ? (
            <button
              disabled
              key={i}
              className={`flex items-center py-1 justify-start w-full cursor-default opacity-50`}
            >
              <div className={`border-2 ${border} w-4 h-4 mx-2`} />
              <p>{company.name}</p>
            </button>
          ) : (
            <button
              key={i}
              onClick={() => setSelectedCompany(i)}
              className={`${
                selectedCompany === i && 'font-bold'
              } flex items-center py-1 justify-start w-full`}
            >
              <div
                className={`${
                  selectedCompany !== i ? `border-2 ${border}` : `${bg}`
                } w-4 h-4 mx-2`}
              />
              <p>{company.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChartMulti;
