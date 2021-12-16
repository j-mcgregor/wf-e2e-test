import React from 'react';
import { useTranslations } from 'use-intl';
import { ReportDataProps } from '../../pages/report/[id]';
import HashContainer from '../elements/HashContainer';
import { ReportSectionHeader } from '../elements/Headers';
import Hint from '../elements/Hint';
import CorporateOverview from './corporate-governance/CorporateOverview';
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
import ReportHeader from './ReportHeader';
import BondRating from './risk-metrics/BondRating';
import Speedometer from './risk-metrics/Speedometer';
import SummaryDetails from './summary/SummaryDetails';
import SummaryFinancial from './summary/SummaryFinancial';
import SummaryMap from './summary/SummaryMap';

import usePrintClasses from '../../hooks/usePrintClasses';
import {
  calculateLGDRotation,
  calculatePoDRotation,
  calculateSMEZScoreRotation
} from '../../lib/utils/report-helpers';

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

  const riskMetrics = data.risk_metrics?.[data.risk_metrics.length - 1];
  const reliabilityIndex = data.reliability_index;

  const created = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  // remove years that are dormant
  const transformedFinancials =
    (data?.financials &&
      data?.financials?.filter((_year, index) => {
        // console.log(companyDetails?.status[Number(index)])
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
    riskMetrics?.sme_z_score
  );
  const poDRotation = calculatePoDRotation(
    riskMetrics?.probability_of_default_1_year
  );
  const lGDDRotation = calculateLGDRotation(riskMetrics?.loss_given_default);

  return (
    <div id="full-report" className="text-primary mt-10 lg:mt-0">
      <div className="sm:py-8 print:border print:pb-0 print:border-none print:-mb-16">
        <ReportHeader
          company={companyName}
          website={data.details?.websites?.[0]}
          created={created}
          reportId={id[0]}
        />
      </div>
      <HashContainer name={'Summary'} id={`summary`}>
        <ReportSectionHeader text={t('summary')} onNewPageForPrint={false} />

        <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm md:print:flex-col ">
          <div className="flex w-full md:w-1/2 flex-col py-2 md:print:w-full">
            <SummaryDetails
              regNumber={data.company_id}
              sector={data.details?.industry_sector}
              description={data?.details?.company_description}
              incorporationDate={data?.details?.date_of_incorporation}
              lastAccountDate={lastFiledAccount}
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
            value={riskMetrics?.sme_z_score}
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
            value={riskMetrics?.probability_of_default_1_year * 100}
            rotation={poDRotation}
            as="%"
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
          />
          <Speedometer
            title={t('loss_give_default')}
            value={riskMetrics?.loss_given_default * 100}
            rotation={lGDDRotation}
            as="%"
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
          />
        </div>
        <BondRating score={riskMetrics?.bond_rating_equivalent} />
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
            benchmarks={{ value: riskMetrics?.sme_z_score }}
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
          financialData={lastFiveYearsFinancials}
          companyName={companyName}
        />
      </HashContainer>

      <HashContainer name={'Corporate Governance'} id={`corporate_governance`}>
        <ReportSectionHeader text={t('corporate_governance')} />

        <CorporateOverview
          cfo={data?.personal?.cfo}
          ceo={data?.personal?.ceo}
          chairman={data?.personal?.chairman}
          directors={data.personal?.directors?.length}
          seniorManagement={data.personal?.senior_management?.length}
          shareholders={data?.shareholders?.length}
        />

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
        <MacroEconomicTrends trends={[]} />
      </HashContainer>

      <HashContainer name={'ESG'} id={`esg`} fullHeight={false}>
        <ESGContainer
          governance={{
            pepFlags: pepFlags
          }}
          companyName={companyName}
          website={data?.details?.websites?.find((x: string) => x) || ''}
          environmental_details={{
            nace_code: data?.details?.nace_code,
            nace_description: data?.details?.nace_name
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
