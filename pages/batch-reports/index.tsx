/* eslint-disable security/detect-non-literal-require */
import {
  DocumentDuplicateIcon,
  DocumentReportIcon,
  RefreshIcon
} from '@heroicons/react/outline';
import { GetStaticPropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { useTranslations } from 'use-intl';

import BatchReportCard from '../../components/cards/BatchReportCard';
import EmptyCard from '../../components/cards/EmptyCard';
import LinkCard from '../../components/cards/LinkCard';
import Layout from '../../components/layout/Layout';
import { appUser } from '../../lib/appState';
import fetcher from '../../lib/utils/fetcher';
import { BatchReportsIndexApi } from '../api/batch-reports';

import type { BatchReportResponse } from '../../types/batch-reports';

const BatchReports: NextPage = () => {
  const t = useTranslations();
  const [pendingJobs, setPendingJobs] = useState<BatchReportResponse[]>([]);
  const [completedJobs, setCompletedJobs] = useState<BatchReportResponse[]>([]);

  const user = useRecoilValue(appUser);

  const { data: allJobs } = useSWR<BatchReportsIndexApi>(
    `/api/batch-reports`,
    fetcher,
    pendingJobs?.length > 0 ? { refreshInterval: 1000 } : {}
  );

  // run on allJobs
  useEffect(() => {
    if (allJobs?.batchReports) {
      const complete = allJobs.batchReports?.filter(
        job => job.total_reports !== job.failed_reports
      );
      const pending = allJobs.batchReports?.filter(
        job => job.total_reports == job.failed_reports
      );

      setCompletedJobs(complete);
      setPendingJobs(pending);
    }
  }, [allJobs]);

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
            linkTo="/batch-reports/new"
            // changed text to white to match link card on report page
            icon={<DocumentDuplicateIcon className="h-6 w-6 text-white" />}
            iconColor="bg-highlight-3"
          />
        </div>

        <div className="my-6">
          <p className="text-xl font-semibold mb-4">
            {t('in_progress_batch_reports')}
          </p>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
            {user &&
              pendingJobs?.map(report => {
                return (
                  <BatchReportCard
                    key={report.id}
                    header={report.name}
                    quantity={report.total_reports || 0}
                    quantityText={`${t('processing')}...`}
                    icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
                    iconColor="bg-highlight"
                    disabled
                  />
                );
              })}
            {user && !allJobs?.batchReports && (
              <>
                <EmptyCard loading />
                <EmptyCard loading />
              </>
            )}
            {user && allJobs?.batchReports && pendingJobs?.length === 0 && (
              <EmptyCard
                text={t('no_batch_reports_in_progress')}
                icon={<RefreshIcon className="h-10 w-10" />}
              />
            )}
          </div>
        </div>

        {/* completed batch reports */}
        <div className="my-6">
          <p className="text-xl font-semibold mb-4">
            {t('completed_batch_reports')}
          </p>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
            {user &&
              completedJobs?.map((report, index) => {
                return (
                  <BatchReportCard
                    key={report.id + index}
                    header={`${report.name}`}
                    linkTo={`/batch-reports/${report.id}`}
                    quantity={report.total_reports || 0}
                    quantityText={t('total_companies_analysed')}
                    icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
                    iconColor="bg-highlight"
                  />
                );
              })}

            {user && !allJobs?.batchReports && (
              <>
                <EmptyCard loading />
                <EmptyCard loading />
                <EmptyCard loading />
                <EmptyCard loading />
              </>
            )}
            {user && allJobs?.batchReports && completedJobs?.length === 0 && (
              <EmptyCard
                text={t('no_completed_batch_reports')}
                icon={<DocumentDuplicateIcon className="h-10 w-10" />}
              />
            )}
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
        ...require(`../../messages/${locale}/batch-reports.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
