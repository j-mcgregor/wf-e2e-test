import { useTranslations } from 'use-intl';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import Button from '../elements/Button';
import UploadFile from './UploadFile';
import { TranslateInput } from '../../types/global';
import useCSVValidator from '../../hooks/useCSVValidator';
import { CSVValueValidation, FileContentType } from '../../types/report';

interface UploadNewDataProps {
  validations: CSVValueValidation[];
  header: TranslateInput;
  description: TranslateInput;
  buttonText: TranslateInput;
  progressBar?: React.ReactNode;
  disableButton?: boolean;
  onSubmit: () => void;
  input?: React.ReactNode;
  fileContent: FileContentType | null;
  setFileContent: (fileContent: FileContentType) => void;
  fileSelected: File | null;
  setFileSelected: (selectedFile: File | null) => void;
}

const UploadNewData = ({
  validations,
  progressBar,
  header,
  description,
  buttonText,
  disableButton,
  input,
  onSubmit,
  fileContent,
  fileSelected,
  setFileContent,
  setFileSelected
}: UploadNewDataProps) => {
  // selects file - sets file in state - reads file and sets content in state - passes in both for validations
  const handleSelectFile = (e: any) => {
    const file = e && e.target.files[0];
    readFile(file);
  };

  // reads file and sets content in state
  const readFile = (file: File | null) => {
    setFileSelected(file);
    const reader = new FileReader();
    reader.onload = function (file) {
      setFileContent(file.target?.result);
    };
    file && reader.readAsText(file);
  };

  // csv file validator hook
  const { isCSV, missingHeaders, isValid, errors } = useCSVValidator(
    fileSelected,
    fileContent,
    validations
  );

  // removes selected file from state
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
        <div className="w-1/2">{input}</div>
        <p className="text-lg font-bold mt-4">{description}</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full py-4">
        <UploadFile
          text={t('or_drag_and_drop_it')}
          linkText={t('upload_your_csv')}
          selectFile={handleSelectFile}
          readFile={readFile}
          removeFile={handleRemoveFile}
          fileName={fileSelected && fileSelected.name}
        />

        <div className="text-xs flex flex-col md:w-1/2 w-full items-center">
          {fileSelected && (
            <div className="sm:w-3/4 px-6 md:-mt-10">
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

      <div className="w-3/12">
        <Button
          variant="highlight"
          disabled={!isValid || disableButton}
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
