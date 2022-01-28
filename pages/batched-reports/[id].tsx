/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, DownloadIcon } from '@heroicons/react/outline';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import LinkCard from '../../components/cards/LinkCard';
import BatchReportTable from '../../components/elements/BatchReportTable';
import Button from '../../components/elements/Button';
import Layout from '../../components/layout/Layout';
import ErrorSkeleton from '../../components/skeletons/ErrorSkeleton';
import SkeletonReport from '../../components/skeletons/SkeletonReport';
import { REPORT_FETCHING_ERROR } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { BatchedReportType } from '../../types/global';

const BatchReport = () => {
  const t = useTranslations();
  const router = useRouter();

  const { id = [], demo = false } = router.query;

  const { data, error } = useSWR<BatchedReportType & { error: boolean }>(
    `/api/batched-reports?id=${id}${demo ? '&demo=true' : ''}`,
    fetcher
  );

  return (
    <Layout title="Batched Report">
      {!data ? (
        <SkeletonReport />
      ) : error || data.error ? (
        <ErrorSkeleton header={`${t(REPORT_FETCHING_ERROR)}`} />
      ) : (
        <div className="text-primary">
          <Button
            linkTo="/batched-reports"
            variant="none"
            newClassName="text-sm flex items-center hover:text-alt"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t('back_to_all_batch_reports')}
          </Button>
          <h1 className="text-3xl font-semibold my-4">{t('batch_reports')}</h1>
          <p className="text-sm my-4">
            {t(
              'download_the_results_of_the_batch_reports_in_csv_or_excel_format'
            )}
          </p>
          <p className="text-2xl font-semibold my-8">{t('download_reports')}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCard
              icon={<DownloadIcon className="w-8 h-8" />}
              iconColor="bg-highlight bg-opacity-50"
              header={`${data.name}.csv`}
              description={t('all_results_in_a_single_csv')}
              linkTo="#"
            />
            <LinkCard
              icon={<DownloadIcon className="w-8 h-8" />}
              iconColor="bg-highlight-3 bg-opacity-50"
              header={`${data.name}.xlsx`}
              description={t('open_excel_immediately')}
              linkTo="#"
            />
          </div>
          <div className="p-8 bg-white my-8">
            <p className="text-xl font-semibold pb-8">
              {t('batch_report_results')}
            </p>
            <BatchReportTable data={data} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BatchReport;

export const getServerSideProps = ({ locale }: GetServerSidePropsContext) => {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/batched-reports.${locale}.json`),
        ...require(`../../messages/${locale}/hints.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
};
