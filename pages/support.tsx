/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../components/layout/Layout';

const Support = () => {
  const router = useRouter();

  const article = router.query.article as string;

  return (
    <Layout
      title="Support"
      fullWidth
      containerClassName="h-full -mt-2 sm:-mt-14 lg:mt-0"
    >
      <iframe
        loading="lazy"
        className="w-full h-full"
        src={`https://knowledge.wiserfunding.com/${article ?? ''}`}
        title="W3Schools Free Online Web Tutorials"
      ></iframe>
    </Layout>
  );
};

export default Support;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/sme-calculator.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}
