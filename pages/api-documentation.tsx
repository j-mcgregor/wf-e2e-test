/* eslint-disable security/detect-non-literal-require */
import {
  CloudDownloadIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

// Settings
import {
  apiCards,
  documentCards
} from '../lib/settings/api-documentation.settings';

// Components
import LinkCard from '../components/cards/LinkCard';
import Layout from '../components/layout/Layout';
import { useToast } from '../hooks/useToast';

const APIDocumentation = () => {
  const t = useTranslations();
  const { handleDownload } = useToast();

  /**
   * Switched from <LinkCard href={href} download /> to this function
   * purely so toasts can be implemented. Easy to put back if unwanted
   */

  return (
    <Layout title="API Documentation">
      <div className="flex flex-col h-screen">
        <div>
          <h1 className="text-2xl font-semibold">{t('title')}</h1>
          <p className="text-gray-500 text-sm my-6 md:w-8/12">
            {t('card_description')}
          </p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg sm:max-w-none md:mx-auto md:mr-auto -p-1">
            {apiCards.map(({ header, description, href }) => (
              <LinkCard
                key={header}
                className="md:mx-auto"
                icon={
                  <DocumentDuplicateIcon className='className="h-6 w-6 text-white' />
                }
                iconColor="bg-highlight-4"
                header={t(header)}
                description={t(description)}
                linkTo={href}
              />
            ))}
          </div>
        </div>
        <div className="md:mt-16">
          <h1 className="text-2xl font-semibold">{t('documents_title')}</h1>
          <p className="text-gray-500 text-sm my-6 md:w-8/12">
            {t('documents_description')}
          </p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none md:mx-auto md:mr-auto ">
            {documentCards.map(({ header, description, href }) => (
              <LinkCard
                key={header}
                className="md:mx-auto text-left"
                icon={
                  <CloudDownloadIcon className='className="h-6 w-6 text-black' />
                }
                iconColor="bg-highlight opacity-75"
                header={t(header)}
                description={t(description)}
                onClick={() =>
                  handleDownload({
                    href,
                    toastId: `API_COLLECTION_${t(header)}`,
                    title: t(`DOCUMENTATION.ENV_COLLECTION_DOWNLOAD_200.title`),
                    description: t(
                      `DOCUMENTATION.ENV_COLLECTION_DOWNLOAD_200.description`,
                      {
                        type: t(header)
                      }
                    )
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default APIDocumentation;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/api-documentation.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`),
        ...require(`../messages/${locale}/errors-default.${locale}.json`),
        ...require(`../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
}
