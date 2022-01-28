import { CloudDownloadIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import router from 'next/router';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import useCSVValidator from '../../hooks/useCSVValidator';
import {
  manualUploadValidators,
  templateText
} from '../../lib/settings/sme-calc.settings';
import { NO_REPORT_ID } from '../../lib/utils/error-codes';
import fetcher from '../../lib/utils/fetcher';
import { makeUploadReportReqBody } from '../../lib/utils/report-helpers';
import { SubmitReportType } from '../../types/report';
import LinkCard from '../cards/LinkCard';
import UploadNewData from '../uploads/UploadNewData';

const ProvideData = () => {
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const { isCSV, isValid, errors, missingHeaders, csvData, csvValues } =
    useCSVValidator(fileSelected, manualUploadValidators);

  const t = useTranslations();

  const handleSubmit: SubmitReportType = async (setError, setLoading) => {
    setLoading(true);
    const params = makeUploadReportReqBody(csvData, csvValues);

    try {
      const res = await fetcher('/api/reports/upload', 'POST', params);

      if (res?.error) {
        Sentry.captureException({
          error: res.error,
          message: res.message
        });
        setError({ error: res.error, message: res.message });
      }

      if (!res?.reportId) {
        Sentry.captureException({
          error: NO_REPORT_ID,
          message: res.message
        });
        setError({ error: res.error, message: res.message });
      }

      if (res?.reportId) {
        return router.push(`/report/${res.reportId}`);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  return (
    <>
      <div className="bg-white rounded-sm shadow-sm my-8">
        {/* NOTE: component and validation works for batch reports but the error messaging isn't clear on the row that's missing data. Work needed eventually on this */}
        <UploadNewData
          header={t('provide_your_own_data')}
          description={t('use_one_of_our_templates_to_add_data')}
          buttonText={t('generate_new_report')}
          setFileSelected={handleSetSelectedFile}
          fileSelected={fileSelected}
          onSubmit={handleSubmit}
          isCSV={isCSV}
          isValid={isValid}
          errors={errors}
          missingHeaders={missingHeaders}
          disableButton={!isValid}
        />
      </div>
      <div>
        <p className="text-xl font-semibold">{t('templates')}</p>
        <div className="grid grid-cols-4 gap-3 my-6">
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
