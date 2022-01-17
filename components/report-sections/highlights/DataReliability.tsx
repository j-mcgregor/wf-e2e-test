/* eslint-disable sonarjs/cognitive-complexity */
import { useReliability } from '../../../hooks/useReliability';
import { DataReliabilityType } from '../../../types/report';

const DataReliability = ({
  reliability
}: {
  reliability: DataReliabilityType;
}) => {
  const hasTurnover = reliability.details.includes('Turnover');
  const hasVolatility = reliability.details.includes('Volatility');
  const hasAssets = reliability.details.includes('Assets');

  const { styles, inBoxTitle, infoBoxText, inBoxExtra } = useReliability({
    score: reliability?.value,
    hasTurnover,
    hasVolatility,
    hasAssets
  });

  return (
    <div className="sm:w-1/2 md:w-full lg:w-1/2 h-full py-6 print:w-full sm:print:w-full print:flex">
      <div className={`${styles} border-2 rounded h-1/2 text-sm py-4 px-3`}>
        <p className="font-bold pb-2">{inBoxTitle}</p>
        <p className="mb-2">{infoBoxText}</p>
        <p>{inBoxExtra}</p>
      </div>
    </div>
  );
};

export default DataReliability;
