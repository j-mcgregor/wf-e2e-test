import { useTranslations } from 'use-intl';
import UploadNewData from '../uploads/UploadNewData';
import LinkCard from '../cards/LinkCard';
import { CloudDownloadIcon } from '@heroicons/react/outline';

const ProvideData = () => {
  const t = useTranslations();

  const placeholderTemplates = [
    {
      title: 'Full Template',
      body: 'Commodo adipisicing esse occaecat ullamco id anim..'
    },
    {
      title: 'Financials Template',
      body: 'Tempor ipsum cillum adipisicing commodo culpa deserunt laboris. Cillum cupidatat tempor occaecat ea minim reprehenderit fugiat commodo ullamco ad consequat amet.'
    },
    {
      title: 'Excel Template',
      body: 'Culpa tempor est ea cillum. Excepteur ad esse laborum cillum id enim aliqua eu non eiusmod nisi dolor fugiat.'
    },
    {
      title: 'Excel Financials Template',
      body: 'Eiusmod ullamco commodo deserunt ut pariatur consectetur nisi irure nulla. Laboris sit sint dolore quis ipsum do quis officia proident proident eu.'
    }
  ];

  return (
    <>
      <div className="bg-white rounded-sm shadow-sm my-8">
        <div className="px-8 pt-8">
          <p className="text-2xl font-semibold pb-3">
            {t('provide_your_own_data')}
          </p>
          <p>{t('use_one_of_our_templates_to_add_data')}</p>
        </div>

        <UploadNewData hasHeader={false} />
      </div>

      <div>
        <p className="text-xl font-semibold">{t('templates')}</p>
        <div className="grid grid-cols-4 gap-3 my-6">
          {placeholderTemplates.map((template, i) => {
            return (
              <LinkCard
                icon={<CloudDownloadIcon className="h-8 w-8" />}
                iconColor="bg-highlight bg-opacity-50"
                header={template.title}
                description={template.body}
                linkTo="#"
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
