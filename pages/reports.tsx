import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';
import appState from '../lib/appState';
import Bookmarks from '../components/elements/Bookmarks';
import Layout from '../components/layout/Layout';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';
import RecentReports from '../components/elements/RecentReports';

const Reports = () => {
  const { user } = useRecoilValue(appState);

  const t = useTranslations();
  return (
    <Layout noNav={false} title="Reports">
      <div className="text-primary">
        <div>
          <h1 className="text-3xl font-semibold py-2">{t('reports')}</h1>
          <p className="text-base py-2">{t('see all your recent reports')}</p>
          <h2 className="text-lg font-semibold py-2">Bookmarked Reports</h2>
        </div>

        {/* temp bookmark cards */}
        <Bookmarks reports={user?.reports} />

        <RecentReports reports={user?.reports} />
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
