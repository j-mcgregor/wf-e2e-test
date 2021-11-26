import React from 'react';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';
import fetcher from '../../../lib/utils/fetcher';
import { addHttps } from '../../../lib/utils/text-helpers';
import { ReportSectionHeader } from '../../elements/Headers';
import ESGCard from './ESGCard';

type ESGContainerProps = {
  governance: {
    pepFlags?: number | string;
  };
  website: string;
  companyName: string;
};

type EsgApiResponse = {
  data: { name: string; score: number }[];
};

const ESGContainer = ({
  governance,
  website = 'https://w3.com',
  companyName = 'W3'
}: ESGContainerProps) => {
  const { pepFlags } = governance;
  const t = useTranslations();

  const validWebsite = addHttps(website);

  // demo mode is engaged for now
  const { data } = useSWR<EsgApiResponse>(
    `/api/reports/esg?company_website=${validWebsite}&company_name=${companyName}&type=website`,
    // `/api/reports/esg?company_website=${website}&company_name=${companyName}&type=website`,
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
        resultText={
          data?.data?.length && data.data.length > 0
            ? t('top_3_industries')
            : t('no_esg_results_found')
        }
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
