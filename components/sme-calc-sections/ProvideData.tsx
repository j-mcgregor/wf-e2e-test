import { useTranslations } from 'use-intl';
import UploadNewData from '../uploads/UploadNewData';
import LinkCard from '../cards/LinkCard';
import { CloudDownloadIcon } from '@heroicons/react/outline';
import { templateText } from '../../lib/settings/sme-calc.settings';

const ProvideData = () => {
  const t = useTranslations();

  return (
    <>
      <div className="bg-white rounded-sm shadow-sm my-8">
        <div className="px-8 pt-8">
          <p className="text-2xl font-semibold pb-3">
            {t('provide_your_own_data')}
          </p>
          <p>{t('use_one_of_our_templates_to_add_data')}</p>
        </div>

        <UploadNewData
          hasHeader={false}
          buttonText={t('generate_new_report')}
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
