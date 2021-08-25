import { useTranslations } from 'next-intl';
import { GetServerSidePropsContext } from 'next';

import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';
import Layout from '../components/layout/Layout';
import BookmarkCard from '../components/cards/BookmarkCard';

const reports = () => {
  const t = useTranslations();
  return (
    <Layout noNav={false} title="Reports">
      <div className="text-primary">
        <div>
          <h1 className="text-3xl font-semibold py-2">{t('reports')}</h1>
          <p className="text-base py-2">{t('see all your recent reports')}</p>
          <h2 className="text-lg font-semibold py-2">Bookmarked Reports</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 first: gap-2">
          {/* temp bookmark card */}

          <BookmarkCard
            linkTo="#"
            company_name="Scottish Seabird Center LTD"
            sme_zscore={244}
            bond_rating="AA"
            pd_ratio={12}
          />
          <BookmarkCard
            linkTo="#"
            company_name="Scottish Seabird Center LTD"
            sme_zscore={244}
            bond_rating="AA"
            pd_ratio={12}
          />
          <BookmarkCard
            linkTo="#"
            company_name="Scottish Seabird Center LTD"
            sme_zscore={244}
            bond_rating="AA"
            pd_ratio={12}
          />
          <BookmarkCard
            linkTo="#"
            company_name="Scottish Seabird Center LTD"
            sme_zscore={244}
            bond_rating="AA"
            pd_ratio={12}
          />
          <BookmarkCard
            linkTo="#"
            company_name="Scottish Seabird Center LTD"
            sme_zscore={244}
            bond_rating="AA"
            pd_ratio={12}
          />
          <BookmarkCard
            linkTo="#"
            company_name="Scottish Seabird Center LTD"
            sme_zscore={244}
            bond_rating="AA"
            pd_ratio={12}
          />
        </div>
      </div>
    </Layout>
  );
};

export default reports;

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
