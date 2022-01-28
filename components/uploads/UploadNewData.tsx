/* eslint-disable no-console */
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import { ApiError, ErrorCodeKeys, TranslateInput } from '../../types/global';
import { SubmitReportType } from '../../types/report';
import Button from '../elements/Button';
import ErrorMessage from '../elements/ErrorMessage';
import { ApplicationError } from '../errors/ApplicationError';
import UploadFile from './UploadFile';

interface UploadNewDataProps {
  header: TranslateInput;
  description: TranslateInput;
  buttonText: TranslateInput;
  disableButton?: boolean;
  onSubmit: SubmitReportType;
  nameFileInput?: React.ReactNode;
  isCSV?: boolean;
  isValid?: boolean;
  missingHeaders?: (string | null)[];
  errors?: (string | boolean | null)[];
  fileSelected: File | null;
  setFileSelected: (selectedFile: File | null) => void;
  children?: React.ReactNode;
}

const UploadNewData = ({
  isCSV,
  isValid,
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
  children
}: UploadNewDataProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>({
    error: '' as ErrorCodeKeys,
    message: ''
  });

  // removes selected file from state
  const handleRemoveFile = () => {
    return setFileSelected(null);
  };

  const t = useTranslations();

  const tick = <CheckIcon className="h-6 w-6 text-green-500 mr-1" />;
  const cross = <XIcon className="h-6 w-6 text-red-500 mr-1" />;

  const ErrorBox = () => {
    console.error(error.message);
    let message: string | React.ReactNode = '';
    switch (typeof error.message) {
      case 'string':
        // TODO: check for JSON when other branch merged
        message = error.message;
        break;
      case 'object':
        if (Array.isArray(error.message)) {
          const api422response = error.message.map(e => ({
            msg: `${e.msg}.`,
            location: `Location in request: ${e.loc.join(' > ')}`
          }));
          message = (
            <>
              {api422response.map(a => (
                <>
                  <p>{a.msg}</p>
                  <p>{a.location}</p>
                </>
              ))}
            </>
          );
        } else {
          message = JSON.stringify(error.message);
        }
    }
    return (
      <ApplicationError
        width="max-w-full mt-2"
        error={{
          name: error.error,
          message
        }}
        showConsoleMessage
      />
    );
  };

  return (
    <div className="bg-white rounded-sm shadow-sm sm:p-8 p-6">
      <div className="grid sm:grid-cols-2">
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
          />
        </div>

        <div className="text-xs flex flex-col  sm:items-center sm:pt-16 pt-4">
          {fileSelected && (
            <div className="sm:w-3/4 sm:px-6 ">
              <p className="font-bold mb-2 text-lg">{t('valid_csv_check')}</p>

              <div className="overflow-y-auto max-h-48">
                <div className="flex py-1">
                  {isCSV ? (
                    <>
                      {tick}
                      <p>{t('file_is_valid_csv')}</p>
                    </>
                  ) : (
                    <>
                      {cross}
                      <p>{t('file_is_invalid_format')}</p>
                    </>
                  )}
                </div>
                <div>
                  {missingHeaders.length === 0 ? (
                    <div className="flex py-1">
                      {tick}
                      <p>{t('all_headers_are_valid')}</p>
                    </div>
                  ) : (
                    missingHeaders.map((e, i) => {
                      return (
                        <div className="flex py-1" key={i}>
                          {cross}
                          <p>
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
                        <div className="flex py-1" key={i}>
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
      <div className="w-full sm:max-w-[200px] mt-2">
        <Button
          variant="highlight"
          disabled={!isValid || disableButton || loading}
          loading={loading}
          className="text-primary rounded-none"
          onClick={() => onSubmit(setError, setLoading)}
        >
          {buttonText}
        </Button>
      </div>
      {error?.error && <ErrorBox />}
      {children}
    </div>
  );
};

export default UploadNewData;
