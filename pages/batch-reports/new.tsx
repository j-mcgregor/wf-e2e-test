/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, CloudDownloadIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createRef, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { useTranslations } from 'use-intl';

import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
import ErrorMessage from '../../components/elements/ErrorMessage';
import Hint from '../../components/elements/Hint';
import Input from '../../components/elements/Input';
import { OptionRow } from '../../components/elements/OptionRow';
import SelectMenu from '../../components/elements/SelectMenu';
import Layout from '../../components/layout/Layout';
import { SimpleValue } from '../../components/sme-calc-sections/AdvancedSearch';
import UploadNewData from '../../components/uploads/UploadNewData';
import { useManualReportUploadFile } from '../../hooks/useManualReportUploadFile';
import { useFileValidators } from '../../hooks/useFileValidators';
import { accountTypes } from '../../lib/settings/report.settings';
import Settings from '../../lib/settings/settings.settings';
import { convertCSVToRequestBody } from '../../lib/utils/batch-report-helpers';
import { ISO, ISO_CODE } from '../../lib/utils/constants';
import { BATCH_REPORT_FETCHING_ERROR } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { BatchReportsIndexApi } from '../api/batch-reports';
import { BatchReportsManualApi } from '../api/batch-reports/manual';

import type { SubmitReportType } from '../../types/report';

const CreateBatchReport: NextPage = () => {
  const t = useTranslations();

  const router = useRouter();

  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [fileSelectedName, setFileSelectedName] = useState<string>('');

  const {
    data,
    values,
    isCSV,
    isExcel,
    totalCompanies,
    isAutoOrManual,
    fileName
  } = useManualReportUploadFile(fileSelected);

  const { isValid, errors, missingHeaders } = useFileValidators({
    fileData: data,
    validators: isAutoOrManual?.validator,
    fileValues: values,
    totalCompanies,
    type: isAutoOrManual?.type
  });

  useEffect(() => {
    if (fileName) {
      setFileSelectedName(fileName);
    }
  }, [fileName]);

  const allCurrencyOptions = [
    {
      optionName: 'Use company country currency',
      optionValue: ISO_CODE,
      code: ISO
    },
    ...Settings.supportedCurrencies
  ];

  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportNameError, setReportNameError] = useState<boolean>();
  const [results, setResults] = useState<{ id?: string }>({});
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState<SimpleValue>(accountTypes[0]);
  const [currency, setCurrency] = useState<SimpleValue>(allCurrencyOptions[0]);

  const filenameRef = createRef<HTMLInputElement>();

  const runReports: SubmitReportType = async (setError, setLoading) => {
    // if input name missing, show error
    if (!reportName || reportName.length === 0 || !data || !isAutoOrManual) {
      setReportNameError(true);
      return false;
    }

    setLoading(true);
    setProcessing(true);

    // req body is different for /jobs/batch and /jobs/batch/upload
    // if /jobs/batch           BatchAutoRequest
    // if /jobs/batch/upload    BatchManualRequest
    const reqData = convertCSVToRequestBody({
      csvData: data,
      csvValues: values,
      name: reportName,
      uploadType: isAutoOrManual.type,
      accounts_type: Number(accountType.optionValue),
      currency: currency.code
    });

    try {
      // POST '/api/batch-reports' => BatchReportsIndexApi (auto)
      // POST '/api/batch-reports/upload' => BatchReportsManualApi (manual)
      const result: BatchReportsIndexApi | BatchReportsManualApi =
        await fetcher(isAutoOrManual.apiUrl, 'POST', reqData);

      if (result.ok) {
        setResults({ id: result.batchReportId ?? '' });
      }
      if (result.batchReportId) {
        // fetch the new batch reports
        mutate<BatchReportsIndexApi>('/api/batch-reports');
        // push to batch-reports where in progress reports will show
        return router.push(`/batch-reports`);
      }
      if (!result.ok) {
        setError({
          error: BATCH_REPORT_FETCHING_ERROR,
          message: 'Could not make post request to batch endpoint.'
        });
        Sentry.captureException({ error: result.error });
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

        <p className="text-sm my-4 max-w-2xl">
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
          isExcel={isExcel}
          isValid={isValid}
          uploadType={isAutoOrManual?.type}
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
          batchAutoOptions={
            <div className="my-4">
              <OptionRow
                title={t('account_type_title')}
                description={t('account_type_description')}
                hint={
                  <Hint
                    title={t('hints.account_type.title')}
                    rawBody={t.raw('hints.account_type.body')}
                  />
                }
              >
                <SelectMenu
                  values={accountTypes}
                  defaultValue={accountTypes[0]}
                  selectedValue={accountType}
                  setSelectedValue={setAccountType}
                />
              </OptionRow>
              <OptionRow
                title={t('currency_title')}
                description={t('currency_description')}
                hint={
                  <Hint
                    title={t('hints.currency.title')}
                    rawBody={t.raw('hints.currency.body')}
                  />
                }
              >
                <SelectMenu
                  values={allCurrencyOptions}
                  defaultValue={allCurrencyOptions[0]}
                  selectedValue={currency}
                  setSelectedValue={setCurrency}
                />
              </OptionRow>
            </div>
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
                linkTo={`/batch-reports/${results?.id}`}
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

        <div className="grid grid-cols-4 gap-4 my-6">
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
            header={t('batch_mdi_basic_excel_template')}
            description={t('batch_mdi_basic_excel_template_desc')}
            linkTo="/download-templates/wf-mdi-excel-template.xlsx"
          />
          <LinkCard
            className="max-w-xs"
            icon={<CloudDownloadIcon className="h-8 w-8" />}
            iconColor="bg-highlight bg-opacity-50"
            header={t('batch_ads_excel_template')}
            description={t('batch_ads_excel_template_desc')}
            linkTo="/download-templates/wf-excel-ads-template.xlsx"
          />
          <LinkCard
            className="max-w-xs"
            icon={<CloudDownloadIcon className="h-8 w-8" />}
            iconColor="bg-highlight-3 bg-opacity-50"
            header={t('batch_mdi_excel_template')}
            description={t('batch_mdi_excel_template_desc')}
            linkTo="/download-templates/Sunrise_Client_Input_Sheet_v1.01.xlsm"
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
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/upload-data.${locale}.json`),
        ...require(`../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../messages/${locale}/batch-reports.${locale}.json`)
      }
    }
  };
}
