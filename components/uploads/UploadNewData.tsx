/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-console */
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { ReactNode, useState } from 'react';
import { useTranslations } from 'use-intl';
import { ErrorCodeKeys } from '../../types/errors';

import { ApiError, ReportTypeEnum, TranslateInput } from '../../types/global';
import { SubmitReportType } from '../../types/report';
import Button from '../elements/Button';
import ErrorBoundary from '../elements/ErrorBoundary';
import { ErrorBox } from '../errors/ErrorBox';
import UploadFile from './UploadFile';

interface UploadNewDataProps {
  header: TranslateInput;
  description: TranslateInput;
  buttonText: TranslateInput;
  disableButton?: boolean;
  onSubmit: SubmitReportType;
  nameFileInput?: React.ReactNode;
  isCSV?: boolean;
  isExcel?: boolean;
  isValidFileType?: boolean;
  isValid?: boolean;
  uploadType?: ReportTypeEnum;
  missingHeaders?: (string | null)[];
  errors?: (string | boolean | null)[];
  fileSelected: File | null;
  handleRemoveFile?: () => void;
  setFileSelected: (selectedFile: File | null) => void;
  children?: React.ReactNode;
  numberOfCompanies?: number;
  batchAutoOptions?: React.ReactNode;
}

const UploadNewData = ({
  isCSV,
  isExcel,
  isValidFileType,
  isValid,
  uploadType,
  missingHeaders = [],
  errors = [],
  header,
  description,
  buttonText,
  disableButton,
  nameFileInput,
  onSubmit,
  fileSelected,
  setFileSelected,
  handleRemoveFile = () => setFileSelected(null), // I dont like this. Will come back and fix it
  batchAutoOptions,
  children
}: UploadNewDataProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>({
    error: '' as ErrorCodeKeys,
    message: ''
  });
  const t = useTranslations();

  const hasErrors = errors.length > 0;

  const tick = (
    <CheckIcon id="validation-tick" className="h-6 w-6 text-green-500 mr-1" />
  );
  const cross = (
    <XIcon id="validation-cross" className="h-6 w-6 text-red-500 mr-1" />
  );

  let isFormatValid: ReactNode = (
    <>
      {cross}
      <p>{t('file_is_invalid_format')}</p>
    </>
  );

  if (isCSV) {
    isFormatValid = (
      <>
        {tick}
        <p>{t('file_is_valid_csv')}</p>
      </>
    );
  }

  if (isExcel) {
    isFormatValid = (
      <>
        {tick}
        <p>{t('file_is_valid_xls')}</p>
      </>
    );
  }

  return (
    <div className="bg-white rounded-sm shadow-sm sm:p-8 p-6">
      <div className="grid sm:grid-cols-2">
        {/* FILE UPLOAD BOX */}
        <div className="space-y-3">
          <p className="text-3xl font-semibold py-2">{header}</p>
          {/* Allows optional naming of file */}
          {nameFileInput && <div className="">{nameFileInput}</div>}
          <p className="text-base mt-4 ">{description}</p>

          <UploadFile
            text={t('or_drag_and_drop_it')}
            linkText={t('upload_your_csv')}
            setFile={file => setFileSelected(file)}
            removeFile={handleRemoveFile}
            fileName={fileSelected && fileSelected.name}
            disableRemoveButton={loading}
          />
        </div>

        {/* ERROR BOX */}
        <div className="text-xs flex flex-col  sm:items-center sm:pt-16 pt-4">
          {fileSelected && (
            <div className="sm:w-3/4 sm:px-3">
              <p className="font-bold mb-2 text-lg">{t('valid_csv_check')}</p>

              <div className="overflow-y-auto max-h-48">
                <div className="flex py-1 items-center">{isFormatValid}</div>
                <div>
                  {missingHeaders.length === 0 ? (
                    <>
                      {uploadType === 'BATCH_AUTO' && (
                        <div className="flex py-1 items-center">
                          {tick}
                          <p>
                            {t('is_valid_batch_auto', {
                              format: isCSV ? 'CSV' : isExcel ? 'Excel' : ''
                            })}
                          </p>
                        </div>
                      )}
                      {uploadType === 'BATCH_MANUAL' && (
                        <div className="flex py-1 items-center">
                          {tick}
                          <p>
                            {t('is_valid_batch_manual', {
                              format: isCSV ? 'CSV' : isExcel ? 'Excel' : ''
                            })}
                          </p>
                        </div>
                      )}
                      <div className="flex py-1 items-center">
                        {tick}
                        <p>{t('all_headers_are_valid')}</p>
                      </div>
                    </>
                  ) : (
                    missingHeaders.map((e, i) => {
                      return (
                        <div className="flex py-1 items-center" key={i}>
                          {cross}
                          <p className="inline-block align-middle">
                            {`'${e}' `}
                            {t('is_a_required_header')}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div>
                  {errors.length === 0 && missingHeaders.length === 0 ? (
                    <div className="flex py-1">
                      {tick}
                      <p>{t('required_values_are_valid')}</p>
                    </div>
                  ) : (
                    errors?.map((e, i) => {
                      return (
                        <div className="flex py-1 items-center" key={i}>
                          {cross}
                          <p>{e}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {console.log('uploadType', uploadType)}
      {uploadType === 'BATCH_AUTO' && fileSelected ? batchAutoOptions : null}
      <div className="w-full sm:max-w-[200px] mt-2">
        <Button
          variant="highlight"
          disabled={
            !isValid ||
            disableButton ||
            loading ||
            hasErrors ||
            !isValidFileType
          }
          loading={loading}
          className="text-primary rounded-none"
          onClick={() => onSubmit(setError, setLoading)}
        >
          {buttonText}
        </Button>
      </div>
      <ErrorBoundary>
        {error?.error && <ErrorBox error={error} />}
      </ErrorBoundary>
      {children}
    </div>
  );
};

export default UploadNewData;
