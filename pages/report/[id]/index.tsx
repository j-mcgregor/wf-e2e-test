/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import HashContainer from '../../../components/elements/HashContainer';
import { ReportSectionHeader } from '../../../components/elements/Headers';
import Layout from '../../../components/layout/Layout';
import ReportNav from '../../../components/layout/ReportNav';
import SecondaryLayout from '../../../components/layout/SecondaryLayout';
import TabletReportNav from '../../../components/layout/TabletReportNav';
import CorporateOverview from '../../../components/report-sections/corporate-governance/CorporateOverview';
import Profiles from '../../../components/report-sections/corporate-governance/Profiles';
import ShareHolderList from '../../../components/report-sections/corporate-governance/ShareHolderList';
import ESGCard from '../../../components/report-sections/esg-assessment/ESGCard';
import CTACard from '../../../components/report-sections/highlights/CTACard';
import DataReliability from '../../../components/report-sections/highlights/DataReliability';
import FinancialAccounts from '../../../components/report-sections/highlights/FinancialAccounts';
import ReliabilityIndex from '../../../components/report-sections/highlights/ReliabilityIndex';
import RiskOutlook from '../../../components/report-sections/highlights/RiskOutlook';
import LegalEvents from '../../../components/report-sections/legal-events/LegalEvents';
import ReportHeader from '../../../components/report-sections/ReportHeader';
import BondRating, {
  RatingType
} from '../../../components/report-sections/risk-metrics/BondRating';
import Hint from '../../../components/elements/Hint';
import Speedometer from '../../../components/report-sections/risk-metrics/Speedometer';
import SummaryDetails from '../../../components/report-sections/summary/SummaryDetails';
import SummaryFinancial from '../../../components/report-sections/summary/SummaryFinancial';
import SummaryMap from '../../../components/report-sections/summary/SummaryMap';
import SkeletonReport from '../../../components/skeletons/SkeletonReport';
import getServerSidePropsWithAuth from '../../../lib/auth/getServerSidePropsWithAuth';
import fetcher from '../../../lib/utils/fetcher';
import ErrorSkeleton from '../../../components/skeletons/ErrorSkeleton';
import {
  FinancialYear,
  LegalEvent,
  Profile,
  Reliability,
  Shareholder,
  SummaryContact,
  SummaryInfo
} from '../../../types/report';

import FinancialTrends from '../../../components/report-sections/financial-trends/FinancialTrends';
import MacroEconomicTrends from '../../../components/report-sections/macro-economic-trends/MacroEconomicTrends';
import NewsFeed from '../../../components/report-sections/news/NewsFeed';
import { REPORT_FETCHING_ERROR } from '../../../lib/utils/error-codes';

export interface ReportDataProps {
  id: string | number;
  created_at?: string;
  company_name: string;
  contact_details: SummaryContact & SummaryInfo;
  financials: {
    [year: string]: FinancialYear;
  };
  risk_metrics: {
    bond_rating: RatingType;
    sme_z_score: {
      value: string;
      regional_benchmark: string | null;
      industry_benchmark: string | null;
    };
    probability_of_default: {
      value: string;
      regional_benchmark: string | null;
      industry_benchmark: string | null;
    };
    loss_given_default: {
      value: string;
      regional_benchmark: string | null;
      industry_benchmark: string | null;
    };
  };
  highlights: {
    data_reliability: Reliability;
    risk_outlook: string[];
  };
  legal_events: {
    legal_events: LegalEvent[];
  };
  personal: {
    directors: Profile[];
    senior_management: Profile[];
    shareholders: Shareholder[];
    ceo: string;
    cfo: string;
    chairman: string;
  };
  error?: boolean;
  message?: string;
}

const Report = ({ data, id, t }) => {
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

  return (
    <div id="full-report" className="text-primary mt-10 lg:mt-0 mx-8">
      <div className="py-8">
        <h1 className="text-xl pb-4">{t('risk_assessment_report')}</h1>
        <ReportHeader
          company={data?.company_name}
          created={created}
          reportId={id[0]}
        />
      </div>
      <HashContainer name={'Summary'} id={`summary-id`}>
        <ReportSectionHeader text={t('summary')} />

        <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm">
          <div className="flex w-full md:w-1/2 flex-col py-2">
            <SummaryDetails
              regNumber={'SC172288'}
              sector={'Travel, Personal & Leisure'}
              description={data.contact_details.company_description}
              incorporationDate={data.contact_details.incorporation_date}
              lastAccountDate={'31/01/2020'}
            />
          </div>

          <div className="flex w-full md:w-1/2 flex-col py-2">
            <SummaryMap contact={data.contact_details} />
          </div>
        </div>
        <div className="py-4">
          <SummaryFinancial years={lastFiveYearsFinancials} />
        </div>
      </HashContainer>
      <HashContainer name={'Risk Metrics'} id={`risk-metrics-id`}>
        <ReportSectionHeader text={t('risk_metrics')} />
        <div className="flex w-full flex-wrap justify-center xl:justify-between mb-4">
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
      <HashContainer name={'Highlights'} id={`highlights-id`}>
        <ReportSectionHeader text={t('highlights')} />

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-center pb-6 ">
          <ReliabilityIndex
            reliability={data.highlights.data_reliability.reliability}
          />
          <DataReliability comment={data.highlights.data_reliability.comment} />
        </div>
        <div className="flex">
          <RiskOutlook
            hintTitle="hint title"
            hintBody="hint body"
            reports={data.highlights.risk_outlook}
          />
        </div>
        <div className="flex flex-col lg:flex-row py-6 justify-between">
          <FinancialAccounts financialYears={transformedFinancials} />
          <div className="w-full lg:ml-8">
            <p className="font-bold py-2">{t('add_more_data')}</p>
            <CTACard
              title={t('import_data')}
              body={t('unlock_api_to_gain_access')}
              buttonText="Import"
              unlocked={false}
              buttonColor="bg-[#2BAD01]"
              // linkTo='/'
            />
            <CTACard
              title={t('upload_more_data')}
              body={t('upload_data_for_more_recent_report')}
              buttonText="Upload"
              unlocked={true}
              buttonColor="bg-alt"
              // linkTo="/"
            />
          </div>
        </div>
      </HashContainer>

      <HashContainer name={'Financial Trends'} id={`financial-trends-id`}>
        <ReportSectionHeader text={t('financial_trends')} />
        <FinancialTrends data={[]} />
      </HashContainer>

      <HashContainer
        name={'Corporate Governance'}
        id={`corporate-governance-id`}
      >
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
        id={`legal-events-id`}
        fullHeight={false}
      >
        <ReportSectionHeader text={t('legal_events')} />
        <LegalEvents legalEvents={data?.legal_events?.legal_events} />
      </HashContainer>

      <HashContainer
        name={'Macro Economic Trends'}
        id={`macro-economic-trends-id`}
      >
        <ReportSectionHeader text={t('macro_economic_trends')} />
        <MacroEconomicTrends trends={[]} />
      </HashContainer>

      <HashContainer name={'ESG'} id={`esg-id`} fullHeight={false}>
        <ReportSectionHeader text={t('esg')} />
        <p className="text-xl">{t('esg_assessment')}</p>
        <ESGCard
          title={t('environmental')}
          description={t('using_environmental_indicators')}
          result={t('neutral')}
          resultText={t('environmental_impact')}
          rating="1"
        />
        <ESGCard
          title={t('governance')}
          description={t('data_on_company_governance')}
          result="positive"
          resultText={t('pep_flags')}
          rating="3"
        />
      </HashContainer>

      <HashContainer name={'News'} id={`news-id`}>
        <ReportSectionHeader text={t('news')} />
        <NewsFeed />
      </HashContainer>
    </div>
  );
};

const ReportTemplate = () => {
  const t = useTranslations();
  const router = useRouter();
  const { id = [] } = router.query;

  const { data, error } = useSWR<ReportDataProps>(
    `/api/report?id=${id}`,
    fetcher
  );

  const handleExportPdf = async () => {
    /**
     * TODO: add class "exclude-in-pdf" to elements which should not be rendered
     * and iterate over the dom here and remove those elements before gen'ing the pdf
     */
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.querySelector<HTMLElement>('#full-report');
    var opt = {
      margin: [10, 5, 10, 5],
      filename: 'report_using_html2pdf.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      // html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css'] }
    };

    const worker = html2pdf().set(opt).from(element).save();
    console.log('worker:', worker);
    // TODO: output progress
  };

  return (
    <Layout
      title={`${data?.company_name || 'Loading'} | ${t('report')}`}
      fullWidth
    >
      <SecondaryLayout
        navigation={
          data?.company_name && (
            <>
              <ReportNav
                companyName={data?.company_name}
                loading={!data}
                onExportPdfClicked={handleExportPdf}
              />

              <TabletReportNav
                companyName={data?.company_name}
                loading={!data}
              />
            </>
          )
        }
      >
        {!data ? (
          <SkeletonReport />
        ) : error || data.error ? (
          <ErrorSkeleton header={`${t(REPORT_FETCHING_ERROR)}`} />
        ) : (
          <Report data={data} t={t} id={id} />
        )}
      </SecondaryLayout>
    </Layout>
  );
};

export default ReportTemplate;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          ...require(`../../../messages/${locale}/report.${locale}.json`),
          ...require(`../../../messages/${locale}/hints.${locale}.json`),
          ...require(`../../../messages/${locale}/general.${locale}.json`),
          ...require(`../../../messages/${locale}/errors.${locale}.json`)
        }
      }
    };
  }
);
