/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'use-intl';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Layout from '../../components/layout/Layout';
import Button from '../../components/elements/Button';

const BatchReportResults = () => {
  const t = useTranslations();

  return (
    <Layout title="Batch Report Results">
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
      </div>
    </Layout>
  );
};

export default BatchReportResults;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/batched-reports.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/upload-data.${locale}.json`)
      }
    }
  };
}
