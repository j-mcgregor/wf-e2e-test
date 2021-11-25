import { useTranslations } from 'next-intl';
import { DataReliabilityType } from '../../../types/report';

const DataReliability = ({
  reliability
}: {
  reliability: DataReliabilityType;
}) => {
  const t = useTranslations();

  const reliabilityObj = {
    isReliable: reliability.value >= 0.65,
    isCaution: reliability.value >= 0.35 && reliability.value < 0.65,
    isConcern: reliability.value < 0.35
  };

  const reliableText =
    'We have accessed enough data to complete a report. If you would like to supplement the data in this report with the most recent management accounts please use the button below.';
  const cautionText =
    'The company is only just big enough to fit into the proven range for our model to operate on. For a more reliable report you can supplement the data in this report with recent management accounts using the button below.';
  const concernText =
    'We have not been able to access enough data to complete a reliable report. The data we have is reported below and is provided for your information. If you are able to supplement the data in this report with recent management accounts then please use the button below.';

  const reliabilityTextObj = {
    // reliability: reliabilityObj.isReliable ? t('reliable') : reliabilityObj.isCaution ? t('caution') : t('concern'),
    details: reliabilityObj.isReliable
      ? reliableText
      : reliabilityObj.isCaution
      ? cautionText
      : concernText
  };

  return (
    <div className="sm:w-1/2 md:w-full lg:w-1/2 h-full py-6 print:w-full sm:print:w-full print:flex">
      <div className="bg-[#2BAD0133] border-2 border-[#2BAD01] rounded  h-1/2 text-sm py-4 px-3">
        <p className="font-bold pb-2">{t('data_reliability')}</p>
        <p>{reliabilityTextObj.details}</p>
      </div>
    </div>
  );
};

export default DataReliability;
