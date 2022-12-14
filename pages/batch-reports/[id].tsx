/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, DownloadIcon } from '@heroicons/react/outline';
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
import Layout from '../../components/layout/Layout';
import ErrorSkeleton from '../../components/skeletons/ErrorSkeleton';
import SkeletonReport from '../../components/skeletons/SkeletonReport';
import LoadingIcon from '../../components/svgs/LoadingIcon';
import Table, { TableHeadersType } from '../../components/table/Table';
import useSWRWithToasts from '../../hooks/useSWRWithToasts';
import {
  GetBatchReportCsvFull,
  getBatchReportsCsv
} from '../../lib/funcs/batch-reports';
import { REPORT_FETCHING_ERROR } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { downloadFile } from '../../lib/utils/file-helpers';
import { createReportTitle } from '../../lib/utils/text-helpers';

import type { GetBatchSummary } from '../../types/batch-reports';

const BatchReport = () => {
  const { data: session } = useSession();
  const t = useTranslations();
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  const [batchReport, setBatchReport] = useState<GetBatchSummary>();
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const { id = '' } = router.query;

  const { data: batchReportRequest, error } = useSWRWithToasts<GetBatchSummary>(
    `/api/batch-reports/${id}?skip=${skip}limit=${limit}`,
    fetcher,
    {}
  );

  useEffect(() => {
    if (batchReportRequest?.data) {
      setBatchReport(batchReportRequest.data);
    }
  }, [batchReportRequest]);

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const batchReportTableHeaders: TableHeadersType[] = [
    {
      name: t('company_name'),
      selector: getReportName,
      align: 'left',
      width: 'w-[70%]',
      contentClassName: 'truncate max-w-[240px] lg:max-w-xs xl:max-w-sm',
      rowTitle: getReportName
    },
    {
      name: t('sme_z-score'),
      selector: 'sme_z_score',
      align: 'center',
      width: 'w-[10%]'
    },
    {
      name: t('bre'),
      selector: 'bond_rating_equivalent',
      align: 'center',
      width: 'w-[10%]'
    },
    {
      name: t('pd'),
      selector: ({
        probability_of_default_1_year: pd
      }: {
        probability_of_default_1_year: number;
      }) => {
        if (Number(pd) && pd > 0) {
          return (
            Intl.NumberFormat('en-GB', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(pd * 100) + '%'
          );
        }
      },
      align: 'center',
      width: 'w-[10%]'
    }
  ];

  const handleExportCsv = async () => {
    if (!id || !session?.token) return null;

    try {
      setDownloading(true);
      const response: GetBatchReportCsvFull = await getBatchReportsCsv(
        `${session?.token}`,
        { batchReportId: `${id}` }
      );
      downloadFile({
        data: response.csv,
        // eg report-id.csv
        fileName: `batch-report-${id}.csv`,
        fileType: 'text/csv'
      });
      setDownloading(false);
    } catch (error) {
      // TODO remove console.log
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Layout title="Batched Report">
      {!batchReport ? (
        <SkeletonReport />
      ) : error || batchReportRequest?.isError ? (
        <ErrorSkeleton
          header={`${t(REPORT_FETCHING_ERROR)}`}
          message={error.message}
          code={batchReportRequest?.status}
        />
      ) : (
        <div className="text-primary">
          <Button
            linkTo="/batch-reports"
            variant="none"
            newClassName="text-sm flex items-center hover:text-alt"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t('back_to_all_batch_reports')}
          </Button>
          <h1 className="text-3xl font-semibold my-4">
            {t('multiple_companies')}
          </h1>
          <p className="text-sm my-4">
            {t(
              'download_the_results_of_the_batch_reports_in_csv_or_excel_format'
            )}
          </p>
          <>
            <p className="text-2xl font-semibold my-8">
              {t('download_reports')}
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {batchReport && (
                <LinkCard
                  icon={
                    !downloading ? (
                      <DownloadIcon className="w-8 h-8" />
                    ) : (
                      <LoadingIcon className="w-8 h-8 text-black" />
                    )
                  }
                  iconColor="bg-highlight bg-opacity-50"
                  header={`${batchReport.name}.csv`}
                  description={t('all_results_in_a_single_csv')}
                  onClick={() => handleExportCsv()}
                  className={`text-left ${
                    downloading ? 'pointer-events-none' : ''
                  }`}
                />
              )}
            </div>
          </>
          <div className="mt-8 mb-40">
            <p className="text-xl font-semibold pb-4">
              {t('batch_report_results')}
            </p>
            {/* TODO: hook up to newdata fromAPI when ready */}
            <Table
              tableName={t('batch_report_results')}
              headers={batchReportTableHeaders}
              data={batchReport?.summaries || []}
              total={
                Number(batchReport?.total_reports) -
                  Number(batchReport?.failed_reports) || 0
              }
              limit={limit}
              isLoading={!batchReport}
              setSkip={setSkip}
              rowLink={(row: { id: string }) =>
                `/report/${row.id}?from=/batch-reports/${id}`
              }
              pagination
              fillEmptyRows
            />
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
        ...require(`../../messages/${locale}/batch-reports.${locale}.json`),
        ...require(`../../messages/${locale}/hints.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
};
