/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react';
import { useTranslations } from 'use-intl';

import usePrintClasses from '../../hooks/usePrintClasses';
import { mockSubsidiaries } from '../../lib/mock-data/subsidiaries';
import {
  calculateLGDRotation,
  calculatePoDRotation,
  calculateSMEZScoreRotation
} from '../../lib/utils/report-helpers';
import {
  getBoardMember,
  getDirectorsFromBoardMembers
} from '../../lib/utils/text-helpers';
import { ReportDataProps } from '../../pages/report/[id]';
import HashContainer from '../elements/HashContainer';
import { ReportSectionHeader } from '../elements/Headers';
import Hint from '../elements/Hint';
import CorporateOverview from './corporate-governance/CorporateOverview';
import { DirectorsList } from './corporate-governance/DirectorsList';
import Profiles from './corporate-governance/Profiles';
import ShareHolderList from './corporate-governance/ShareHolderList';
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

  const lastFiledAccount = data?.financials?.[0]?.period || t('na');

  const companyDetails = data?.details;

  const companyAddress = companyDetails?.address;

  const date = new Date(`${data?.created_at}`);

  const reliabilityIndex = data.reliability_index;

  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const created = `${date.getDate()}.${month}.${date.getFullYear()}`;

  // remove years that are dormant
  const transformedFinancials =
    (data?.financials &&
      data?.financials?.filter((_year, index) => {
        // if (companyDetails?.status) {
        //   return companyDetails?.status[Number(index)] === 'Active';
        // }
        // handle issues with status preventing showing any financials
        return true;
      })) ||
    [];

  // used for report financials summary
  // and used for financial charts
  const lastFiveYearsFinancials =
    (data?.financials && transformedFinancials?.slice(0, 5)) || [];

  const financialRatios = [...(data?.financial_ratios || [])];

  // TEMPORARILY REVERSING FINANCIAL_RATIOS UNTIL BACK END FIXES
  const lastFiveYearsFinancialRatios = financialRatios.reverse()?.slice(0, 5);

  const lastFiveYearsBenchmarks =
    (data?.benchmarks && data.benchmarks?.slice(0, 5)) || [];

  const riskMetrics = [...(data?.risk_metrics || [])];

  // reversing array to get the latest 5 years of financials
  const lastFiveYearsRiskMetrics = React.useMemo(
    () => riskMetrics.slice(0, 5) || [],
    [data.risk_metrics]
  );

  // take the latest year of financial risk metrics
  const latestRiskMetrics = data.risk_metrics?.[data.risk_metrics.length - 1];

  const mergedLastFiveYearFinancials = lastFiveYearsFinancials.map(
    (year, index) => {
      // eslint-disable-next-line security/detect-object-injection
      return { ...year, ...lastFiveYearsFinancialRatios[index] };
    }
  );

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

  const smeZScoreRotation = calculateSMEZScoreRotation(
    latestRiskMetrics?.sme_z_score
  );
  const poDRotation = calculatePoDRotation(
    latestRiskMetrics?.probability_of_default_1_year
  );
  const lGDDRotation = calculateLGDRotation(
    latestRiskMetrics?.loss_given_default
  );

  const directors = getDirectorsFromBoardMembers(data?.board_members) || [];

  return (
    <div id="full-report" className="text-primary mt-10 lg:mt-0 pb-24">
      <div className="sm:py-8 print:border print:pb-0 print:border-none print:-mb-16">
        <ReportHeader
          company={companyName}
          website={data.details?.websites?.[0]}
          created={created}
          reportId={id.toString()} // id == string || string[]
        />
      </div>
      <HashContainer name={'Summary'} id={`summary`}>
        <ReportSectionHeader text={t('summary')} onNewPageForPrint={false} />

        <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm md:print:flex-col ">
          <div className="flex w-full md:w-1/2 flex-col py-2 md:print:w-full">
            <SummaryDetails
              regNumber={data.company_id}
              sector={data.details?.industry_sector}
              description={data?.details?.overview_full}
              incorporationDate={data?.details?.date_of_incorporation}
              lastAccountDate={lastFiledAccount}
              country={companyDetails?.address?.country}
              naceCode={companyDetails?.nace_code}
              naceName={companyDetails?.nace_name}
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
              phoneNumbers={companyDetails?.phone}
              websites={companyDetails?.websites}
            />
          </div>
        </div>
        <div className="py-4 avoid-break">
          <SummaryFinancial years={lastFiveYearsFinancials} />
        </div>
      </HashContainer>
      <HashContainer name={'Risk Metrics'} id={`risk_metrics`}>
        <ReportSectionHeader text={t('risk_metrics')} />
        <div className="flex w-full flex-wrap justify-center xl:justify-between mb-4 print:border-2">
          <Speedometer
            title={t('sme_zscore')}
            value={latestRiskMetrics?.sme_z_score}
            rotation={smeZScoreRotation}
            secondaryValues={[
              { name: INDUSTRY_BENCHMARK, value: null },
              { name: REGION_BENCHMARK, value: null }
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
            rotation={poDRotation}
            asMetric="%"
            secondaryValues={[
              { name: INDUSTRY_BENCHMARK, value: null },
              { name: REGION_BENCHMARK, value: null }
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
            rotation={lGDDRotation}
            asMetric="%"
            secondaryValues={[
              { name: INDUSTRY_BENCHMARK, value: null },
              { name: REGION_BENCHMARK, value: null }
            ]}
            hint={
              <Hint
                title={t('report_hints.risk_metrics.loss_given_default.title')}
                body={t('report_hints.risk_metrics.loss_given_default.body')}
              />
            }
            decimalPoints={1}
            reverseX
          />
        </div>
        <RiskMetricGraphs
          data={lastFiveYearsRiskMetrics}
          companyName={companyName}
        />
        <BondRating score={latestRiskMetrics?.bond_rating_equivalent} />
      </HashContainer>
      <HashContainer name={'Highlights'} id={`highlights`}>
        <ReportSectionHeader text={t('highlights')} />

        <div
          className={`flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center pb-6 print:items-start print:justify-evenly print:border-2 print:px-4 ${printClasses?.highlights?.container}`}
        >
          <ReliabilityIndex reliability={data?.reliability_index?.value} />
          {forPrint && (
            <div>
              <FinancialAccounts financialYears={transformedFinancials} />
            </div>
          )}
          {!forPrint && <DataReliability reliability={reliabilityIndex} />}
        </div>
        {forPrint && <DataReliability reliability={reliabilityIndex} />}
        <div className="flex ">
          <RiskOutlook
            hintTitle="hint title"
            hintBody="hint body"
            financials={transformedFinancials}
            benchmarks={{ value: latestRiskMetrics?.sme_z_score }}
            country={companyAddress?.country}
            legalEvents={data?.legal_events}
          />
        </div>
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
              // linkTo='/'
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
          currency={data.currency}
          financialData={mergedLastFiveYearFinancials.reverse()}
          benchmarkData={lastFiveYearsBenchmarks.reverse()}
          companyName={companyName}
        />
      </HashContainer>

      <HashContainer name={'Corporate Governance'} id={`corporate_governance`}>
        <ReportSectionHeader text={t('corporate_governance')} />
        <CorporateOverview
          cfo={getBoardMember('CFO', data?.board_members)}
          ceo={getBoardMember('CEO', data?.board_members)}
          chairman={getBoardMember('Chairman', data?.board_members)}
          directors={data?.details?.directors}
          employees={data?.details?.employees}
          shareholders={data?.details?.shareholders}
          subsidiaries={data?.details?.subsidiaries}
        />

        {directors.length && <DirectorsList directors={directors} />}

        <Profiles
          directors={data?.personal?.directors}
          seniorManagement={data?.personal?.senior_management}
        />

        {data.shareholders && (
          <ShareHolderList shareholders={data?.shareholders} />
        )}

        {/* Removed till we know more about whether it is going to be included */}
        {/* <ShareHoldingCard
                total={391}
                above10={2}
                fiveToTen={18}
                oneToFive={47}
                belowOne={324}
              /> */}
      </HashContainer>

      <HashContainer
        name={'Subsidiaries'}
        id={`subsidiaries`}
        fullHeight={false}
      >
        <ReportSectionHeader text={t('structure')} />
        <SubsidiaryList
          subsidiaries={data?.subsidiaries}
          companyName={companyName}
        />
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
        <ReportSectionHeader text={t('macro_economic_trends')} />
        <MacroEconomicTrends trends={data?.macroeconomics} />
      </HashContainer>

      <HashContainer name={'ESG'} id={`esg`} fullHeight={false}>
        <ESGContainer
          governance={{
            pepFlags: pepFlags
          }}
          companyName={companyName}
          website={data?.details?.websites?.find((x: string) => x) || ''}
          environmental_details={{
            industry_sector: data?.details?.industry_sector
          }}
        />
      </HashContainer>

      <HashContainer name={'News'} id={`news`}>
        <ReportSectionHeader text={t('news')} />
        <NewsFeed companyName={companyName} country={companyAddress?.country} />
      </HashContainer>
    </div>
  );
};

export default Report;
