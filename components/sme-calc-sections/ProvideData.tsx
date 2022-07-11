/* eslint-disable security/detect-object-injection */
import { CloudDownloadIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

import { useManualReportUploadFile } from '../../hooks/useManualReportUploadFile';
import { useFileValidators } from '../../hooks/useFileValidators';
import { manualUploadValidators } from '../../lib/settings/report-validators';
import { templateText } from '../../lib/settings/sme-calc.settings';
import { NO_REPORT_ID, REPORT_500 } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { makeUploadReportReqBody } from '../../lib/utils/report-helpers';
import LinkCard from '../cards/LinkCard';
import UploadNewData from '../uploads/UploadNewData';

import type { SubmitReportType } from '../../types/report';
import { useToast } from '../../hooks/useToast';
const ProvideData = () => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const { data, values, isCSV, isExcel, totalCompanies, fileType } =
    useManualReportUploadFile(fileSelected);

  const { isValid, errors, missingHeaders, numberOfCompanies } =
    useFileValidators({
      fileData: data,
      validators: manualUploadValidators,
      fileValues: values,
      totalCompanies,
      type: 'REPORT_MANUAL'
    });
  const t = useTranslations();

  const { triggerToast, getToastTextFromResponse, handleDownload } = useToast();

  useEffect(() => {
    // disable for now; even valid csv triggers this toast since a rapid rerender
    // will briefly show errors.length as 1 and isValid to false
    // need to fix
    if (fileSelected && (errors.length > 0 || !isValid)) {
      // triggerToast({
      //   toastId: 'REPORT_UPLOAD_ERROR',
      //   title: t('REPORTS.REPORT_UPLOAD_ERROR.title', { fileType }),
      //   description: t('REPORTS.REPORT_UPLOAD_ERROR.description', { fileType }),
      //   toastType: 'error'
      // });
    }
  }, [errors, isValid, fileSelected, fileType]);

  const handleSubmit: SubmitReportType = async (setError, setLoading) => {
    if (!data) return;
    setLoading(true);
    const params = makeUploadReportReqBody(data, values);

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

        setError({ error: REPORT_500, message: result.message });
      }

      if (!result?.data.id) {
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

        setError({ error: NO_REPORT_ID, message: result.message });
      }

      if (result?.data?.id) {
        triggerToast({
          toastId: 'REPORT_CREATED',
          title: t('REPORTS.REPORT_CREATED.title'),
          description: t('REPORTS.REPORT_CREATED.description'),
          toastType: 'success',
          actions: [
            {
              label: 'Go to report',
              action: () => router.push(`/report/${result.data?.id}`)
            }
          ]
        });

        return router.push(`/report/${result.data.id}`);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const moreThanOneCompany = numberOfCompanies > 1;

  const allErrors = moreThanOneCompany
    ? [t('multiple_companies_cannot_be_uploaded_here')]
    : errors;

  return (
    <>
      <div className="bg-white rounded-sm shadow-sm my-8">
        {/* NOTE: component and validation works for batch reports but the error messaging isn't clear on the row that's missing data. Work needed eventually on this */}
        <UploadNewData
          header={t('provide_your_own_data')}
          description={t('use_one_of_our_templates_to_add_data')}
          buttonText={t('generate_new_report')}
          uploadType="REPORT_MANUAL"
          setFileSelected={handleSetSelectedFile}
          fileSelected={fileSelected}
          onSubmit={handleSubmit}
          isCSV={isCSV}
          isExcel={isExcel}
          isValidFileType={isCSV || isExcel}
          isValid={isValid}
          errors={allErrors}
          missingHeaders={missingHeaders}
          disableButton={!isValid}
          numberOfCompanies={numberOfCompanies}
        />
      </div>
      <div>
        <p className="text-xl font-semibold">{t('templates')}</p>
        <div className="grid grid-cols-4 gap-3 my-6">
          {/* ================= TODO ================= */}

          {templateText.map((template, i) => {
            return (
              <LinkCard
                icon={<CloudDownloadIcon className="h-8 w-8" />}
                iconColor={template.backgroundColor}
                header={t(`${template.title}.title`)}
                description={t(`${template.title}.body`)}
                onClick={() =>
                  handleDownload({
                    href: template.templateLink,
                    title: t(`TEMPLATE.TEMPLATE_DOWNLOAD_200.title`),
                    description: t(
                      `TEMPLATE.TEMPLATE_DOWNLOAD_200.description`,
                      {
                        type: t(`${template.title}.title`)
                      }
                    )
                  })
                }
                className="text-left"
                key={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProvideData;
