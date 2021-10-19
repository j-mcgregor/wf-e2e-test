import { useTranslations } from 'use-intl';
import UploadNewData from '../uploads/UploadNewData';

const ProvideData = () => {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-sm shadow-sm my-8">
      <div className="px-8 pt-8">
        <p className="text-2xl font-semibold pb-3">
          {t('provide_your_own_data')}
        </p>
        <p>{t('use_one_of_our_templates_to_add_data')}</p>
      </div>

      <UploadNewData hasHeader={false} />
    </div>
  );
};

export default ProvideData;
