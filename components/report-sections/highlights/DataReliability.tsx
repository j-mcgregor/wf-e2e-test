/* eslint-disable sonarjs/cognitive-complexity */
import { useTranslations } from 'next-intl';
import { DataReliabilityType } from '../../../types/report';

const DataReliability = ({
  reliability
}: {
  reliability: DataReliabilityType;
}) => {
  const t = useTranslations();

  const reliabilityObj = {
    isReliable: reliability?.value >= 0.65,
    isCaution: reliability?.value >= 0.35 && reliability.value < 0.65,
    isConcern: reliability?.value < 0.35
  };

  const hasTurnover = reliability.details.includes('Turnover') || '';
  const hasVolatility = reliability.details.includes('Volatility') || '';
  const hasAssets = reliability.details.includes('Assets') || '';

  const reliableText = `${hasTurnover && t('reliable_turnover')} ${
    hasVolatility && t('reliable_volatility')
  } ${hasAssets && t('reliable_assets')}`;

  const cautionText = `${hasTurnover && t('caution_turnover')} ${
    hasVolatility && t('caution_volatility')
  } ${hasAssets && t('caution_assets')}`;

  const concernText = `${hasTurnover && t('concern_turnover')} ${
    hasVolatility && t('concern_volatility')
  } ${hasAssets && t('concern_assets')}`;

  const reliabilityText = reliabilityObj.isReliable
    ? reliableText
    : reliabilityObj.isCaution
    ? cautionText
    : concernText;

  const reliabilityStyles = reliabilityObj.isReliable
    ? 'bg-[#2BAD0133] border-[#2BAD01]'
    : reliabilityObj.isCaution
    ? 'bg-highlight bg-opacity-60 border-highlight'
    : 'bg-red-500 bg-opacity-60 border-red-500';

  return (
    <div className="sm:w-1/2 md:w-full lg:w-1/2 h-full py-6 print:w-full sm:print:w-full print:flex">
      <div
        className={`${reliabilityStyles} border-2 rounded h-1/2 text-sm py-4 px-3`}
      >
        <p className="font-bold pb-2">{t('data_reliability')}</p>
        <p>{reliabilityText}</p>
        <p>{t('for_a_more_reliable_report_supplement_the_data')}</p>
      </div>
    </div>
  );
};

export default DataReliability;
