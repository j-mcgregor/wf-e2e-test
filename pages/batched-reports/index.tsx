/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'use-intl';
import {
  DocumentDuplicateIcon,
  DocumentReportIcon
} from '@heroicons/react/outline';
import LinkCard from '../../components/cards/LinkCard';
import Layout from '../../components/layout/Layout';
import BatchReportCard from '../../components/cards/BatchReportCard';

const BatchReports = () => {
  const t = useTranslations();
  return (
    <Layout title="Batched Reports">
      <div className="text-primary">
        <h1 className="text-3xl font-semibold">{t('batch_reports')}</h1>
        <p className="font-sm my-4">{t('view_and_create_batch_report_jobs')}</p>

        {/* create a new report */}
        <div className="my-6">
          <p className="text-xl font-semibold mb-4">
            {t('create_a_new_batch_report')}
          </p>
          <LinkCard
            header={t('create_a_batch_report')}
            description={t('upload_company_numbers_and_country_codes')}
            linkTo="/batched-reports/new"
            // changed text to white to match link card on report page
            icon={<DocumentDuplicateIcon className="h-6 w-6 text-white" />}
            iconColor="bg-highlight-3"
          />
        </div>

        {/* completed batch reports */}
        {/* NEED TO USE MOCK DATA */}
        <div className="my-6">
          <p className="text-xl font-semibold mb-4">
            {t('completed_batch_reports')}
          </p>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
            <BatchReportCard
              header="Batch - 18.10.21"
              linkTo="#"
              quantity="244"
              quantityText={t('total_companies_analysed')}
              icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
              iconColor="bg-highlight"
            />
            <BatchReportCard
              header="Batch - 18.10.21"
              linkTo="#"
              quantity="244"
              quantityText={t('total_companies_analysed')}
              icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
              iconColor="bg-highlight"
            />
            <BatchReportCard
              header="Batch - 18.10.21"
              linkTo="#"
              quantity="244"
              quantityText={t('total_companies_analysed')}
              icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
              iconColor="bg-highlight"
            />
          </div>
        </div>

        {/* in progress batch reports */}
        {/* NEED TO USE MOCK DATA */}
        <div className="my-6">
          <p className="text-xl font-semibold mb-4">
            {t('in_progress_batch_reports')}
          </p>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
            <BatchReportCard
              header="Batch - 18.10.21"
              linkTo="#"
              quantity="244"
              quantityText={t('total_companies_analysed')}
              icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
              iconColor="bg-highlight"
              disabled
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BatchReports;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/batched-reports.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
