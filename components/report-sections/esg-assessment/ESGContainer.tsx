import React from 'react';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';
import fetcher from '../../../lib/utils/fetcher';
import { getDomain } from '../../../lib/utils/text-helpers';
import { ReportSectionHeader } from '../../elements/Headers';
import EnvironmentalAssessment from './EnvironmentalAssessment';
import ESGCard from './ESGCard';

type ESGContainerProps = {
  governance: {
    pepFlags?: number | string;
  };
  website: string;
  companyName: string;
  environmental_details: {
    nace_code: string;
    nace_description: string;
  };
};

type EsgApiResponse = {
  data: { name: string; score: number }[];
};

const ESGContainer = ({
  governance,
  website = 'https://w3.com',
  companyName = 'W3',
  environmental_details
}: ESGContainerProps) => {
  const { pepFlags } = governance;
  const t = useTranslations();

  // extract just the domain
  const validWebsite = getDomain(website) || '';

  // demo mode is engaged for now
  const { data } = useSWR<EsgApiResponse>(
    `/api/reports/esg?company_website=${validWebsite}&company_name=${companyName}&type=website`,
    fetcher
  );

  const isLoading = !data;

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
        title={t('activities')}
        description={t('data_on_activities')}
        resultText={
          isLoading
            ? t('loading')
            : data?.data?.length && data.data.length > 0
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
      <EnvironmentalAssessment
        nace_code={environmental_details.nace_code}
        nace_description={environmental_details.nace_description}
      />
    </>
  );
};

export default ESGContainer;
