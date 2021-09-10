/* eslint-disable security/detect-non-literal-require */
import { GetStaticPropsContext } from 'next';
import React from 'react'

import Layout from '../components/layout/Layout';

const Support = () => {
  return (
    <Layout title="Support">
      <h1 className="text-2xl">Support </h1>
    </Layout>
  )
}

export default Support



export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/sme-calculator.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}