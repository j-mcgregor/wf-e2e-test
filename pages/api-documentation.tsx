/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import React from 'react';

import Layout from '../components/layout/Layout';
import Iframe from '../components/elements/Iframe';

const iframeProps = {
  src: 'https://api.wiserfunding.com/redoc',
  title: 'API Documentation'
};

const APIDocumentation = () => {
  return (
    <Layout title="API Documentation" fullWidth>
      <Iframe {...iframeProps} />
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
        ...require(`../messages/${locale}/batch-reports.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
