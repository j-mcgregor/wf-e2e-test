/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { useTranslations } from 'use-intl';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import appState from '../../lib/appState';
import HashHeader from '../../components/elements/HashHeader';
import Layout from '../../components/layout/Layout';
import ReportNav from '../../components/layout/ReportNav';
import SecondaryLayout from '../../components/layout/SecondaryLayout';
import { useReportNavItems } from '../../hooks/useNavigation';
import getServerSidePropsWithAuth from '../../lib/auth/getServerSidePropsWithAuth';
import { Report } from '../../types/global';

import Summary from '../../components/report-sections/Summary';

const ReportTemplate = () => {
  const headings: string[] = useReportNavItems();
  const t = useTranslations();
  const router = useRouter();

  const { id } = router.query;

  const { user } = useRecoilValue(appState);

  const report =
    user && user.reports?.find((report: Report) => report.id === Number(id));

  // const date = new Date(Number(report?.created_at));
  const date = new Date(Number(report?.['created_at']));

  const created = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

  return (
    <Layout title="SME - Calculator " fullWidth>
      <SecondaryLayout
        navigation={<ReportNav companyName={'Scottish Seabird Company LTD'} />}
      >
        <div className="py-8">
          <h3 className="text-xl">{t('risk assessment report')}</h3>
          <h1 className="text-3xl font-medium py-4">
            {report?.['company_Name']}
          </h1>
          <p className="text-sm">
            {t('created')}: {created}
          </p>
        </div>

        <Summary
          info={{
            regNumber: 'SC172288',
            sector: 'Travel, Personal & Leisure',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel pharetra faucibus eget nunc. Vulputate at pretium vel amet nunc accumsan elementum ultrices. Neque, enim, vitae aliquet sociis elementum habitant ullamcorper at. Morbi eget turpis erat dignissim.',
            incorporationDate: '12/02/1997',
            lastAccountDate: '31/01/2020'
          }}
          contact={{
            address: 'The Harbour, North Berwick',
            email: 'info@seabird.org',
            website: 'www.seabird.org',
            phone: '+44 1620890202'
          }}
        />
        {/* <p>{date && date.getFullYear()}</p> */}
        {headings.map(header => (
          <div
            data-report-section="true"
            id={`${header.toLowerCase().replace(/ /g, '-')}-id`}
            key={header}
            className="h-screen text-3xl pt-16"
          >
            <HashHeader text={header}  classname={''}/>
          </div>
        ))}
      </SecondaryLayout>
    </Layout>
  );
};

export default ReportTemplate;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          ...require(`../../messages/${locale}/report.${locale}.json`),
          ...require(`../../messages/${locale}/general.${locale}.json`)
        }
      }
    };
  }
);
