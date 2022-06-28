/* eslint-disable security/detect-non-literal-require */
import { BookmarkIcon } from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ReactTimeago from 'react-timeago';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';

import BookmarkCard from '../components/cards/BookmarkCard';
import Layout from '../components/layout/Layout';
import Table, { TableHeadersType } from '../components/table/Table';
import appState from '../lib/appState';
import fetcher from '../lib/utils/fetcher';
import { createReportTitle } from '../lib/utils/text-helpers';
import { ReportSnippetType } from '../types/global';

const Reports = () => {
  const { user } = useRecoilValue(appState);
  const t = useTranslations();
  const bookmarkedReports = user?.bookmarked_reports;

  // ADD TO HOOK START
  const [skip, setSkip] = useState(0); // initial limit of 10 reports
  const limit = 10;

  const { data, isValidating } = useSWR(
    `/api/user/reports?limit=${limit}&skip=${skip}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const ReportTableHeaders: TableHeadersType[] = [
    {
      name: t('company_name'),
      selector: getReportName,
      align: 'left',
      width: 'w-[60%]',
      contentClassName:
        'truncate max-w-[400px] sm:max-w-lg lg:max-w-lg xl:max-w-2xl',
      rowTitle: getReportName
    },
    {
      name: t('source'),
      selector: 'source',
      align: 'center',
      width: 'w-[10%]'
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
      width: 'w-[10%] pr-6'
    }
  ];
  // ADD TO HOOK END

  return (
    <Layout noNav={false} title="Reports">
      <div className="text-primary">
        <div>
          <h1 className="text-3xl font-semibold">{t('reports')}</h1>
          <p className="text-base py-2 sm:py-4">
            {t('see_all_your_recent_reports')}
          </p>
          <h2 className="text-2xl font-semibold py-3 sm:py-6">
            {t('bookmarked_reports')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 leading-4">
          {bookmarkedReports &&
            bookmarkedReports.map((report: ReportSnippetType) => {
              return (
                <BookmarkCard
                  key={report.id}
                  linkTo={`/report/${report.id}`}
                  companyName={report.company_name}
                  smeZscore={report.sme_z_score}
                  bondRating={report.bond_rating_equivalent}
                  createdAt={report.created_at}
                  pdRatio={report.probability_of_default_1_year}
                  reportId={report.id}
                />
              );
            })}
        </div>
        {!bookmarkedReports ||
          (bookmarkedReports.length === 0 && (
            <div className="bg-gray-200 text-center w-full px-4 py-8 ">
              <div>
                <BookmarkIcon className="w-10 mx-auto mb-2" />
                <h3 className="font-bold">{t('no_reports_bookmarked')}</h3>
                <p>{t('click_the_bookmark')}</p>
              </div>
            </div>
          ))}

        <div className="flex flex-col pb-40">
          <p className="text-2xl pt-6 pb-2 sm:py-6 font-semibold">
            {t('recent_reports')}
          </p>

          <Table
            tableName={t('no_data_recent_reports')}
            headers={ReportTableHeaders}
            data={data?.data.reports || []}
            isLoading={isValidating}
            limit={limit}
            total={user?.total_reports}
            rowLink={row => `/report/${row.id}?from=/reports`}
            setSkip={setSkip}
            pagination
            fillEmptyRows
          />
        </div>
      </div>
    </Layout>
  );
};

export default Reports;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/reports.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}
