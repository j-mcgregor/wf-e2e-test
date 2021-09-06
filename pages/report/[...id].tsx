/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';

import HashHeader from '../../components/elements/HashContainer';
import Layout from '../../components/layout/Layout';
import ReportNav from '../../components/layout/ReportNav';
import SecondaryLayout from '../../components/layout/SecondaryLayout';
import Summary from '../../components/report-sections/summary/Summary';
import SkeletonReport from '../../components/skeletons/SkeletonReport';
import { useReportNavItems } from '../../hooks/useNavigation';
import getServerSidePropsWithAuth from '../../lib/auth/getServerSidePropsWithAuth';

const ReportTemplate = () => {
  const headings: string[] = useReportNavItems();
  const t = useTranslations();
  const router = useRouter();

  const { id } = router.query;

  const fetcher = (url: any) => fetch(url).then(res => res.json());

  const { data, error } = useSWR(`/api/report?id=${id}`, fetcher);
  // console.log(data);

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
          <>
            <div className="py-8">
              <h3 className="text-xl">{t('risk assessment report')}</h3>
              <h1 className="text-3xl font-medium py-4">
                {data?.company_name}
              </h1>
              <p className="text-sm">
                {t('created')}: {created}
              </p>
            </div>

            <Summary
              info={{
                regNumber: 'SC172288',
                sector: 'Travel, Personal & Leisure',
                description: 'info about a company etc...',
                incorporationDate: data.contact_details.incorporation_date,
                lastAccountDate: '31/01/2020'
              }}
              contact={data.contact_details}
            />

            {headings.map(header => (
              <div
                data-report-section="true"
                id={`${header.toLowerCase().replace(/ /g, '-')}-id`}
                key={header}
                className="h-screen text-3xl pt-16"
              >
                <HashHeader
                  name={header}
                  id={`${header.toLowerCase().replace(/ /g, '-')}-hash-id`}
                >
                  <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
                    {header}
                  </h3>
                </HashHeader>
              </div>
            ))}
          </>
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
