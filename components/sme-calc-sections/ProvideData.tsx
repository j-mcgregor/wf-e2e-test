/* eslint-disable security/detect-object-injection */
import { CloudDownloadIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import router from 'next/router';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import { useCSV } from '../../hooks/useCSV';
import { useCsvValidators } from '../../hooks/useCsvValidators';
import { manualUploadValidators } from '../../lib/settings/report-validators';
import { templateText } from '../../lib/settings/sme-calc.settings';
import { NO_REPORT_ID, REPORT_500 } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { makeUploadReportReqBody } from '../../lib/utils/report-helpers';
import LinkCard from '../cards/LinkCard';
import UploadNewData from '../uploads/UploadNewData';

import type { SubmitReportType } from '../../types/report';
const ProvideData = () => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const { csvData, csvValues, isCSV, totalCompanies } = useCSV(fileSelected);

  const { isValid, errors, missingHeaders, numberOfCompanies } =
    useCsvValidators(
      csvData,
      manualUploadValidators,
      csvValues,
      totalCompanies,
      'REPORT_MANUAL'
    );

  const t = useTranslations();

  const handleSubmit: SubmitReportType = async (setError, setLoading) => {
    setLoading(true);
    const params = makeUploadReportReqBody(csvData, csvValues);

    try {
      const result = await fetcher('/api/reports/upload', 'POST', params);

      if (result?.error) {
        Sentry.captureException({
          error: result.error,
          message: result.message
        });
        setError({ error: REPORT_500, message: result.message });
      }

      if (!result?.data.id) {
        Sentry.captureException({
          error: NO_REPORT_ID,
          message: result.message
        });
        setError({ error: NO_REPORT_ID, message: result.message });
      }

      if (result?.data?.id) {
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
                linkTo={template.templateLink}
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
