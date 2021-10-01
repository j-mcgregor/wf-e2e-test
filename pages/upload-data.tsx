import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';
import Layout from '../components/layout/Layout';

const UploadData = () => {
  const t = useTranslations();

  return (
    <Layout noNav={false}>
      <div className="text-primary">
        <p className="font-semibold text-4xl">{t('upload_additional_data')}</p>
      </div>
    </Layout>
  );
};

export default UploadData;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
    return {
      props: {
        messages: {
          // You can get the messages from anywhere you like, but the recommended
          // pattern is to put them in JSON files separated by language and read
          // the desired one based on the `locale` received from Next.js.
          ...require(`../messages/${locale}/upload.${locale}.json`),
          ...require(`../messages/${locale}/hints.${locale}.json`),
          ...require(`../messages/${locale}/general.${locale}.json`)
        }
      }
    };
  }
);
