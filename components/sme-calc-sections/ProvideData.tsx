import { useState } from 'react';
import { useTranslations } from 'use-intl';
import UploadNewData from '../uploads/UploadNewData';
import LinkCard from '../cards/LinkCard';
import { CloudDownloadIcon } from '@heroicons/react/outline';
import { templateText } from '../../lib/settings/sme-calc.settings';
import { FileContentType } from '../../types/report';
import { validCSVValues } from '../../lib/settings/sme-calc.settings';

const ProvideData = () => {
  const [fileContent, setFileContent] = useState<FileContentType>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleSetSelectedFile = (file: File | null) => {
    setFileSelected(file);
  };

  const handleSetFileContent = (file: FileContentType) => {
    setFileContent(file);
  };

  const t = useTranslations();

  return (
    <>
      <div className="bg-white rounded-sm shadow-sm my-8">
        <UploadNewData
          header={t('provide_your_own_data')}
          description={t('use_one_of_our_templates_to_add_data')}
          buttonText={t('generate_new_report')}
          fileContent={fileContent}
          setFileContent={handleSetFileContent}
          setFileSelected={handleSetSelectedFile}
          fileSelected={fileSelected}
          validations={validCSVValues}
          onSubmit={() => null}
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
