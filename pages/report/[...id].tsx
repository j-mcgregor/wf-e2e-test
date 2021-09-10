/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';

import HashContainer from '../../components/elements/HashContainer';
import Layout from '../../components/layout/Layout';
import ReportNav from '../../components/layout/ReportNav';
import SecondaryLayout from '../../components/layout/SecondaryLayout';
import ReportHeader from '../../components/report-sections/ReportHeader';
import Benchmarks from '../../components/report-sections/risk-metrics/Benchmarks';
import BondRating from '../../components/report-sections/risk-metrics/BondRating';
import SummaryDetails from '../../components/report-sections/summary/SummaryDetails';
import SummaryFinancial from '../../components/report-sections/summary/SummaryFinancial';
import SummaryMap from '../../components/report-sections/summary/SummaryMap';
import SkeletonReport from '../../components/skeletons/SkeletonReport';
import { useReportNavItems } from '../../hooks/useNavigation';
import getServerSidePropsWithAuth from '../../lib/auth/getServerSidePropsWithAuth';
import { ReportSectionHeader } from '../../components/elements/Headers';

interface DataProps {
  created_at?: string;
  company_name: string;
  contact_details: { incorporation_date: string };
  financials: {
    [x: string]: {
      employees: any;
    };
  };
}

const ReportTemplate = () => {
  const headings: string[] = useReportNavItems();
  const t = useTranslations();
  const router = useRouter();

  const { id } = router.query;

  const fetcher = (url: any) => fetch(url).then(res => res.json());

  const { data, error } = useSWR<DataProps>(`/api/report?id=${id}`, fetcher);
  // console.log(data);

  if (error) return <div>failed to load</div>;

  const date = new Date(Number(data?.['created_at']));

  const created = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  const transformedFinancials =
    data &&
    Object.keys(data.financials)
      .map(year => {
        return { year, ...data.financials[year] };
      })
      .reverse();

  const lastFiveYearsFinancials = data && transformedFinancials.slice(0, 5);

  // temporary before data exists
  const mockDescription =
    'Culpa minim do anim consequat labore amet officia ea mollit veniam velit. Lorem exercitation aute aliqua labore nisi ad enim do sunt do duis culpa. Consectetur excepteur est occaecat anim anim adipisicing magna ut enim adipisicing esse dolore.';

  return (
    <Layout title="SME - Calculator " fullWidth>
      <SecondaryLayout
        navigation={
          data?.company_name && (
            <ReportNav companyName={data?.company_name} loading={!data} />
          )
        }
      >
        {!data ? (
          <SkeletonReport />
        ) : (
          <div className="text-primary">
            <div className="py-8">
              <h1 className="text-xl pb-4">{t('risk assessment report')}</h1>
              <ReportHeader company={data?.company_name} created={created} />
            </div>

            <HashContainer name={'Summary'} id={`summary-id`}>
              <ReportSectionHeader text={t('summary')} />

              <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm">
                <div className="flex w-full md:w-1/2 flex-col py-2">
                  <SummaryDetails
                    regNumber={'SC172288'}
                    sector={'Travel, Personal & Leisure'}
                    description={mockDescription}
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
              <ReportSectionHeader text={t('risk metrics')} />
              <Benchmarks />
              <BondRating
                score="B"
                description="Cupidatat sit duis minim voluptate labore ea. Esse mollit eu qui anim exercitation. Quis tempor velit et duis commodo."
              />
            </HashContainer>

            <HashContainer name={'Highlights'} id={`highlights-id`}>
              <ReportSectionHeader text={t('highlights')} />
            </HashContainer>

            <HashContainer name={'Financial Trends'} id={`financial-trends-id`}>
              <ReportSectionHeader text={t('financial trends')} />
            </HashContainer>

            <HashContainer
              name={'Corporate Governance'}
              id={`corporate-governance-id`}
            >
              <ReportSectionHeader text={t('corporate governance')} />
            </HashContainer>

            <HashContainer name={'Legal Events'} id={`legal-events-id`}>
              <ReportSectionHeader text={t('legal events')} />
            </HashContainer>

            <HashContainer
              name={'Macro Economic Trends'}
              id={`macro-economic-trends-id`}
            >
              <ReportSectionHeader text={t('macro economic trends')} />
            </HashContainer>
            <HashContainer name={'ESG'} id={`esg-id`}>
              <ReportSectionHeader text={t('esg')} />
            </HashContainer>

            <HashContainer name={'News'} id={`news-id`}>
              <ReportSectionHeader text={t('news')} />
            </HashContainer>
          </div>
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
          ...require(`../../messages/${locale}/report.${locale}.json`),
          ...require(`../../messages/${locale}/general.${locale}.json`)
        }
      }
    };
  }
);
