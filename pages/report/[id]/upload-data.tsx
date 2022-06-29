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
import { useManualReportUploadFile } from '../../../hooks/useManualReportUploadFile';
import { useFileValidators } from '../../../hooks/useFileValidators';
import { manualUploadValidators } from '../../../lib/settings/report-validators';
import { NO_REPORT_ID } from '../../../lib/utils/error-codes';
import fetcher from '../../../lib/utils/fetcher';
import { downloadFile } from '../../../lib/utils/file-helpers';
import { makeUploadReportReqBody } from '../../../lib/utils/report-helpers';
import { SubmitReportType } from '../../../types/report';
import { useToast } from '../../../hooks/useToast';

const UploadData = () => {
  const t = useTranslations();

  const downloadIconColor = 'bg-highlight bg-opacity-50';

  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const { triggerToast, getToastTextFromResponse } = useToast();

  const { data, values, isCSV, isExcel } =
    useManualReportUploadFile(fileSelected);

  const { isValid, errors, missingHeaders, numberOfCompanies } =
    useFileValidators({
      fileData: data,
      validators: manualUploadValidators,
      fileValues: values,
      type: 'REPORT_MANUAL'
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
        data: response.data.csv,
        // eg report-id.csv
        fileName: `report-${id}.csv`,
        fileType: 'text/csv'
      });

      triggerToast({
        toastId: response.code,
        status: response.status,
        title: t(`REPORTS.REPORT_DOWNLOAD_${response.status}.title`, {
          fileType: 'CSV'
        }),
        description:
          response.message ||
          t(`REPORTS.REPORT_DOWNLOAD_${response.status}.description`, {
            fileType: 'CSV'
          })
      });
    } catch (error: any) {
      const status = error.status || 500;
      // eslint-disable-next-line no-console
      console.log(error);
      triggerToast({
        toastId: 'DOWNLOAD_REPORT_CSV',
        status,
        title: t(`REPORTS.REPORT_DOWNLOAD_${status}.title`, {
          fileType: 'CSV'
        }),
        description:
          error.message ||
          t(`REPORTS.REPORT_DOWNLOAD_${status}.description`, {
            fileType: 'CSV'
          }),
        toastType: 'error'
      });
    }
  };

  const handleSubmit: SubmitReportType = async (setError, setLoading) => {
    if (!data) return;
    setLoading(true);
    const params = makeUploadReportReqBody(data, values, `${id}`);
    try {
      const result = await fetcher('/api/reports/upload', 'POST', params);

      const toastText = getToastTextFromResponse(result);

      if (result?.error) {
        Sentry.captureException({
          error: result.error,
          message: result.message
        });

        toastText &&
          triggerToast({
            toastId: result.code,
            status: result.status,
            title: toastText.title,
            description: result.message || toastText.description,
            toastType: 'error'
          });

        setError({ error: 'REPORT_500', message: result.message });
      }

      if (!result?.data?.id) {
        Sentry.captureException({
          error: NO_REPORT_ID,
          message: result.message
        });

        triggerToast({
          toastId: result.code,
          status: result.status,
          title: t('REPORTS.NO_REPORT_ID.title'),
          description: result.message || t('REPORTS.NO_REPORT_ID.description'),
          toastType: 'error'
        });

        setError({ error: 'NO_REPORT_ID', message: result.message });
      }

      if (result?.data?.id) {
        // update user to get report data
        mutate('/api/user');

        triggerToast({
          toastId: 'REPORT_CREATED',
          title: t('REPORTS.REPORT_CREATED.title'),
          description: t('REPORTS.REPORT_CREATED.description'),
          toastType: 'success',
          actions: [
            {
              label: 'Go to report',
              action: () => router.push(`/report/${result.data.id}`)
            }
          ]
        });

        return router.push(`/report/${result.data.id}`);
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
          isValidFileType={isCSV || isExcel}
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
        ...require(`../../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../../messages/${locale}/errors-default.${locale}.json`),
        ...require(`../../../messages/${locale}/toasts.${locale}.json`)
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
