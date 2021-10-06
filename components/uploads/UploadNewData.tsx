import { useState, useEffect } from 'react';
import { useTranslations } from 'use-intl';
import Button from '../elements/Button';
import UploadFile from './UploadFile';
import { XIcon, CheckIcon } from '@heroicons/react/outline';

type FileType = {
  type: string | null;
  name: string | null;
};
type FileContentType = string | ArrayBuffer | null | undefined;

type FileValidationType = {
  hasFile?: boolean;
  isCSV: boolean;
  hasRequiredFormat: boolean | undefined;
  hasRequiredData: boolean;
};

const UploadNewData = () => {
  const [selectedFile, setSelectedFile] = useState<FileType>({
    type: null,
    name: null
  });

  const [fileContent, setFileContent] = useState<FileContentType | null>(null);

  const [validation, setValidation] = useState<FileValidationType>({
    hasRequiredData: false,
    hasRequiredFormat: false,
    hasFile: false,
    isCSV: false
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
    getValidations(fileContent, selectedFile);
  }, [fileContent]);

  const handleSelectFile = (e: any) => {
    const file = e && e.target.files[0];
    readFile(file);
  };

  const handleRemoveFile = () => {
    setFileContent(null);
    setValidation({
      hasRequiredData: false,
      hasRequiredFormat: false,
      hasFile: false,
      isCSV: false
    });
    setSelectedFile({
      type: null,
      name: null
    });
  };

  const readFile = (file: File | null) => {
    file && setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = function (file) {
      setFileContent(file.target?.result);
    };
    file && reader.readAsText(file);
  };

  const getValidations = (content: FileContentType, selectedFile: FileType) => {
    const str = content?.toString();
    const headers: string[] | undefined = str?.split('\n')[0].split(',');
    const values: string[] | undefined = str?.split('\n')[1].split(',');
    const isSubset = validHeaders.every(val => headers?.includes(val));

    const contentObject =
      values &&
      headers?.reduce((acc, curr, i) => ({ ...acc, [curr]: values[i] }), {});

    const hasValidValues =
      contentObject &&
      requiredValues.filter(key => contentObject[key]).length ===
        requiredValues.length;

    setValidation({
      hasRequiredData: isSubset,
      hasRequiredFormat: hasValidValues,
      isCSV: selectedFile.type === 'text/csv',
      hasFile: fileContent ? true : false
    });
  };

  const renderValidationCheck = (value: boolean | undefined) => {
    if (value === true) {
      return <CheckIcon className="w-6 h-6 text-green-500" />;
    } else {
      return <XIcon className="w-6 h-6 text-red-500" />;
    }
  };

  // USE TO DISABLE / ENABLE BUTTON
  const validated =
    validation.hasFile &&
    validation.hasRequiredData &&
    validation.hasRequiredFormat &&
    validation.isCSV;

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
          readFile={readFile}
          removeFile={handleRemoveFile}
          fileName={selectedFile.name}
        />

        <div className="text-sm flex flex-col w-full items-center">
          <div>
            <p className="font-bold py-2">{t('valid_csv_check')}</p>
            <div className="flex py-1 items-center">
              {renderValidationCheck(validation.hasFile)}
              <p className="px-2">{t('uploaded_file')}</p>
            </div>
            <div className="flex py-1">
              {renderValidationCheck(validation.isCSV)}
              <p className="px-2">{t('is_valid_csv')}</p>
            </div>
            <div className="flex py-1">
              {renderValidationCheck(validation.hasRequiredFormat)}
              <p className="px-2">{t('has_required_format')}</p>
            </div>
            <div className="flex py-1 items-center">
              {renderValidationCheck(validation.hasRequiredData)}
              <p className="px-2">{t('has_required_data')}</p>
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
