import { useTranslations } from 'next-intl';
import Hint from '../../elements/Hint';

interface ReliabilityIndexProps {
  reliability: number;
}

const reliabilityIndexClasses = {
  chrome: {
    container: 'flex justify-center items-center'
  }
};

const ReliabilityIndex = ({ reliability }: ReliabilityIndexProps) => {
  const t = useTranslations();

  const reliabilityText =
    reliability >= 0.65
      ? t('reliable')
      : reliability > 0.3
      ? t('caution')
      : t('concern');

  return (
    <div className="flex flex-col">
      <div className="flex pb-4">
        <p className="font-bold pr-8 print:pt-2">{t('reliability_index')}</p>
        <Hint
          title="Reliability Index"
          body="Aute nisi ut eiusmod qui proident."
        />
      </div>

      <div className="p-8">
        <div className="h-52 w-24 self-center relative rounded  bg-gradient-to-b from-[#2BAD01] via-[#FFC702] to-[#FF0000]">
          <div
            style={{ bottom: `${reliability * 91}%` }}
            className={`bg-[#00263C] text-white font-bold p-2 absolute -right-28 -ml-2 flex items-center justify-center rounded-sm text-sm
          `}
          >
            <div className="h-0 w-0 border-t-[12px] border-b-[12px] border-r-[20px] border-transparent border-r-[#00263C] absolute right-[100px] rounded-b " />
            <span className="uppercase">{reliabilityText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReliabilityIndex;
