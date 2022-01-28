/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, CloudDownloadIcon } from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
import ErrorMessage from '../../components/elements/ErrorMessage';
import Input from '../../components/elements/Input';
import ProgressBar from '../../components/elements/ProgressBar';
import Layout from '../../components/layout/Layout';
import UploadNewData from '../../components/uploads/UploadNewData';
import useCSVValidator from '../../hooks/useCSVValidator';
import {
  batchReport,
  uploadBatchReportValidators
} from '../../lib/settings/batch-reports.settings';
import { BATCH_REPORT_FETCHING_ERROR } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { SubmitReportType } from '../../types/report';

const convertCSVToRequestBody = (
  csv: { [index: string]: unknown[] },
  name: string
) => {
  const mappedCsv = csv?.company_id?.map((id, index) => ({
    company_id: id,
    iso: csv.iso[Number(index)]
  }));

  if (mappedCsv && name) {
    return {
      name: name,
      company_list: mappedCsv
    };
  }
  return {};
};

const CreateBatchReport = () => {
  const t = useTranslations();
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const {
    isCSV,
    isValid,
    errors,
    missingHeaders,
    totalRows,
    csvData,
    fileName
  } = useCSVValidator(fileSelected, uploadBatchReportValidators);

  // state for total completed reports
  const [completedReports, setCompletedReports] = useState(0);
  const [remainingTime, setRemainingTime] = useState(
    totalRows * -batchReport.averageTime
  );
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [reportName, setReportName] = useState('');
  const [results, setResults] = useState<{ id?: string }>({});
  const [error, setError] = useState('');

  const router = useRouter();

  const progressTimer = () => {
    const totalTime = Math.round(totalRows * batchReport.averageTime);
    let completedReports = 0;
    let time = remainingTime;
    let interval = setInterval(() => {
      completedReports += 1;
      time -= batchReport.averageTime;
      setCompletedReports(completedReports);
      setRemainingTime(time);
      if (completedReports >= Math.round(totalTime / batchReport.averageTime)) {
        clearInterval(interval);
        setComplete(true);
        setProcessing(false);
      }
    }, batchReport.averageTime);
  };

  const runReports: SubmitReportType = async (setError, setLoading) => {
    setLoading(true);
    // if no report name input entered, set report name to default
    !reportName && setReportName(fileName);

    setProcessing(true);
    progressTimer();

    const reqData = convertCSVToRequestBody(csvData, fileName);

    try {
      const res = await fetcher('/api/batched-reports', 'POST', reqData);
      if (res.ok) {
        setResults(res.data);
      }

      if (res?.reportId) {
        return router.push(`/report/${res.reportId}`);
      }
    } catch (err) {
      setError({
        error: BATCH_REPORT_FETCHING_ERROR,
        message: 'Could not make post request to batch endpoint.'
      });
    }
  };

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const inputPlaceholder = fileName ? fileName : t('name_batched_report');

  return (
    <Layout title="Batched Reports">
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
          {t('utilise_our_powerful_automated_reports_at_scale')}
        </p>

        <UploadNewData
          setFileSelected={handleSetSelectedFile}
          fileSelected={fileSelected}
          description={t('upload_your_csv_here_to_begin')}
          header={t('run_multiple_reports')}
          buttonText={!processing ? t('run_batch') : t('running')}
          onSubmit={runReports}
          isCSV={isCSV}
          isValid={isValid}
          errors={errors}
          missingHeaders={missingHeaders}
          disableButton={complete || processing}
          nameFileInput={
            <Input
              name="filename"
              type="text"
              placeholder={inputPlaceholder}
              onChange={e => setReportName(e.target.value)}
              disabled={processing || complete ? true : false}
            />
          }
        >
          {isValid && (
            <div className="mt-8">
              <ProgressBar
                remainingTime={remainingTime}
                completedReports={completedReports}
                totalReports={totalRows}
              />
            </div>
          )}

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
                linkTo={`/batched-reports/${results?.id}?demo=true`}
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
