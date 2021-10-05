import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import Button from '../elements/Button';
import UploadFile from './UploadFile';
import { XIcon, CheckIcon } from '@heroicons/react/outline';

type FileType = Blob | File | null;
type FileContentType = string | ArrayBuffer | null | undefined;

type FileValidationType = {
  hasCorrectFields: boolean;
  valuesAreValid: boolean | undefined;
  isUploaded?: boolean;
};

const UploadNewData = () => {
  // const [selectedFile, setSelectedFile] = useState<FileType>(null);

  const [fileContent, setFileContent] = useState<FileContentType>(null);

  const [isCSV, setIsCSV] = useState(false);

  const [valuesAreValid, setValuesAreValid] = useState<boolean | undefined>(
    false
  );

  const [isUploaded, setIsUploaded] = useState(false);

  const [validation, setValidation] = useState<FileValidationType>({
    hasCorrectFields: false,
    valuesAreValid: false,
    isUploaded: false
  });

  const validHeaders = [
    'company_name',
    'company_id',
    'sme_z_score',
    'p_d_ratio\r'
  ];

  const requiredValues = [
    'sme_z_score',
    'company_name',
    'company_id',
    'p_d_ratio\r'
  ];

  useEffect(() => {
    getValidations(fileContent);
  }, [fileContent]);

  const handleSelectFile = (e: any) => {
    const file = e.target.files[0];
    readFile(file);
  };

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = function (file) {
      setFileContent(file.target?.result);
    };
    reader.readAsText(file);
    file.type === 'text/csv' ? setIsCSV(true) : setIsCSV(false);
  };

  const getValidations = (content: FileContentType) => {
    const str = content?.toString();
    // split each line of CSV into array
    const headers: string[] | undefined = str?.split('\n')[0].split(',');
    const values: string[] | undefined = str?.split('\n')[1].split(',');
    // compare each array to validate if csv headers are a subset of the valid headers array
    const isSubset = validHeaders.every(val => headers?.includes(val));
    // create object & keys from headers and values arrays
    const object =
      values &&
      headers?.reduce((acc, curr, i) => ({ ...acc, [curr]: values[i] }), {});

    const hasValidValues =
      object &&
      requiredValues.filter(key => object[key]).length ===
        requiredValues.length;

    setValidation({
      hasCorrectFields: isSubset && isSubset,
      valuesAreValid: hasValidValues && hasValidValues
      // isUploaded: true
    });
  };

  const validationCheck = (value: boolean | undefined) => {
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
              {validationCheck(validation.isUploaded)}
              <p className="px-2">{t('upload_csv')}</p>
            </div>
            <div className="flex py-1 items-center">
              {validationCheck(validation.hasCorrectFields)}
              <p className="px-2">{t('has_correct_fields')}</p>
            </div>
            <div className="flex py-1">
              {validationCheck(validation.valuesAreValid)}
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
