import React from 'react';
import Iframe from '../../components/elements/Iframe';
import Layout from '../../components/layout/Layout';
import { GetStaticPropsContext } from 'next';
import Button from '../../components/elements/Button';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import config from '../../config';

const SwaggerView = () => {
  const t = useTranslations();

  return (
    <Layout title="API Documentation" fullWidth>
      <div className="h-10 flex items-center px-5">
        <Button
          linkTo="/api-documentation"
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back_to_api_docs')}
        </Button>
      </div>
      <Iframe
        src={`${config.API_URL?.replace(/\/api\/v1/, '')}/docs`}
        title="API Documentation"
      />
    </Layout>
  );
};

export default SwaggerView;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/api-documentation.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`),
        ...require(`../../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}
