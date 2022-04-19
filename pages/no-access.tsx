import {
  ChipIcon,
  DocumentDuplicateIcon,
  HandIcon,
  ShieldExclamationIcon
} from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';
import LinkCard from '../components/cards/LinkCard';
import WFLogo from '../components/svgs/WFLogo';
import Layout from '../components/layout/Layout';

const NoAccess = () => {
  const t = useTranslations();
  return (
    <Layout>
      <div className="space-y-12">
        <div className="min-w-full py-12 bg-white shadow flex flex-col justify-center items-center font-semibold">
          <ShieldExclamationIcon className="h-8 w-8" />
          <h1 className="text-highlight text-2xl">{t('no_access_title')}</h1>
          <p>{t('no_access_message')}</p>
        </div>
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
      </div>
    </Layout>
  );
};

export default NoAccess;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/index.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
