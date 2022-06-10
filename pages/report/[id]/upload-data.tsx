/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, CloudDownloadIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { mutate } from 'swr';

import LinkCard from '../../../components/cards/LinkCard';
import Button from '../../../components/elements/Button';
import Layout from '../../../components/layout/Layout';
import SkeletonLayout from '../../../components/skeletons/SkeletonLayout';
import UploadNewData from '../../../components/uploads/UploadNewData';
import { useManualReportUploadFile } from '../../../hooks/useCSV';
import { useCsvValidators } from '../../../hooks/useCsvValidators';
import { manualUploadValidators } from '../../../lib/settings/report-validators';
import { NO_REPORT_ID } from '../../../lib/utils/error-codes';
import fetcher from '../../../lib/utils/fetcher';
import { downloadFile } from '../../../lib/utils/file-helpers';
import { makeUploadReportReqBody } from '../../../lib/utils/report-helpers';
import { SubmitReportType } from '../../../types/report';
import { ReportsUploadApi } from '../../api/reports/upload';

const UploadData = () => {
  const t = useTranslations();

  const downloadIconColor = 'bg-highlight bg-opacity-50';

  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  // const { csvData, csvValues, isCSV, isExcel } = useCSV(fileSelected);
  const { data, values, isCSV, isExcel } =
    useManualReportUploadFile(fileSelected);

  const { isValid, errors, missingHeaders, numberOfCompanies } =
    useCsvValidators({
      csvData: data,
      validators: manualUploadValidators,
      csvValues: values
    });

  const router = useRouter();

  const { id = [] } = router.query;

  const handleExportCsv = async () => {
    if (!id) return null;

    try {
      const response = await fetcher(
        `/api/reports/report?id=${id}&export=csv`,
        'GET',
        null,
        {}
      );

      downloadFile({
        data: response.csv,
        // eg report-id.csv
        fileName: `report-${id}.csv`,
        fileType: 'text/csv'
      });
    } catch (error) {
      // TODO remove console.log
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleSubmit: SubmitReportType = async (setError, setLoading) => {
    if (!data) return;
    setLoading(true);
    const params = makeUploadReportReqBody(data, values, `${id}`);
    try {
      const result: ReportsUploadApi = await fetcher(
        '/api/reports/upload',
        'POST',
        params
      );

      if (result?.error) {
        Sentry.captureException({
          error: result.error,
          message: result.message
        });
        setError({ error: 'REPORT_500', message: result.message });
      }

      if (!result?.reportId) {
        Sentry.captureException({
          error: NO_REPORT_ID,
          message: result.message
        });
        setError({ error: 'NO_REPORT_ID', message: result.message });
      }

      if (result?.reportId) {
        // update user to get report data
        mutate('/api/user');
        return router.push(`/report/${result.reportId}`);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  // handle language error messages during fallback
  if (router.isFallback) {
    return <SkeletonLayout />;
  }

  return (
    <Layout noNav={false}>
      <div className="text-primary">
        <Button
          linkTo={`/report/${id}`} // fix to send back to report
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {t('back_to_report')}
        </Button>
        <p className="font-semibold text-4xl py-3">
          {t('upload_additional_data')}
        </p>
        <p className="text-sm py-4">{t('add_additional_data_to_report')}</p>
        <p className="text-2xl font-semibold py-2">
          {t('choose_data_to_modify')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-between py-4 space-x-3">
          <LinkCard
            icon={<CloudDownloadIcon className="h-6 w-6" />}
            iconColor={downloadIconColor}
            header={t('report_csv')}
            description={t('make_changes_to_any_report')}
            onClick={() => handleExportCsv()}
            className="text-left"
          />
          {/* <LinkCard
            icon={<CloudDownloadIcon className="h-6 w-6" />}
            linkTo="#"
            iconColor={downloadIconColor}
            header={t('financials_only')}
            description={t('add_a_new_year_of_financials')}
          /> */}
        </div>
        <UploadNewData
          header={t('upload_the_new_data')}
          description={t('drag_and_drop_your_altered_csv_below')}
          buttonText={t('generate_new_report')}
          setFileSelected={handleSetSelectedFile}
          fileSelected={fileSelected}
          onSubmit={handleSubmit}
          isCSV={isCSV}
          isExcel={isExcel}
          isValid={isValid}
          errors={errors}
          missingHeaders={missingHeaders}
          numberOfCompanies={numberOfCompanies}
          uploadType="REPORT_MANUAL"
        />
      </div>
    </Layout>
  );
};

export default UploadData;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../../messages/${locale}/upload-data.${locale}.json`),
        ...require(`../../../messages/${locale}/hints.${locale}.json`),
        ...require(`../../../messages/${locale}/general.${locale}.json`),
        ...require(`../../../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}
