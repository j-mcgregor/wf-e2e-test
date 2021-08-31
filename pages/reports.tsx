import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import appState from '../lib/appState';
import Layout from '../components/layout/Layout';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';
import RecentReports from '../components/elements/RecentReports';
import BookmarkCard from '../components/cards/BookmarkCard';
import ReportTable from '../components/elements/ReportTable';
import Button from '../components/elements/Button';
import { Report } from '../types/global';

const Reports = () => {
  const [bookmarkQty, setBookmarkQty] = useState(5);
  const [reportLimit, setReportLimit] = useState(10); // initial limit of 10 reports

  const { user } = useRecoilValue(appState);

  const reports = (user && user.reports) || [];

  const t = useTranslations();

  // load 5 more reports until max of 30
  const handleAddReports = (): void => {
    reportLimit < 30 ? setReportLimit(reportLimit + 5) : null;
  };

  return (
    <Layout noNav={false} title="Reports">
      <div className="text-primary">
        <div>
          <h1 className="text-3xl font-semibold py-2">{t('reports')}</h1>
          <p className="text-base py-4">{t('see all your recent reports')}</p>
          <h2 className="text-2xl font-semibold py-6">
            {t('bookmarked reports')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 leading-4">
          {reports.map((report: Report, index: number) => {
            if (index < bookmarkQty) {
              return (
                <BookmarkCard
                  key={report.id}
                  linkTo={`/report/${report.id}`}
                  company_name={report.company_Name}
                  sme_zscore={report.sme_zscore}
                  bond_rating={report.bond_rating}
                  pd_ratio={32.18} // not currently in mock data
                />
              );
            }
          })}
        </div>

        <div className="flex flex-col">
          <p className="text-2xl py-6 font-semibold">{t('recent reports')}</p>

          <ReportTable
            headerSize="text-[10px] md:text-sm lg:text-base"
            reports={reports}
            limit={reportLimit}
            shadow={true}
            borders={true}
            fillerRows={false}
          />

          {reportLimit < 30 && (
            <Button
              variant="none"
              className="border-alt border max-w-[120px] my-2 mx-auto"
              onClick={handleAddReports}
            >
              <p>{t('load more')}</p>
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          // eslint-disable-next-line security/detect-non-literal-require
          ...require(`../messages/${locale}/reports.${locale}.json`)
        }
      }
    };
  }
);
