/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, DownloadIcon } from '@heroicons/react/outline';
import Layout from '../../components/layout/Layout';
import BatchReportTable from '../../components/elements/BatchReportTable';
import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
// temp mock data
import batchReports from '../../lib/mock-data/batchReports';

const BatchReport = () => {
  const t = useTranslations();
  const router = useRouter();

  const { id } = router.query;

  const report = batchReports.find(report => report.id === Number(id));

  return (
    <Layout title="Batched Report">
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
            header="Bath Results.csv"
            description={t('all_results_in_a_single_csv')}
            linkTo="#"
          />
          <LinkCard
            icon={<DownloadIcon className="w-8 h-8" />}
            iconColor="bg-highlight-3 bg-opacity-50"
            header="Bath Results.csv"
            description={t('open_excel_immediately')}
            linkTo="#"
          />
        </div>

        {report && (
          <div className="p-8 bg-white my-8">
            <p className="text-xl font-semibold pb-8">
              {t('batch_report_results')}
            </p>
            <BatchReportTable results={report?.results} />
          </div>
        )}
      </div>
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
