import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';
import { useSession } from 'next-auth/client';
import Layout from '../components/layout/Layout';
import LinkCard from '../components/elements/LinkCard';
import {
  LightningBoltIcon,
  SearchCircleIcon,
  DocumentDuplicateIcon,
  ChipIcon
} from '@heroicons/react/outline';

import Stats from '../components/elements/Stats';

import mockUsers from '../lib/mock-data/users';
import React from 'react';

// issue getting full object from session so temporarily pulling usage in directly
const recentUsage = mockUsers['test@test.com'].recent_usage;

export default function Home() {
  const [session, loading] = useSession();
  const t = useTranslations();

  console.log(session);
  return (
    <Layout title="Dashboard">
      {session ? `Logged in as ${session?.user?.name}` : 'Not Logged in'}

      <Stats
        stats={[
          { header: t('total reports'), data: recentUsage.reports_ran },
          { header: t('api requests'), data: recentUsage.api_requests },
          {
            header: t('last login'),
            data: recentUsage.last_login,
            timeAgo: true
          }
        ]}
      />

      {/* link cards */}
      <div className="flex w-full">
        <LinkCard
          icon={<LightningBoltIcon className='className="h-6 w-6 text-white' />}
          iconColor="bg-highlight"
          header={t('automated report header')}
          description={t('automated report description')}
          linkTo="#"
        />
        <LinkCard
          icon={<SearchCircleIcon className='className="h-6 w-6 text-white' />}
          iconColor="bg-highlight-2"
          header={t('sme prospector header')}
          description={t('sme prospector description')}
          linkTo="#"
        />
        <LinkCard
          icon={
            <DocumentDuplicateIcon className='className="h-6 w-6 text-white' />
          }
          iconColor="bg-highlight-3"
          header={t('batch reports header')}
          description={t('batch reports description')}
          linkTo="#"
        />
        <LinkCard
          icon={<ChipIcon className='className="h-6 w-6 text-white ' />}
          iconColor="bg-highlight-4"
          header={t('automated report header')}
          description={t('automated report description')}
          linkTo="#"
        />
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
        // eslint-disable-next-line security/detect-non-literal-require
        ...require(`../messages/${locale}/index.${locale}.json`)
      }
    }
  };
}
