/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react';
import { useTranslations } from 'use-intl';

import usePrintClasses from '../../hooks/usePrintClasses';
import ESG from '../../lib/funcs/esg';
import {
  calculateLGDRotation,
  calculatePoDRotation,
  calculateSMEZScoreRotation
} from '../../lib/utils/report-helpers';
import { getBoardMember } from '../../lib/utils/text-helpers';
import { ReportDataProps } from '../../types/report';
import HashContainer from '../elements/HashContainer';
import { ReportSectionHeader } from '../elements/Headers';
import Hint from '../elements/Hint';
import CorporateOverview from './corporate-governance/CorporateOverview';
import ExecutiveCardList from './corporate-governance/ExecutiveList';
import Profiles from './corporate-governance/Profiles';
import ShareHolderList from './corporate-governance/ShareHolderList';
import ESGCard from './esg-assessment/ESGCard';
import ESGContainer from './esg-assessment/ESGContainer';
import FinancialTrends from './financial-trends/FinancialTrends';
import CTACard from './highlights/CTACard';
import DataReliability from './highlights/DataReliability';
import FinancialAccounts from './highlights/FinancialAccounts';
import ReliabilityIndex from './highlights/ReliabilityIndex';
import RiskOutlook from './highlights/RiskOutlook';
import LegalEvents from './legal-events/LegalEvents';
import MacroEconomicTrends from './macro-economic-trends/MacroEconomicTrends';
import NewsFeed from './news/NewsFeed';
import { ParentsList } from './parents/ParentsList';
import ReportHeader from './ReportHeader';
import BondRating from './risk-metrics/BondRating';
import RiskMetricGraphs from './risk-metrics/RiskMetricGraphs';
import Speedometer from './risk-metrics/Speedometer';
import { SubsidiaryList } from './subsidiaries/SubsidiaryList';
import SummaryDetails from './summary/SummaryDetails';
import SummaryFinancial from './summary/SummaryFinancial';
import SummaryMap from './summary/SummaryMap';

const Report = ({
  data,
  id,
  forPrint
}: {
  data: ReportDataProps;
  id: string | string[];
  forPrint?: boolean;
}) => {
  const t = useTranslations();

  const companyName = data?.details?.company_name || data?.details?.name || '';

  const companyDetails = data?.details;

  const companyAddress = companyDetails?.address;

  const reliabilityIndex = data?.reliability_index;

  // remove years that are dormant
  const transformedFinancials = data?.financials || [];

  // used for report financials summary
  // and used for financial charts
  const lastFiveYearsFinancials = data?.financials
    ? transformedFinancials.slice(-5, transformedFinancials.length)
    : [];

  const financialRatios = [...(data?.financial_ratios || [])];

  const lastFiveYearsFinancialRatios = financialRatios?.slice(
    -5,
    transformedFinancials.length
  );

  // remove benchmarks from financial trends
  // add to speedos later
  // const lastFiveYearsBenchmarks =
  //   (data?.benchmarks && data?.benchmarks?.slice(0, 5)) || [];

  const riskMetrics = [...(data?.risk_metrics || [])];

  // reversing array to get the latest 5 years of financials
  const lastFiveYearsRiskMetrics = React.useMemo(
    () => riskMetrics.slice(-5, transformedFinancials.length) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.risk_metrics]
  );

  // take the latest year of financial risk metrics
  const latestRiskMetrics = data?.risk_metrics?.[data?.risk_metrics.length - 1];

  const mergedLastFiveYearFinancials = lastFiveYearsFinancials
    .map((year, index) => {
      // eslint-disable-next-line security/detect-object-injection
      return { ...year, ...lastFiveYearsFinancialRatios[index] };
    })
    .reverse();

  const INDUSTRY_BENCHMARK = t('industry_benchmark');
  const REGION_BENCHMARK = t('region_benchmark');

  const pepFlags = React.useMemo(
    () =>
      data?.shareholders?.filter(
        (shareholder: any) => shareholder?.peps_sanctions_enforcements
      ).length,
    [data?.shareholders]
  );

  const reportClasses = {
    chrome: {
      highlights: {
        container: 'flex print:flex-row sm:print:flex-row md:print:flex-row'
      },
      summary: {
        header: 'print:mt-16'
      }
    },
    'microsoft edge': {
      highlights: {
        container:
          'flex print:flex-row sm:print:flex-row md:print:flex-row border-2'
      }
    }
  };

  const printClasses = usePrintClasses(reportClasses);

  //* replaced this with new `directors` array from backend
  // const directors = getDirectorsFromBoardMembers(data?.board_members) || [];
  const latestFinancialYear = data?.financials[data?.financials?.length - 1];

  // check whether to render commentary
  const shouldRenderCommentary =
    data?.risk_metrics && data?.risk_metrics.length > 0;

  return (
    <div id="full-report" className="text-primary mt-10 lg:mt-0 pb-24">
      <div className="sm:py-8 print:border print:pb-0 print:border-none print:-mb-16">
        <ReportHeader
          company={companyName}
          website={data?.details?.website}
          created={data.created_at}
          reportId={id.toString()} // id == string || string[]
          snippet={{
            bond_rating_equivalent: latestRiskMetrics?.bond_rating_equivalent,
            sme_z_score: latestRiskMetrics?.sme_z_score,
            probability_of_default_1_year:
              latestRiskMetrics?.probability_of_default_1_year
          }}
        />
      </div>
      <HashContainer name={'Summary'} id={`summary`}>
        <div className={printClasses?.summary?.header}>
          <ReportSectionHeader text={t('summary')} onNewPageForPrint={false} />
        </div>

        <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm md:print:flex-col ">
          <div className="flex w-full md:w-1/2 flex-col py-2 md:print:w-full">
            <SummaryDetails
              regNumber={data?.company_id}
              sector={data?.details?.industry_sector}
              description={data?.details?.description}
              incorporationDate={data?.details?.date_of_incorporation}
              lastAccountDate={data?.details?.last_annual_accounts_date}
              country={companyDetails?.address?.country}
              isoCode={data.iso_code}
              naceCode={companyDetails?.nace_code}
              naceName={companyDetails?.nace_name}
              companyStatus={companyDetails?.status}
              currency={data?.currency}
            />
          </div>

          <div className="flex w-full md:w-1/2 flex-col py-2 md:print:w-full">
            <SummaryMap
              postCode={companyAddress?.post_code}
              addressLines={[
                companyAddress?.line_1,
                companyAddress?.line_2,
                companyAddress?.line_3,
                companyAddress?.line_4
              ]}
              city={companyAddress?.city}
              county={companyAddress?.county}
              region={companyAddress?.region}
              country={companyAddress?.country}
              emails={companyDetails?.emails}
              phoneNumbers={companyDetails?.phone_numbers}
              websites={companyDetails?.website}
            />
          </div>
        </div>
        <div className="py-4 avoid-break">
          <SummaryFinancial
            currencyCode={data?.currency}
            years={lastFiveYearsFinancials}
          />
        </div>
      </HashContainer>
      <HashContainer name={'Risk Metrics'} id={`risk_metrics`}>
        {/* <div
          className="flex w-full flex-wrap justify-evenly
        mb-4 print:border-2"
        > */}

        {/* NEW - Wrapped speedos and graphs in grid that matches financial trends */}

        <div className="">
          <ReportSectionHeader text={t('risk_metrics')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2  mt-4 mb-8 print:grid-cols-3 sm:print:grid-cols-3 md:print-grid-cols-3 print:max-w-[630px] print:mx-auto">
            <Speedometer
              title={t('sme_zscore')}
              value={latestRiskMetrics?.sme_z_score}
              rotationCalculator={calculateSMEZScoreRotation}
              secondaryValues={[
                {
                  name: INDUSTRY_BENCHMARK,
                  value: data?.benchmarks?.sector?.sme_z_score ?? null
                },
                {
                  name: REGION_BENCHMARK,
                  value: data?.benchmarks?.region?.sme_z_score ?? null
                }
              ]}
              hint={
                <Hint
                  title={t('report_hints.risk_metrics.sme_z-score.title')}
                  body={t('report_hints.risk_metrics.sme_z-score.body')}
                />
              }
            />
            <Speedometer
              title={t('probability_of_default')}
              value={latestRiskMetrics?.probability_of_default_1_year * 100}
              asMetric="%"
              rotationCalculator={calculatePoDRotation}
              secondaryValues={[
                {
                  name: INDUSTRY_BENCHMARK,
                  value:
                    data?.benchmarks?.sector?.probability_of_default_1_year *
                      100 ?? null
                },
                {
                  name: REGION_BENCHMARK,
                  value:
                    data?.benchmarks?.region?.probability_of_default_1_year *
                      100 ?? null
                }
              ]}
              hint={
                <Hint
                  title={t(
                    'report_hints.risk_metrics.probability_of_default.title'
                  )}
                  body={t(
                    'report_hints.risk_metrics.probability_of_default.body'
                  )}
                />
              }
              decimalPoints={2}
              reverseX
            />
            <Speedometer
              title={t('loss_give_default')}
              value={latestRiskMetrics?.loss_given_default * 100}
              asMetric="%"
              rotationCalculator={calculateLGDRotation}
              secondaryValues={[
                {
                  name: INDUSTRY_BENCHMARK,
                  value:
                    data?.benchmarks?.sector?.loss_given_default * 100 ?? null
                },
                {
                  name: REGION_BENCHMARK,
                  value:
                    data?.benchmarks?.region?.loss_given_default * 100 ?? null
                }
              ]}
              hint={
                <Hint
                  title={t(
                    'report_hints.risk_metrics.loss_given_default.title'
                  )}
                  body={t('report_hints.risk_metrics.loss_given_default.body')}
                />
              }
              decimalPoints={1}
              reverseX
            />
            <RiskMetricGraphs
              data={lastFiveYearsRiskMetrics}
              companyName={companyName}
            />
          </div>
        </div>
        <BondRating
          score={latestRiskMetrics?.bond_rating_equivalent}
          hint={
            <Hint
              title={t(
                'report_hints.risk_metrics.bond_rating_equivalent_default.title'
              )}
              body={t(
                'report_hints.risk_metrics.bond_rating_equivalent_default.body'
              )}
            />
          }
        />
      </HashContainer>

      <HashContainer name={'Highlights'} id={`highlights`}>
        <ReportSectionHeader text={t('highlights')} />
        <div
          className={`flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center pb-6 print:items-start print:justify-evenly print:border-2 print:px-4 ${printClasses?.highlights?.container}`}
        >
          {shouldRenderCommentary && (
            <ReliabilityIndex reliability={data?.reliability_index?.value} />
          )}

          {forPrint && (
            <div>
              <FinancialAccounts
                financialYears={transformedFinancials}
                accountsOverdue={data?.details?.is_accounts_filing_overdue}
              />
            </div>
          )}

          {!forPrint && shouldRenderCommentary && (
            <DataReliability reliability={reliabilityIndex} />
          )}
        </div>

        {forPrint && shouldRenderCommentary && (
          <DataReliability reliability={reliabilityIndex} />
        )}

        {shouldRenderCommentary && (
          <div className="flex">
            <RiskOutlook
              hintTitle={t('report_hints.highlights.risk_outlook.title')}
              hintBody={t('report_hints.highlights.risk_outlook.body')}
              riskOutlookData={data?.risk_outlook}
              country={companyAddress?.country}
              hasLegalEvents={data?.legal_events?.length > 0}
            />
          </div>
        )}
        <div className="flex flex-col lg:flex-row py-6 justify-between">
          {!forPrint && (
            <div className="min-w-[160px]">
              <FinancialAccounts financialYears={transformedFinancials} />
            </div>
          )}

          <div className="w-full lg:ml-8 print:hidden">
            <p className="font-bold py-2">{t('add_more_data')}</p>
            <CTACard
              title={t('import_data')}
              body={t('unlock_api_to_gain_access')}
              buttonText="Import"
              locked={true}
              buttonColor="bg-[#2BAD01]"
              learnMoreLink="#"
              disabled={true}
            />
            <CTACard
              title={t('upload_more_data')}
              body={t('upload_data_for_more_recent_report')}
              buttonText="Upload"
              buttonColor="bg-alt"
              linkTo={`${id}/upload-data`}
              learnMoreLink="#"
            />
          </div>
        </div>
      </HashContainer>

      <HashContainer name={'Financial Trends'} id={`financial_trends`}>
        <ReportSectionHeader text={t('financial_trends')} />
        <FinancialTrends
          currency={data?.currency}
          financialData={mergedLastFiveYearFinancials.reverse()}
          // been removed
          benchmarkData={[]}
          companyName={companyName}
        />
      </HashContainer>

      <HashContainer name={'Corporate Governance'} id={`corporate_governance`}>
        <ReportSectionHeader text={t('corporate_governance')} />
        <CorporateOverview
          cfo={getBoardMember('CFO', data?.board_members)}
          ceo={getBoardMember('CEO', data?.board_members)}
          chairman={getBoardMember('Chairman', data?.board_members)}
          directors={data?.directors?.length}
          employees={latestFinancialYear?.number_of_employees}
          shareholders={data?.shareholders?.length}
          subsidiaries={data?.subsidiaries?.length}
          seniorManagement={data?.executives?.length}
        />

        {data?.directors?.length > 0 && (
          <ExecutiveCardList
            title={t('directors')}
            executives={data?.directors}
            showAppointmentDate
          />
        )}

        {/*? ==== added copy of directors list for senior management/directors - should rename components? ==== */}
        {data?.executives?.length > 0 && (
          <ExecutiveCardList
            title={t('senior_management')}
            executives={data?.executives}
          />
        )}

        <Profiles
          directors={data?.personal?.directors}
          seniorManagement={data?.personal?.senior_management}
        />

        {data?.shareholders?.length > 0 && (
          <ShareHolderList shareholders={data?.shareholders} />
        )}
      </HashContainer>

      {/*  Subsidiaries */}
      <HashContainer
        name={'Subsidiaries'}
        id={`subsidiaries`}
        fullHeight={false}
      >
        <ReportSectionHeader text={t('structure')} />
        <ParentsList parents={data?.parents} />
        <SubsidiaryList subsidiaries={data?.subsidiaries} />
      </HashContainer>

      <HashContainer
        name={'Legal Events'}
        id={`legal_events`}
        fullHeight={false}
      >
        <ReportSectionHeader text={t('legal_events')} />

        <LegalEvents forPrint={forPrint} legalEvents={data?.legal_events} />
      </HashContainer>

      <HashContainer
        name={'Macro Economic Trends'}
        id={`macro_economic_trends`}
      >
        <ReportSectionHeader text={t('macroeconomic_trends')} />
        <MacroEconomicTrends trends={data?.macroeconomics} />
      </HashContainer>

      <HashContainer name={'ESG'} id={`esg`} fullHeight={false}>
        <ReportSectionHeader
          text={t('environmental')}
          hint={
            <Hint
              title={t('report_hints.esg.title')}
              body={t('report_hints.esg.body')}
            />
          }
        />
        <ESGCard
          title={t('activities')}
          description={t('data_on_activities')}
          resultText={
            data && data?.esg?.sectors && data?.esg?.sectors.length !== 0
              ? t('top_3_industries')
              : t('no_esg_results_found')
          }
          results={ESG.topXMatches(data?.esg?.sectors, 3) || []}
        />
        <ESGCard
          title={t('governance')}
          description={t('data_on_company_governance')}
          asteriskText={t(
            'there_are_names_that_are_the_same_or_similar_to_a_risk_relevant_name'
          )}
          resultText={t('pep_flags')}
          rating={pepFlags}
          result={pepFlags > 0 ? 'negative' : 'neutral'}
        />

        <ESGContainer
          companyName={data?.details.name || ''}
          sector={data.details?.industry_sector || ''}
          physical={data?.esg?.physical}
          transition={data?.esg?.transition}
          location={companyAddress?.city}
          isoCode={data?.iso_code}
        />
      </HashContainer>

      <HashContainer name={'News'} id={`news`}>
        <ReportSectionHeader text={t('news')} />
        <NewsFeed
          companyName={companyName}
          items={data?.news?.headlines}
          forPrint={forPrint}
        />
      </HashContainer>
    </div>
  );
};

export default Report;
