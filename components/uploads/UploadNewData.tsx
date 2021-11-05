import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

import { validCSVValues } from '../../lib/settings/sme-calc.settings';

import Button from '../elements/Button';
import UploadFile from './UploadFile';
import { TranslateInput } from '../../types/global';

import { useCSVValidator } from '../../lib/utils/csv-validator';

import { FileContentType } from '../../types/report';

interface UploadNewDataProps {
  validHeaders?: string[];
  requiredValues?: string[];
  header: TranslateInput;
  description: TranslateInput;
  buttonText: TranslateInput;
  progressBar?: React.ReactNode;
  disableButton?: boolean;
  onSubmit?: () => void;
}

const UploadNewData = ({
  validHeaders = validCSVValues.valid_report_headers,
  requiredValues = validCSVValues.required_report_values,
  progressBar,
  header,
  description,
  buttonText,
  disableButton,
  onSubmit
}: UploadNewDataProps) => {
  const [fileContent, setFileContent] = useState<FileContentType | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  // handles file selection - sets file in state - reads file and sets content in state - passes in both for validations
  const handleSelectFile = (e: any) => {
    const file = e && e.target.files[0];
    readFile(file);
  };

  // reads file and sets the content in state
  const readFile = (file: File | null) => {
    setFileSelected(file);
    const reader = new FileReader();
    reader.onload = function (file) {
      setFileContent(file.target?.result);
    };
    file && reader.readAsText(file);
  };

  // csv file validator hook
  const { isCSV, headerErrors, requiredErrors, isValid } = useCSVValidator(
    fileSelected,
    fileContent,
    validCSVValues
  );

  // handles removing selected file from state
  const handleRemoveFile = () => {
    setFileSelected(null);
    setFileContent(null);
  };

  const t = useTranslations();

  const tick = <CheckIcon className="h-6 w-6 text-green-500 mr-1" />;
  const cross = <XIcon className="h-6 w-6 text-red-500 mr-1" />;

  return (
    <div className="bg-white rounded-sm shadow-sm p-8">
      <div>
        <p className="text-3xl font-semibold py-2">{header}</p>
        <p className="text-sm py-2">{description}</p>
      </div>
      <div className="flex justify-between w-full py-4">
        <UploadFile
          text={t('or_drag_and_drop_it')}
          linkText={t('upload_your_csv')}
          selectFile={handleSelectFile}
          readFile={readFile}
          removeFile={handleRemoveFile}
          fileName={fileSelected && fileSelected.name}
        />

        <div className="text-sm flex flex-col w-full items-center">
          <p className="font-bold py-2">{t('valid_csv_check')}</p>
          {fileSelected && (
            <div>
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
              <div className="flex py-1">
                {headerErrors?.length === 0 ? (
                  <>
                    {tick}
                    <p>{t('all_headers_are_valid')}</p>
                  </>
                ) : (
                  headerErrors?.map((error, i) => {
                    return (
                      <div className="flex py-1" key={i}>
                        {cross}
                        <p>
                          <strong>{error} </strong>
                          {t('is_a_required_header')}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <div>
                {isValid ? (
                  <div className="flex py-1">
                    {tick}
                    <p>{t('required_values_are_valid')}</p>
                  </div>
                ) : (
                  requiredErrors?.map((error, i) => {
                    return (
                      <div className="flex py-1" key={i}>
                        {cross}
                        <p>
                          <strong>{error} </strong>
                          {t('header_must_contain_a_value')}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-3/12">
        <Button
          variant="highlight"
          disabled={!isValid}
          className="text-primary rounded-none"
          onClick={onSubmit}
        >
          {buttonText}
        </Button>
      </div>
      {isValid && progressBar && <div className="mt-8">{progressBar}</div>}
    </div>
  );
};

export default UploadNewData;
