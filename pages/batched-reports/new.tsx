import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'use-intl';
import { ArrowLeftIcon, CloudDownloadIcon } from '@heroicons/react/outline';
import Layout from '../../components/layout/Layout';
import Button from '../../components/elements/Button';
import LinkCard from '../../components/cards/LinkCard';
/* eslint-disable security/detect-non-literal-require */
import UploadNewData from '../../components/uploads/UploadNewData';
import ProgressBar from '../../components/elements/ProgressBar';

const CreateBatchReport = () => {
  const t = useTranslations();

  return (
    <Layout title="Create Batch Report">
      <div className="text-primary">
        <Button
          linkTo="/batched-reports" // fix to send back to report
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back_to_all_batch_reports')}
        </Button>

        <h1 className="text-3xl font-semibold my-4">{t('batch_reports')}</h1>

        <p className="text-sm my-4">
          {t('utilise_our_powerful_automated_reports_at_scale')}
        </p>

        <UploadNewData
          hasHeader
          headerText={t('run_multiple_reports')}
          buttonText={t('run_batch')}
          progressBar={
            <ProgressBar
              buttonText={t('view_results')}
              averageReportTime={150}
              totalReports={200}
            />
          }
        />

        <p className="text-2xl font-semibold my-8">{t('csv_templates')}</p>
        <LinkCard
          icon={<CloudDownloadIcon className="h-8 w-8" />}
          iconColor="bg-highlight bg-opacity-50"
          header={t('batch_reports_template')}
          description={t(
            'in_order_to_use_our_batch_reporting_feature_you_need_to_upload'
          )}
          linkTo="#"
        />
      </div>
    </Layout>
  );
};

export default CreateBatchReport;

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
