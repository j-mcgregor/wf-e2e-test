/* eslint-disable security/detect-non-literal-require */
import { BookmarkIcon } from '@heroicons/react/outline';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import BookmarkCard from '../components/cards/BookmarkCard';
import Button from '../components/elements/Button';
import ReportTable from '../components/elements/ReportTable';
import Layout from '../components/layout/Layout';
import LoadingIcon from '../components/svgs/LoadingIcon';
import useReportHistory from '../hooks/useReportHistory';
import appState from '../lib/appState';
import { ReportSnippetType } from '../types/global';

const Reports = () => {
  const { user } = useRecoilValue(appState);

  const [reportLimit, setReportLimit] = useState(0); // initial limit of 10 reports

  const { reports, loading } = useReportHistory(10, reportLimit);

  const bookmarkedReports = user?.bookmarked_reports;

  const t = useTranslations();

  const reportLength = reports?.length || 0;

  // load 5 more reports until max of 30
  const handleAddReports = (): void => {
    reportLimit + 10 <= reportLength ? setReportLimit(reportLimit + 10) : null;
  };

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

          <ReportTable
            headerSize="text-[10px] md:text-sm lg:text-base"
            reports={
              (loading && reports?.length === 0) ||
              reports?.length === user?.reports?.length
                ? user?.reports
                : reports
            }
            limit={reportLimit + 10}
            shadow={true}
            loading={loading}
            borders={true}
            fillerRows={false}
            linkRoute="/report"
          />

          {/* Handle loading cases and if there are enough reports to show more */}
          {(reportLimit + 10 <= reportLength || loading) && (
            <Button
              disabled={loading}
              variant="none"
              className="border-alt border max-w-[120px] my-2 mx-auto"
              onClick={handleAddReports}
            >
              {!loading ? <p>{t('show_more')}</p> : <LoadingIcon />}
            </Button>
          )}
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
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
