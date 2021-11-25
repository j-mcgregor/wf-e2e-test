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
import { userReports } from '../lib/appState';
import { ReportSnippetType } from '../types/global';

const Reports = () => {
  const [reportLimit, setReportLimit] = useState(10); // initial limit of 10 reports

  const { bookmarkedReports, allReports } = useRecoilValue(userReports);

  const t = useTranslations();

  // load 5 more reports until max of 30
  const handleAddReports = (): void => {
    reportLimit < 30 ? setReportLimit(reportLimit + 5) : null;
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
                  bondRating={report.bond_rating}
                  createdAt={report.created_at}
                  pdRatio={32.18} // not currently in mock data
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

        <div className="flex flex-col">
          <p className="text-2xl pt-6 pb-2 sm:py-6 font-semibold">
            {t('recent_reports')}
          </p>

          <ReportTable
            headerSize="text-[10px] md:text-sm lg:text-base"
            reports={allReports}
            limit={reportLimit}
            shadow={true}
            borders={true}
            fillerRows={false}
            linkRoute="/report"
          />

          {reportLimit < 30 && allReports.length > 0 && (
            <Button
              variant="none"
              className="border-alt border max-w-[120px] my-2 mx-auto"
              onClick={handleAddReports}
            >
              <p>{t('load_more')}</p>
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
