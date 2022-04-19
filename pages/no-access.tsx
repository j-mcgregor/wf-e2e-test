import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';
import Layout from '../components/layout/Layout';

const NoAccess = () => {
  const t = useTranslations();
  return (
    <Layout>
      <div>
        <h1>{t('no_access_title')}</h1>
      </div>
    </Layout>
  );
};

export default NoAccess;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
