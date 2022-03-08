/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Layout from '../../../components/layout/Layout';
import ReportNav from '../../../components/layout/ReportNav';
import SecondaryLayout from '../../../components/layout/SecondaryLayout';
import TabletReportNav from '../../../components/layout/TabletReportNav';
import Report from '../../../components/report-sections/Report';
import ErrorSkeleton from '../../../components/skeletons/ErrorSkeleton';
import SkeletonReport from '../../../components/skeletons/SkeletonReport';
import fetcher from '../../../lib/utils/fetcher';
import { ReportDataProps } from '../../../types/report';

const ReportTemplate = ({ isTesting = false }: { isTesting?: boolean }) => {
  const t = useTranslations();

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR<ReportDataProps>(
    id && `/api/reports/report?id=${id}`,
    fetcher
  );

  const backLink = Array.isArray(router?.query?.from)
    ? router.query.from[0]
    : router?.query?.from;

  const companyName = data?.id
    ? data?.details?.company_name || data?.details?.name || 'Unnamed Company'
    : '';

  return (
    <Layout
      title={`${
        companyName || (data?.error ? t(data.error) : false) || t('loading')
      } ${t('report')}`}
      fullWidth
    >
      <SecondaryLayout
        navigation={
          companyName && (
            <>
              <ReportNav
                isTesting={isTesting}
                companyName={companyName}
                loading={!data}
                backLink={backLink}
              />
              <TabletReportNav
                isTesting={isTesting}
                companyName={companyName}
                loading={!data}
                backLink={backLink}
              />
            </>
          )
        }
      >
        {!data ? (
          <SkeletonReport />
        ) : error || data?.error ? (
          <ErrorSkeleton
            header={data?.error ? t(data?.error) : ''}
            message={data?.message}
          />
        ) : (
          data && <Report data={data} id={id || []} />
        )}
      </SecondaryLayout>
    </Layout>
  );
};

export default ReportTemplate;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}
