import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import Button from '../elements/Button';
import UploadFile from './UploadFile';
import { XIcon, CheckIcon } from '@heroicons/react/outline';

const UploadNewData = () => {
  const [selectedFile, setSelectedFile] = useState<Blob | null>();
  const [fileContent, setFileContent] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [isCSV, setIsCSV] = useState(false);
  const [hasCorrectFields, setHasCorrectFields] = useState(false);
  const [matchesTemplate, setMatchesTemplate] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {}, [selectedFile]);

  const handleSelectFile = (e: any) => {
    const file = e.target.files[0];
    // runs readFile function and logs out file text temporarily
    readFile(file);
    setSelectedFile(file);
    // repeat below for other validation checks
    file.type === 'text/csv' ? setIsCSV(true) : setIsCSV(false);
  };

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = function (file) {
      setFileContent(file.target?.result);
    };
    reader.readAsText(file);
  };

  // for rendering result of validation checks
  const validationCheck = (value: boolean) => {
    if (value === true) {
      return <CheckIcon className="w-6 h-6 text-green-500" />;
    } else {
      return <XIcon className="w-6 h-6 text-red-500" />;
    }
  };

  const t = useTranslations();

  return (
    <div className="bg-white rounded-sm shadow-sm p-8">
      <div>
        <p className="text-3xl font-semibold py-2">
          {t('upload_the_new_data')}
        </p>
        <p className="text-sm py-2">{t('drag_and_drop_csv_below')}</p>
      </div>
      <div className="flex justify-between w-full py-4">
        <UploadFile
          text={t('or_drag_and_drop_it')}
          linkText={t('upload_your_csv')}
          selectFile={handleSelectFile}
        />

        <div className="text-sm flex flex-col w-full items-center">
          <div>
            <p className="font-bold py-2">{t('valid_csv_check')}</p>
            <div className="flex py-1 items-center">
              {validationCheck(isUploaded)}
              <p className="px-2">{t('upload_csv')}</p>
            </div>
            <div className="flex py-1 items-center">
              {validationCheck(hasCorrectFields)}
              <p className="px-2">{t('has_correct_fields')}</p>
            </div>
            <div className="flex py-1">
              {validationCheck(matchesTemplate)}
              <p className="px-2">{t('matches_template')}</p>
            </div>
            <div className="flex py-1">
              {validationCheck(isCSV)}
              <p className="px-2">{t('is_valid_csv')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/12">
        <Button
          variant="highlight"
          linkTo="#"
          className="text-primary rounded-none"
        >
          {t('generate_new_report')}
        </Button>
      </div>
    </div>
  );
};

export default UploadNewData;
