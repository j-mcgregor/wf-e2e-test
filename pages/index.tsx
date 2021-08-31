import {
  ChipIcon,
  DocumentDuplicateIcon,
  LightningBoltIcon,
  SearchCircleIcon
} from '@heroicons/react/outline';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRecoilValue } from 'recoil';

import LinkCard from '../components/cards/LinkCard';
import ReportTable from '../components/elements/ReportTable';
import Stats from '../components/elements/Stats';
import TwitterFeed from '../components/elements/TwitterFeed';
import Layout from '../components/layout/Layout';
import appState from '../lib/appState';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';

export default function Dashboard() {
  const t = useTranslations();

  const { user } = useRecoilValue(appState);

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-7 gap-x-4 text-primary">
        <div className="col-span-7 md:col-span-5 ">
          <div>
            <p className="text-base h-6 md:-mt-6">{t('welcome back')}</p>

            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">{user && user.name}</h1>
              <p className="font-semibold">{t('last 7 days')}</p>
            </div>
          </div>

          <Stats
            className="mt-4 mb-4"
            stats={[
              {
                header: t('total reports'),
                data: user?.recent_usage?.reports_ran
              },
              {
                header: t('api requests'),
                data: user?.recent_usage?.api_requests
              },
              {
                header: t('last login'),
                data: user?.recent_usage?.last_login,
                timeAgo: true
              }
            ]}
          />
          <ReportTable
            reports={user?.reports}
            limit={5}
            shadow={true}
            borders={true}
            fillerRows={true}
          />
        </div>

        <div className="md:col-span-2 md:block hidden">
          <h3 className="font-semibold">{t('updates')}</h3>
          <TwitterFeed className="mt-6 h-[398px]" />
        </div>
      </div>

      {/* link cards */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-auto md:mr-auto ">
        <LinkCard
          className="mx-auto"
          icon={<LightningBoltIcon className='className="h-6 w-6 text-white' />}
          iconColor="bg-highlight"
          header={t('automated report header')}
          description={t('automated report description')}
          linkTo="#"
        />
        <LinkCard
          className="mx-auto"
          icon={<SearchCircleIcon className='className="h-6 w-6 text-white' />}
          iconColor="bg-highlight-2"
          header={t('sme prospector header')}
          description={t('sme prospector description')}
          linkTo="#"
        />
        <LinkCard
          className="mx-auto"
          icon={
            <DocumentDuplicateIcon className='className="h-6 w-6 text-white' />
          }
          iconColor="bg-highlight-3"
          header={t('batch reports header')}
          description={t('batch reports description')}
          linkTo="#"
        />
        <LinkCard
          className="mx-auto"
          icon={<ChipIcon className='className="h-6 w-6 text-white ' />}
          iconColor="bg-highlight-4"
          header={t('automated report header')}
          description={t('automated report description')}
          linkTo="#"
        />
      </div>

      <div className="md:hidden max-w-lg mx-auto mt-8">
        <h3 className="font-semibold">{t('updates')}</h3>
        <TwitterFeed className="mt-6 h-[600px]" />
      </div>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
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
);
