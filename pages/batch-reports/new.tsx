/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, CloudDownloadIcon } from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { createRef, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { useTranslations } from 'use-intl';
import * as Sentry from '@sentry/nextjs';

import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
import ErrorMessage from '../../components/elements/ErrorMessage';
import Input from '../../components/elements/Input';
import Layout from '../../components/layout/Layout';
import UploadNewData from '../../components/uploads/UploadNewData';
import { useCSV } from '../../hooks/useCSV';
import { useCsvValidators } from '../../hooks/useCsvValidators';
import { convertCSVToRequestBody } from '../../lib/utils/batch-report-helpers';
import { BATCH_REPORT_FETCHING_ERROR } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';

import type { SubmitReportType } from '../../types/report';

const CreateBatchReport = () => {
  const t = useTranslations();
  const router = useRouter();

  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [fileSelectedName, setFileSelectedName] = useState<string>('');

  const {
    csvData,
    csvValues,
    fileName,
    isCSV,
    isAutoOrManual,
    totalRows,
    totalCompanies
  } = useCSV(fileSelected);

  const { isValid, errors, missingHeaders } = useCsvValidators(
    csvData,
    isAutoOrManual.validator,
    csvValues
  );

  useEffect(() => {
    if (fileName) {
      setFileSelectedName(fileName);
    }
  }, [fileName]);

  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportNameError, setReportNameError] = useState<boolean>();
  const [results, setResults] = useState<{ id?: string }>({});
  const [error, setError] = useState('');

  const filenameRef = createRef<HTMLInputElement>();

  const runReports: SubmitReportType = async (setError, setLoading) => {
    // if input name missing, show error
    if (!reportName || reportName.length === 0) {
      setReportNameError(true);
      return false;
    }

    setLoading(true);
    setProcessing(true);

    // req body is different for /jobs/batch and /jobs/batch/upload
    // if /jobs/batch           BatchAutoRequest
    // if /jobs/batch/upload    BatchManualRequest
    const reqData = convertCSVToRequestBody(
      csvData,
      csvValues,
      reportName,
      isAutoOrManual.type
    );

    try {
      const res = await fetcher(isAutoOrManual.apiUrl, 'POST', reqData);
      if (res.ok) {
        setResults(res.data);
      }
      if (res.batchReportId) {
        // fetch the new batchreports
        mutate('/api/batch-reports');
        // push to batch-reports where in progress reports will show
        return router.push(`/batch-reports`);
      }
      if (!res.ok) {
        setError({
          error: BATCH_REPORT_FETCHING_ERROR,
          message: 'Could not make post request to batch endpoint.'
        });
        Sentry.captureException({ error: res.error });
        setComplete(false);
        setLoading(false);
        setProcessing(false);
      }
    } catch (err) {
      setError({
        error: BATCH_REPORT_FETCHING_ERROR,
        message: 'Could not make post request to batch endpoint.'
      });
      Sentry.captureException(err);
      setComplete(false);
      setLoading(false);
      setProcessing(false);
    }
  };

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const cleanup = () => {
    setComplete(false);
    setFileSelected(null);
    setReportName('');
    setFileSelectedName('');
    setReportNameError(false);

    // <Input /> is a forwardRef so setState doesn't affect it
    if (filenameRef.current?.value) {
      filenameRef.current.value = '';
    }
  };

  useEffect(() => cleanup(), []);

  // removes selected file from state
  const handleRemoveFile = () => cleanup();

  return (
    <Layout title="Batched Reports">
      <div className="text-primary pb-32">
        <Button
          linkTo="/batch-reports"
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
          handleRemoveFile={handleRemoveFile}
          setFileSelected={handleSetSelectedFile}
          fileSelected={fileSelected}
          description={t('upload_your_csv_here_to_begin')}
          header={t('run_multiple_reports')}
          buttonText={!processing ? t('run_batch') : t('running')}
          onSubmit={runReports}
          isCSV={isCSV}
          isValid={isValid}
          uploadType={isAutoOrManual.type}
          errors={errors}
          missingHeaders={missingHeaders}
          disableButton={complete || processing}
          nameFileInput={
            <>
              <Input
                name="filename"
                type="text"
                placeholder={fileSelectedName || t('name_batched_report')}
                onChange={e => setReportName(e.target.value)}
                ref={filenameRef}
                disabled={complete || processing}
                isError={reportNameError}
                {...(reportNameError && {
                  onFocusClassName: 'ring-red-400 border-red-400'
                })}
              />
              {reportNameError && (
                <small className="text-red-400">
                  {t('report_name_required')}
                </small>
              )}
            </>
          }
        >
          <div className="w-3/12 my-4">
            {results?.id && !error && (
              <Button
                className={`${
                  !complete
                    ? 'border-2 border-gray-200 opacity-30'
                    : 'border-none'
                } rounded-none`}
                variant={!complete ? 'none' : 'highlight'}
                disabled={!complete}
                linkTo={`/batch-reports/${results?.id}?demo=true`}
              >
                <p>{t('view_results')}</p>
              </Button>
            )}
          </div>
          {error === BATCH_REPORT_FETCHING_ERROR && (
            <ErrorMessage text={t(BATCH_REPORT_FETCHING_ERROR)} />
          )}
        </UploadNewData>

        <p className="text-2xl font-semibold my-8">{t('csv_templates')}</p>
        {/* ================= TODO ================= */}

        <div className="grid grid-cols-4 gap-x-4 my-6">
          <LinkCard
            className="max-w-xs"
            icon={<CloudDownloadIcon className="h-8 w-8" />}
            iconColor="bg-highlight bg-opacity-50"
            header={t('batch_ads_template')}
            description={t('batch_ads_template_desc')}
            linkTo="/download-templates/wf-ads-template.csv"
          />
          <LinkCard
            className="max-w-xs"
            icon={<CloudDownloadIcon className="h-8 w-8" />}
            iconColor="bg-highlight bg-opacity-50"
            header={t('batch_mdi_template')}
            description={t('batch_mdi_template_desc')}
            linkTo="/download-templates/wf-mdi-template.csv"
          />
          <LinkCard
            className="max-w-xs"
            icon={<CloudDownloadIcon className="h-8 w-8" />}
            iconColor="bg-highlight bg-opacity-50"
            header={t('batch_mdi_example_template')}
            description={t('batch_mdi_example_template_desc')}
            linkTo="/download-templates/wf-mdi-example-template.csv"
          />
          <LinkCard
            className="max-w-xs"
            icon={<CloudDownloadIcon className="h-8 w-8" />}
            iconColor="bg-highlight bg-opacity-50"
            disabled={true}
            header={t('batch_mdi_excel_template')}
            description={t('batch_mdi_excel_template_desc')}
            linkTo="/download-templates/wf-csv-example-template.csv"
          />
        </div>
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
        ...require(`../../messages/${locale}/batch-reports.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/upload-data.${locale}.json`)
      }
    }
  };
}

// disable input when submitting - done
// disable file upload when submitting - done
// progress bar runs after successful request - done
// page redirects to ID after

// auto-batch (30s max per company) and manual-batch (10s per company) have different averageTime to complete - done
// if time to complete is > 5 mins, kick back to index - done
// else wait for response, then trigger progress bar and take to ID page - done
// handle api errors
