/* eslint-disable security/detect-non-literal-require */
import {
  CloudDownloadIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

// Components
import LinkCard from '../../components/cards/LinkCard';
import Layout from '../../components/layout/Layout';

const apiCards = [
  {
    header: 'postman_header',
    description: 'postman_description',
    href: '/api-documentation/postman'
  },
  {
    header: 'redoc_header',
    description: 'redoc_description',
    href: '/api-documentation/redoc'
  },
  {
    header: 'swagger_header',
    description: 'swagger_description',
    href: '/api-documentation/swagger'
  }
];

const documentCards = [
  {
    header: 'environment_document_header',
    description: 'environment_document_description',
    href: '/api-documentation/environment-document'
  },
  {
    header: 'collection_document_header',
    description: 'collection_document_description',
    href: '/api-documentation/collection-document'
  }
];

const APIDocumentation = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Layout title="API Documentation">
      <div className="flex flex-col h-screen">
        <div>
          <h1 className="text-2xl font-semibold">{t('title')}</h1>
          <p className="text-gray-500 text-sm my-6 md:w-8/12">
            {t('card_description')}
          </p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-auto md:mr-auto -p-1">
            {apiCards.map(({ header, description, href }) => (
              <LinkCard
                key={header}
                className="mx-auto"
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
        <div className="mt-24">
          <h1 className="text-2xl font-semibold">{t('documents_title')}</h1>
          <p className="text-gray-500 text-sm my-6 md:w-8/12">
            {t('documents_description')}
          </p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-auto md:mr-auto ">
            {documentCards.map(({ header, description, href }) => (
              <LinkCard
                key={header}
                className="mx-auto"
                icon={
                  <CloudDownloadIcon className='className="h-6 w-6 text-black' />
                }
                iconColor="bg-highlight opacity-75"
                header={t(header)}
                description={t(description)}
                linkTo={`${router.pathname}${href}`}
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
        ...require(`../../messages/${locale}/api-documentation.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
