/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';

import HashHeader from '../../components/elements/HashContainer';
import Layout from '../../components/layout/Layout';
import ReportNav from '../../components/layout/ReportNav';
import SecondaryLayout from '../../components/layout/SecondaryLayout';
import ReportHeader from '../../components/report-sections/ReportHeader';

import SkeletonReport from '../../components/skeletons/SkeletonReport';
import { useReportNavItems } from '../../hooks/useNavigation';
import getServerSidePropsWithAuth from '../../lib/auth/getServerSidePropsWithAuth';
import SummaryDetails from '../../components/report-sections/summary/SummaryDetails';
import SummaryMap from '../../components/report-sections/summary/SummaryMap';
import SummaryFinancial from '../../components/report-sections/summary/SummaryFinancial';

const ReportTemplate = () => {
  const headings: string[] = useReportNavItems();
  const t = useTranslations();
  const router = useRouter();

  const { id } = router.query;

  const fetcher = url => fetch(url).then(res => res.json());

  const { data, error } = useSWR(`/api/report?id=${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  const date = new Date(Number(data?.['created_at']));

  const created = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  return (
    <Layout title="SME - Calculator " fullWidth>
      <SecondaryLayout
        navigation={
          <ReportNav companyName={data?.company_name} loading={!data} />
        }
      >
        {!data ? (
          <SkeletonReport />
        ) : (
          <div className="text-primary">
            <div className="py-8">
              <h3 className="text-xl pb-4">{t('risk assessment report')}</h3>
              <ReportHeader company={data?.company_name} created={created} />
            </div>

            <div className="flex flex-col">
              <p className="text-3xl py-8 text-primary">{t('summary')}</p>
              <div className="flex flex-col md:flex-row justify-between text-sm md:text-xs lg:text-sm">
                <div className="flex w-full md:w-1/2 flex-col py-2">
                  <SummaryDetails
                    info={{
                      regNumber: 'SC172288',
                      sector: 'Travel, Personal & Leisure',
                      description: 'Description goes here.......',
                      incorporationDate:
                        data.contact_details.incorporation_date,
                      lastAccountDate: '31/01/2020'
                    }}
                  />
                </div>

                <div className="flex w-full md:w-1/2 flex-col py-2">
                  <SummaryMap contact={data.contact_details} />
                </div>
              </div>

              {Object.keys(data.financials).map(year => (
                <SummaryFinancial employees={year.employees} />
              ))}
            </div>

            {headings.map(header => (
              <div
                data-report-section="true"
                id={`${header.toLowerCase().replace(/ /g, '-')}-id`}
                key={header}
                className="h-screen text-3xl pt-16"
              >
                <HashHeader name={header}>
                  <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
                    {header}
                  </h3>
                </HashHeader>
              </div>
            ))}
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
