import { useTranslations } from 'use-intl';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import Button from '../elements/Button';
import UploadFile from './UploadFile';
import { TranslateInput } from '../../types/global';
import { CSVValueValidation, FileContentType } from '../../types/report';

interface UploadNewDataProps {
  header: TranslateInput;
  description: TranslateInput;
  buttonText: TranslateInput;
  disableButton?: boolean;
  onSubmit: () => void;
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
  // removes selected file from state
  const handleRemoveFile = () => {
    return setFileSelected(null);
  };

  const t = useTranslations();

  const tick = <CheckIcon className="h-6 w-6 text-green-500 mr-1" />;
  const cross = <XIcon className="h-6 w-6 text-red-500 mr-1" />;

  return (
    <div className="bg-white rounded-sm shadow-sm p-8">
      <div className="grid grid-cols-2">
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

        <div className="text-xs flex flex-col  items-center pt-16">
          {fileSelected && (
            <div className="sm:w-3/4 px-6 ">
              <p className="font-bold mb-2 text-lg">{t('valid_csv_check')}</p>

              <div className="overflow-y-auto h-48">
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
                    missingHeaders.map((error, i) => {
                      return (
                        <div className="flex py-1" key={i}>
                          {cross}
                          <p>
                            {"'"}
                            {error}
                            {"'"}
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
                    errors?.map((error, i) => {
                      return (
                        <div className="flex py-1" key={i}>
                          {cross}
                          <p>{error}</p>
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
      <div className="w-3/12 mt-2">
        <Button
          variant="highlight"
          disabled={!isValid || disableButton}
          className="text-primary rounded-none"
          onClick={onSubmit}
        >
          {buttonText}
        </Button>
      </div>
      {children}
    </div>
  );
};

export default UploadNewData;
