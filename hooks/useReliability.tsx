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
  score
}: {
  score: number;
}): ReliabilityHook => {
  const t = useTranslations();

  let res = {
    sectionTitle: t('reliability_index'),
    inBoxTitle: t('data_reliability'),
    inBoxExtra: t('for_a_more_reliable_report_supplement_the_data')
  } as ReliabilityHook;

  if (score > 0.65) {
    res.barLabel = Reliability.RELIABLE;
    res.barYaxis = '75%';
    res.infoBoxText = t('reliableText');
    res.styles = 'bg-[#2BAD0133] border-[#2BAD01]';
  } else if (score > 0.35) {
    res.barLabel = Reliability.CAUTION;
    res.barYaxis = '40%';
    res.infoBoxText = t('cautionText');
    res.styles = 'bg-yellow-400 bg-opacity-30 border-yellow-400';
  } else {
    res.barLabel = Reliability.CONCERN;
    res.barYaxis = '5%';
    res.infoBoxText = t('concernText');
    res.styles = 'bg-red-400 bg-opacity-30 border-red-400';
  }
  return res;
};
