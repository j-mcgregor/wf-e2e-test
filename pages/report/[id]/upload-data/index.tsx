/* eslint-disable security/detect-non-literal-require */
import { ArrowLeftIcon, CloudDownloadIcon } from '@heroicons/react/outline';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';

import LinkCard from '../../../../components/cards/LinkCard';
import Button from '../../../../components/elements/Button';
import Layout from '../../../../components/layout/Layout';
import UploadNewData from '../../../../components/uploads/UploadNewData';
import getServerSidePropsWithAuth from '../../../../lib/auth/getServerSidePropsWithAuth';

const UploadData = () => {
  const t = useTranslations();

  const downloadIconColor = 'bg-highlight bg-opacity-50';

  return (
    <Layout noNav={false}>
      <div className="text-primary">
        <Button
          linkTo="/reports" // fix to send back to report
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> {t('back_to_report')}
        </Button>
        <p className="font-semibold text-4xl py-3">
          {t('upload_additional_data')}
        </p>
        s<p className="text-sm py-4">{t('add_additional_data_to_report')}</p>
        <p className="text-2xl font-semibold py-2">
          {t('choose_data_to_modify')}
        </p>
        <div className="flex w-1/2 justify-between py-4">
          <LinkCard
            icon={<CloudDownloadIcon className="h-6 w-6" />}
            linkTo="#"
            iconColor={downloadIconColor}
            header={t('full_report')}
            description={t('make_changes_to_any_report')}
          />
          <LinkCard
            icon={<CloudDownloadIcon className="h-6 w-6" />}
            linkTo="#"
            iconColor={downloadIconColor}
            header={t('financials_only')}
            description={t('add_a_new_year_of_financials')}
          />
        </div>
        <UploadNewData hasHeader={true} />
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
          ...require(`../../../../messages/${locale}/upload-data.${locale}.json`),
          ...require(`../../../../messages/${locale}/hints.${locale}.json`),
          ...require(`../../../../messages/${locale}/general.${locale}.json`)
        }
      }
    };
  }
);
