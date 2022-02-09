import React from 'react';
import { useTranslations } from 'use-intl';
import ESG from '../../../lib/funcs/esg';
import { getDomain } from '../../../lib/utils/text-helpers';
import { ReportSectionHeader } from '../../elements/Headers';
import EnvironmentalAssessment from './EnvironmentalAssessment';
import ESGCard from './ESGCard';

type ESGContainerProps = {
  sectors: { sector: string; match: string }[];
  governance: {
    pepFlags?: number | string;
  };
  environmental_details: {
    industry_sector: string | null;
  };
};

const ESGContainer = ({
  sectors,
  governance,
  environmental_details
}: ESGContainerProps) => {
  const { pepFlags } = governance;
  const t = useTranslations();

  const topThreeMatches = ESG.topXMatches(sectors, 3);

  const isLoading = !sectors;

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
            : sectors?.length && sectors.length > 0
            ? t('top_3_industries')
            : t('no_esg_results_found')
        }
        results={topThreeMatches}
      />
      <ESGCard
        title={t('governance')}
        description={t('data_on_company_governance')}
        asteriskText={t(
          'there_are_names_that_are_the_same_or_similar_to_a_risk_relevant_name'
        )}
        resultText={t('pep_flags')}
        rating={pepFlags}
        result={pepFlags && pepFlags > 0 ? 'negative' : 'neutral'}
      />
      <EnvironmentalAssessment
        industry_string={environmental_details.industry_sector}
      />
    </>
  );
};

export default ESGContainer;
