/* eslint-disable security/detect-non-literal-require */
import {
  ChipIcon,
  DocumentDuplicateIcon,
  HandIcon
} from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import ReactTimeago from 'react-timeago';
import { useRecoilValue } from 'recoil';

import LinkCard from '../components/cards/LinkCard';
import Stats from '../components/elements/Stats';
import TwitterFeed from '../components/elements/TwitterFeed';
import Layout from '../components/layout/Layout';
import WFLogo from '../components/svgs/WFLogo';
import Table, { TableHeadersType } from '../components/table/Table';
import useLocalStorage from '../hooks/useLocalStorage';
import appState from '../lib/appState';
import { createReportTitle } from '../lib/utils/text-helpers';

export default function Dashboard() {
  const t = useTranslations();
  const [userLoginTime] = useLocalStorage<number[]>('wf_last_login', []);

  const { user } = useRecoilValue(appState);

  const reports: { created_at: string }[] = user?.reports?.slice();
  const sortedReports =
    reports &&
    reports
      .sort((a, b) => {
        const bDate = new Date(b.created_at).getTime();
        const aDate = new Date(a.created_at).getTime();
        return bDate - aDate;
      })
      .slice(0, 5);

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const ReportTableHeaders: TableHeadersType[] = [
    {
      name: t('company_name'),
      selector: getReportName,
      align: 'left',
      width: 'w-[70%]',
      contentClassName: 'truncate max-w-[400px]',
      rowTitle: getReportName
    },
    {
      name: t('sme_z-score'),
      selector: 'sme_z_score',
      align: 'center',
      width: 'w-[10%]'
    },
    {
      name: t('bre'),
      selector: 'bond_rating_equivalent',
      align: 'center',
      width: 'w-[10%]'
    },
    {
      name: t('created'),
      selector: (row: { created_at: string }) => (
        <ReactTimeago date={row.created_at} />
      ),
      align: 'center',
      width: 'w-[10%] pr-4'
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-7 gap-x-4 text-primary">
        <div className="col-span-7 md:col-span-5">
          <div>
            <p className="text-base h-6 md:-mt-6">{t('welcome_back')}</p>

            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">
                {user && user.full_name}{' '}
                {user?.organisation_name && `(${user.organisation_name})`}
              </h1>
            </div>
          </div>

          <Stats
            className="mt-4 mb-4"
            stats={[
              {
                header: t('total_reports'),
                data: user?.total_reports || '0',
                linkTo: '/reports'
              },
              {
                header: t('bookmarked_reports'),
                data: user?.bookmarked_reports?.length || '0',
                linkTo: '/reports'
              },
              {
                header: t('last_login'),
                data: userLoginTime[0] || undefined,
                timeAgo: true
              }
            ]}
          />
          <Table
            tableName={t('no_data_recent_reports')}
            headers={ReportTableHeaders}
            data={sortedReports}
            total={user?.reports?.length}
            limit={5}
            isLoading={false}
            rowLink={(row: { id: string }) => `/report/${row.id}?from=/`}
            fillEmptyRows
          />
        </div>

        <div className="md:col-span-2 md:block hidden">
          <TwitterFeed className="mt-12 h-[398px]" />
        </div>
      </div>

      {/* link cards */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-auto md:mr-auto ">
        <LinkCard
          className="mx-auto"
          icon={<WFLogo className="w-6 h-6 text-white" />}
          iconColor="bg-highlight"
          header={t('automated_report_header')}
          description={t('automated_report_description')}
          linkTo="/sme-calculator"
        />
        <LinkCard
          className="mx-auto"
          icon={
            <DocumentDuplicateIcon className='className="h-6 w-6 text-white' />
          }
          iconColor="bg-highlight-3"
          header={t('batch_reports_header')}
          description={t('batch_reports_description')}
          linkTo="/batch-reports"
        />
        <LinkCard
          className="mx-auto"
          icon={<ChipIcon className='className="h-6 w-6 text-white ' />}
          iconColor="bg-highlight-4"
          header={t('api_docs_header')}
          description={t('api_docs_description')}
          linkTo="/api-documentation"
        />
        {/* Temporary card until SME Prospector is implemented and online */}
        <LinkCard
          className="mx-auto"
          icon={<HandIcon className='className="h-6 w-6 text-white ' />}
          iconColor="bg-highlight-2"
          header={t('support_header')}
          description={t('support_description')}
          linkTo="/support"
        />
      </div>

      <div className="md:hidden max-w-lg mx-auto mt-8">
        <h3 className="font-semibold">{t('updates')}</h3>
        <TwitterFeed className="mt-6 h-[600px]" />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/index.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`),
        ...require(`../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
}
