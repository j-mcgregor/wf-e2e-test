import { useTranslations } from 'next-intl';
import Hint from '../../elements/Hint';

interface ReliabilityIndexProps {
  reliability: string;
}

const ReliabilityIndex = ({ reliability }: ReliabilityIndexProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col">
      <div className="flex pb-4">
        <p className="font-bold pr-8">{t('reliability_index')}</p>
        <Hint
          title="Reliability Index"
          body="Aute nisi ut eiusmod qui proident."
        />
      </div>
      <div className="h-52 w-24 self-center rounded m-8 bg-gradient-to-b from-[#2BAD01] via-[#FFC702] to-[#FF0000]">
        <div
          className={`${
            reliability === 'reliable'
              ? 'top-0'
              : reliability === 'unreliable'
              ? 'top-40'
              : 'top-16'
          } bg-[#00263C] text-white font-bold p-2 relative -right-28 -ml-2 flex items-center justify-center rounded-sm text-sm
          `}
        >
          <div className="h-0 w-0 border-t-[12px] border-b-[12px] border-r-[20px] border-transparent border-r-[#00263C] absolute right-[100px] rounded-b" />
          <span className="uppercase">{reliability}</span>
        </div>
      </div>
    </div>
  );
};

export default ReliabilityIndex;
