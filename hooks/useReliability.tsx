import { useTranslations } from 'next-intl';

enum Reliability {
  RELIABLE = 'RELIABLE',
  CAUTION = 'CAUTION',
  CONCERN = 'CONCERN'
}

interface ReliabilityHook {
  barLabel: string;
  barYaxis: string;
  sectionTitle: string;
  inBoxTitle: string;
  infoBoxText: string;
  inBoxExtra: string;
  styles: string;
}

export const useReliability = ({
  score,
  hasTurnover,
  hasVolatility,
  hasAssets
}: {
  score: number;
  hasTurnover?: boolean;
  hasVolatility?: boolean;
  hasAssets?: boolean;
}): ReliabilityHook => {
  const t = useTranslations();

  let res = {
    sectionTitle: t('reliability_index'),
    inBoxTitle: t('data_reliability'),
    inBoxExtra: t('for_a_more_reliable_report_supplement_the_data')
  } as ReliabilityHook;

  const reliableText = `${hasTurnover ? t('reliable_turnover') : ''} ${
    hasVolatility ? t('reliable_volatility') : ''
  } ${hasAssets ? t('reliable_assets') : ''}`;

  const cautionText = `${hasTurnover ? t('caution_turnover') : ''} ${
    hasVolatility ? t('caution_volatility') : ''
  } ${hasAssets ? t('caution_assets') : ''}`;

  const concernText = `${hasTurnover ? t('concern_turnover') : ''} ${
    hasVolatility ? t('concern_volatility') : ''
  } ${hasAssets ? t('concern_assets') : ''}`;

  if (score >= 0.65) {
    res.barLabel = Reliability.RELIABLE;
    res.barYaxis = '75%';
    res.infoBoxText = reliableText;
    res.styles = 'bg-[#2BAD0133] border-[#2BAD01]';
  } else if (score > 0.35) {
    res.barLabel = Reliability.CAUTION;
    res.barYaxis = '40%';
    res.infoBoxText = cautionText;
    res.styles = 'bg-yellow-400 bg-opacity-30 border-yellow-400';
  } else {
    res.barLabel = Reliability.CONCERN;
    res.barYaxis = '5%';
    res.infoBoxText = concernText;
    res.styles = 'bg-red-400 bg-opacity-30 border-red-400';
  }

  return res;
};
