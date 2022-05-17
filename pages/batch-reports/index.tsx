/* eslint-disable security/detect-non-literal-require */
import {
  DocumentDuplicateIcon,
  DocumentReportIcon,
  RefreshIcon
} from '@heroicons/react/outline';
import { GetStaticPropsContext, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslations } from 'use-intl';

import BatchReportCard from '../../components/cards/BatchReportCard';
import EmptyCard from '../../components/cards/EmptyCard';
import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
import { Collapsible } from '../../components/elements/Collapsible';
import Layout from '../../components/layout/Layout';
import LoadingIcon from '../../components/svgs/LoadingIcon';
import useBatchReportsHistory from '../../hooks/useBatchReportsHistory';
import { appUser } from '../../lib/appState';

const BatchReports: NextPage = () => {
  const t = useTranslations();

  const [loading, setLoading] = useState(false);

  // ADD TO HOOK START
  const [reportLimit, setReportLimit] = useState(0); // initial limit of 8 reports
  const { pendingJobs, failedJobs, totalLength, completedJobs, fetching } =
    useBatchReportsHistory(8, reportLimit);

  const reportLength = totalLength;

  // load 5 more reports until max of 30
  const handleAddReports = (): void => {
    setLoading(true);
    reportLimit + 8 <= reportLength ? setReportLimit(reportLimit + 8) : null;
    setLoading(false);
  };

  const user = useRecoilValue(appUser);

  return (
    <Layout title={t('multiple_companies')}>
      <div className="text-primary mb-64">
        <h1 className="text-3xl font-semibold">{t('multiple_companies')}</h1>
        <p className="font-sm my-4 max-w-2xl">
          {t('view_and_create_batch_report_jobs')}
        </p>

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

        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">{t('in_progress_batch_reports')}</span>
        </h3>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3 ">
          {user &&
            pendingJobs?.map(report => {
              return (
                <BatchReportCard
                  key={report.id}
                  header={report.name}
                  quantity={report.total_reports || 0}
                  quantityText={
                    report.has_failed ? 'Failed' : `${t('processing')}...`
                  }
                  icon={<DocumentReportIcon className="w-6 h-6 text-white" />}
                  iconColor={report.has_failed ? 'bg-red-300' : 'bg-highlight'}
                  disabled
                />
              );
            })}
          {user && totalLength === 0 && (
            <>
              <EmptyCard loading />
              <EmptyCard loading />
            </>
          )}
          {user && pendingJobs?.length === 0 && totalLength !== 0 && (
            <EmptyCard
              text={t('no_batch_reports_in_progress')}
              icon={<RefreshIcon className="h-10 w-10" />}
            />
          )}
        </div>

        <Collapsible title={t('completed_batch_reports')} collapsed={false}>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-3 mb-8">
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

            {user && totalLength === 0 && (
              <>
                <EmptyCard loading />
                <EmptyCard loading />
                <EmptyCard loading />
                <EmptyCard loading />
              </>
            )}
            {user && totalLength === 0 && completedJobs?.length !== 0 && (
              <EmptyCard
                text={t('no_completed_batch_reports')}
                icon={<DocumentDuplicateIcon className="h-10 w-10" />}
              />
            )}
          </div>
          {/* Handle loading cases and if there are enough reports to show more */}
          {reportLimit + 8 <= totalLength && (
            <Button
              disabled={loading && fetching}
              variant="none"
              className="border-alt border max-w-[120px] my-2 mx-auto"
              onClick={handleAddReports}
            >
              {!loading || !fetching ? (
                <p>{t('show_more')}</p>
              ) : (
                <LoadingIcon />
              )}
            </Button>
          )}
        </Collapsible>

        {failedJobs.length > 0 ? (
          <Collapsible title={t('failed_batch_reports')} collapsed={true}>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3 ">
              {user &&
                failedJobs?.map(report => {
                  return (
                    <BatchReportCard
                      key={report.id}
                      header={report.name}
                      quantity={report.total_reports || 0}
                      quantityText={`${t('batch_failed')}`}
                      icon={
                        <DocumentReportIcon className="w-6 h-6 text-white" />
                      }
                      iconColor="bg-red-500"
                      disabled
                    />
                  );
                })}
            </div>
          </Collapsible>
        ) : null}
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

// if show more clicked, show loading if currently fetching, else don't show button
