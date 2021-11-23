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
  const date = new Date(Number(data?.['created_at']));

  const created = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  const transformedFinancials =
    data?.financials &&
    Object.keys(data.financials)
      .map(year => {
        // eslint-disable-next-line security/detect-object-injection
        return { year, ...data.financials[year] };
      })
      .reverse();

  const lastFiveYearsFinancials =
    (data?.financials && transformedFinancials?.slice(0, 5)) || [];

  const INDUSTRY_BENCHMARK = t('industry_benchmark');
  const REGION_BENCHMARK = t('region_benchmark');

  const pepFlags = React.useMemo(
    () =>
      data?.personal?.shareholders?.filter(
        (shareholder: any) => shareholder?.peps_sanctions_enforcements
      ).length,
    [data?.personal?.shareholders]
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

  return (
    <div id="full-report" className="text-primary mt-10 lg:mt-0">
      <div className="sm:py-8 border print:pb-0 print:border-none print:-mb-16">
        <ReportHeader
          company={data?.company_name}
          created={created}
          reportId={id[0]}
        />
      </div>
      <HashContainer name={'Summary'} id={`summary`}>
        <ReportSectionHeader text={t('summary')} onNewPageForPrint={false} />

        <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm md:print:flex-col ">
          <div className="flex w-full md:w-1/2 flex-col py-2 md:print:w-full">
            <SummaryDetails
              regNumber={'SC172288'}
              sector={'Travel, Personal & Leisure'}
              description={data.contact_details.company_description}
              incorporationDate={data.contact_details.incorporation_date}
              lastAccountDate={'31/01/2020'}
            />
          </div>

          <div className="flex w-full md:w-1/2 flex-col py-2 md:print:w-full">
            <SummaryMap contact={data.contact_details} />
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
            title="SME Z-score"
            value={304}
            secondaryValues={[
              { name: INDUSTRY_BENCHMARK, value: 403 },
              { name: REGION_BENCHMARK, value: 204 }
            ]}
            hint={
              <Hint
                title={t('report_hints.risk_metrics.sme_z-score.title')}
                body={t('report_hints.risk_metrics.sme_z-score.body')}
              />
            }
          />
          <Speedometer
            title="Probability of Default"
            value="12.04%"
            secondaryValues={[
              { name: INDUSTRY_BENCHMARK, value: '6%' },
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
            title="Loss Given Default"
            value={304}
            secondaryValues={[
              { name: INDUSTRY_BENCHMARK, value: '12.5%' },
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
        <BondRating score={data.risk_metrics.bond_rating} />
      </HashContainer>
      <HashContainer name={'Highlights'} id={`highlights`}>
        <ReportSectionHeader text={t('highlights')} />

        <div
          className={`flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center pb-6 print:items-start print:justify-evenly print:border-2 print:px-4 ${printClasses?.highlights?.container}`}
        >
          <ReliabilityIndex
            reliability={data.highlights.data_reliability.reliability}
          />
          {forPrint && (
            <div>
              <FinancialAccounts financialYears={transformedFinancials} />
            </div>
          )}
          {!forPrint && (
            <DataReliability
              comment={data.highlights.data_reliability.comment}
            />
          )}
        </div>
        {forPrint && (
          <DataReliability comment={data.highlights.data_reliability.comment} />
        )}
        <div className="flex ">
          <RiskOutlook
            hintTitle="hint title"
            hintBody="hint body"
            reports={data.highlights.risk_outlook}
          />
        </div>
        <div className="flex flex-col lg:flex-row py-6 justify-between">
          {!forPrint && (
            <div>
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
        <FinancialTrends data={[]} />
      </HashContainer>

      <HashContainer name={'Corporate Governance'} id={`corporate_governance`}>
        <ReportSectionHeader text={t('corporate_governance')} />

        <CorporateOverview
          cfo={data.personal.cfo}
          ceo={data.personal.ceo}
          chairman={data.personal.chairman}
          directors={data.personal.directors.length}
          seniorManagement={data.personal.senior_management.length}
          shareholders={data.personal.shareholders.length}
        />

        <Profiles
          directors={data.personal.directors}
          seniorManagement={data.personal.senior_management}
        />

        <ShareHolderList shareholders={data.personal.shareholders} />

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
        <LegalEvents
          forPrint={forPrint}
          legalEvents={data?.legal_events?.legal_events}
        />
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
          companyName={data?.contact_details?.name}
          website={data?.contact_details?.websites.find((x: string) => x) || ''}
        />
      </HashContainer>

      <HashContainer name={'News'} id={`news`}>
        <ReportSectionHeader text={t('news')} />
        <NewsFeed
          companyName={data?.contact_details?.name}
          country={data?.contact_details?.country}
        />
      </HashContainer>
    </div>
  );
};

export default Report;
