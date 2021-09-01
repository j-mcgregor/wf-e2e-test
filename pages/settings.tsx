import { GetServerSidePropsContext } from 'next';
import React from 'react';

import HashHeader from '../components/elements/HashHeader';
import Layout from '../components/layout/Layout';
import ReportNav from '../components/layout/ReportNav';
import SecondaryLayout from '../components/layout/SecondaryLayout';
import useReportNavItems from '../hooks/useReportNavItems';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';

const Settings = () => {
  const headings : string[] = useReportNavItems();
  return (
    <Layout title="SME - Calculator " fullWidth>
      <SecondaryLayout
        navigation={<ReportNav companyName={'Scottish Seabird Company LTD'} />}
      >
        {headings.map(header => (
          <div
            data-report-section="true"
            id={`${header.toLowerCase().replace(/ /g, '-')}-id`}
            key={header}
            className="h-screen text-3xl pt-16"
          >
            <HashHeader text={header} />
          </div>
        ))}
      </SecondaryLayout>
    </Layout>
  );
};

export default Settings;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          // eslint-disable-next-line security/detect-non-literal-require
          ...require(`../messages/${locale}/report.${locale}.json`)
        }
      }
    };
  }
);
