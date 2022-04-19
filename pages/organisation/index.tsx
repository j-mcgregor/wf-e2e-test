import { CheckIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';
import useSWR from 'swr';

import LinkCard from '../../components/cards/LinkCard';
import Button from '../../components/elements/Button';
import Stats from '../../components/elements/Stats';
import Table, {
  TableDataType,
  TableHeadersType
} from '../../components/elements/Table';
import Layout from '../../components/layout/Layout';
import useOrganisation from '../../hooks/useOrganisation';
import fetcher from '../../lib/utils/fetcher';
import { OrganisationTypeApi } from '../api/organisation/[orgId]/[type]';

const usersHeaders: TableHeadersType[] = [
  { name: 'Name', selector: 'full_name' },
  { name: 'Email', selector: 'email' },
  {
    name: 'Reports',
    selector: 'reports',
    align: 'center'
  },
  {
    name: 'Active',
    selector: (row: { is_active: boolean }) => (row.is_active ? 'Yes' : 'No'),
    contentClassName: (row: { is_active: boolean }) =>
      `${
        row.is_active ? 'bg-green-500' : 'bg-red-500'
      } rounded-full w-9 bg-opacity-50 text-black`,
    align: 'center'
  }
];

const Organisation = () => {
  const t = useTranslations();
  const { organisation, message } = useOrganisation();
  const [skip, setSkip] = React.useState(0);

  const {
    data: result,
    error,
    isValidating
  } = useSWR<OrganisationTypeApi>(
    organisation?.id &&
      `/api/organisation/${organisation?.id}/users?limit=7&skip=${skip}`,
    fetcher
  );

  const users: TableDataType[] = result?.users || [];

  return (
    <Layout>
      <div className="text-primary flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
        <p>{t('dashboard_description')}</p>
        <Stats
          stats={[
            { header: t('stats_organisation_title'), data: organisation?.name },
            { header: t('stats_total_reports_title'), data: 3385 },
            { header: t('stats_users_title'), data: result?.total || '0' }
          ]}
        />
      </div>
      <div className="mt-12 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">{t('users_title')}</h2>
        <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
          <p className="pr-14">{t('users_description')}</p>
          <Button
            className="max-w-min whitespace-nowrap px-16 rounded-none"
            variant="alt"
          >{`Add User`}</Button>
        </div>
        <Table
          total={result?.total || 0}
          limit={7}
          headers={usersHeaders}
          data={users}
          skip={setSkip}
          pagination
          fillEmptyRows
          isLoading={!result || isValidating}
        />
      </div>
      <div className="mt-12 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">{t('intergrations_title')}</h2>
        <p className="pr-14">{t('intergrations_description')}</p>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-auto md:mr-auto">
          <LinkCard
            className="mx-auto"
            icon={<CheckIcon className='className="h-6 w-6 text-black' />}
            iconColor="bg-highlight-2 bg-opacity-20"
            header={t('codat_card_title')}
            description={t('codat_card_description')}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Organisation;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../messages/${locale}/organisation.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
