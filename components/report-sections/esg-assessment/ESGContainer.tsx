import React from 'react';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';
import fetcher from '../../../lib/utils/fetcher';
import { ReportSectionHeader } from '../../elements/Headers';
import ESGCard from './ESGCard';

type ESGContainerProps = {
  governance: {
    pepFlags?: number | string;
  };
};

type EsgApiResponse = {
  data: { name: string; score: number }[];
};

const ESGContainer = ({ governance }: ESGContainerProps) => {
  const { pepFlags } = governance;
  const t = useTranslations();

  // demo mode is engaged for now
  const { data } = useSWR<EsgApiResponse>(
    '/api/esg?company_website=https://w3.com&company_name=W3&type=demo',
    fetcher
  );

  return (
    <>
      <ReportSectionHeader text={t('esg')} />
      <p className="text-xl">{t('esg_assessment')}</p>
      {/* Not in final production */}
      {/* <ESGCard
                title={t('environmental')}
                description={t('using_environmental_indicators')}
                result={t('neutral')}
                resultText={t('environmental_impact')}
              /> */}

      <ESGCard
        title={t('industry')}
        description={t('data_on_industry')}
        resultText={t('top_3_industries')}
        results={data?.data}
      />
      <ESGCard
        title={t('governance')}
        description={t('data_on_company_governance')}
        resultText={t('pep_flags')}
        rating={pepFlags}
        result={pepFlags && pepFlags > 0 ? 'negative' : 'neutral'}
      />
    </>
  );
};

export default ESGContainer;
