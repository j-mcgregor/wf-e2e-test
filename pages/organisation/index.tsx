import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';
import useSWR from 'swr';

import Button from '../../components/elements/Button';
import Stats from '../../components/elements/Stats';
import Table, { TableHeadersType } from '../../components/table/Table';
import Layout from '../../components/layout/Layout';
import useOrganisation from '../../hooks/useOrganisation';
import fetcher from '../../lib/utils/fetcher';
import { OrganisationUser } from '../../types/organisations';
import { OrganisationTypeApi } from '../api/organisation/[orgId]/[type]';

const Organisation = () => {
  const t = useTranslations();
  const { organisation, message } = useOrganisation();
  const [skip, setSkip] = React.useState(0);
  const [users, setUsers] = React.useState<OrganisationUser[]>([]);
  const isIntergrated = false;

  const limit = 10;

  const {
    data: result,
    error,
    isValidating
  } = useSWR<OrganisationTypeApi>(
    organisation?.id &&
      `/api/organisation/${organisation?.id}/users?limit=${limit}&skip=${skip}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true
    }
  );

  React.useEffect(() => {
    if (result?.users) {
      setUsers(result.users);
    }
  }, [result]);

  const headerWidth = 'w-1/10 min-w-[88px]';

  const usersHeaders: TableHeadersType[] = [
    { name: t('table_name_header'), selector: 'full_name', width: 'w-1/5' },
    { name: t('table_email_header'), selector: 'email', width: 'w-1/2' },
    {
      name: t('table_role_header'),
      selector: 'organisation_role',
      align: 'center',
      contentClassName: (row: { organisation_role: string }) =>
        `${
          row.organisation_role === 'Admin' ? 'bg-highlight' : ''
        } rounded-full w-14 h-5 bg-opacity-20 flex justify-center items-center`,
      width: headerWidth
    },
    {
      name: t('table_reports_header'),
      selector: 'total_reports',
      align: 'center',
      width: headerWidth
    },
    {
      name: t('table_active_header'),
      selector: (row: { is_active: boolean }) => (row.is_active ? 'Yes' : 'No'),
      contentClassName: (row: { is_active: boolean }) =>
        `${
          row.is_active ? 'bg-green-300' : 'bg-red-500'
        } rounded-full w-10 h-5 bg-opacity-50 text-black flex justify-center items-center`,
      align: 'center',
      width: headerWidth
    }
  ];

  return (
    <Layout adminRequired title={t('title')}>
      <div className="text-primary flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
        <p>{t('dashboard_description')}</p>
        <Stats
          stats={[
            { header: t('stats_organisation_title'), data: organisation?.name },
            {
              header: t('stats_total_reports_title'),
              data: organisation?.quota?.quota_used || '0'
            },
            {
              header: t('stats_users_title'),
              data: organisation?.totalUsers || '0'
            }
          ]}
        />
      </div>
      <div className="mt-12 flex flex-col gap-5 mb-24">
        <h2 className="text-2xl font-semibold">{t('users_title')}</h2>
        <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
          <p className="pr-14">{t('users_description')}</p>
          <Button
            className="max-w-min whitespace-nowrap px-16 rounded-none"
            variant="alt"
            linkTo="/organisation/user/add"
          >{`Add User`}</Button>
        </div>

        <div className="h-[700px]">
          <Table
            tableName={t('users_title')}
            total={result?.total || 0}
            limit={limit}
            headers={usersHeaders}
            data={users}
            setSkip={setSkip}
            pagination
            fillEmptyRows
            isLoading={isValidating}
            rowLink={row => `/organisation/user/${row.id}`}
          />
        </div>
      </div>
      {/* <div className="mt-12 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">{t('intergrations_title')}</h2>
        <p className="pr-14">{t('intergrations_description')}</p>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-auto md:mr-auto">
          <LinkCard
            className="mx-auto"
            icon={
              isIntergrated ? (
                <CheckIcon className='className="h-6 w-6 text-black' />
              ) : (
                <LightningBoltIcon className='className="h-6 w-6 text-black' />
              )
            }
            iconColor={
              isIntergrated
                ? 'bg-highlight-2 bg-opacity-20'
                : 'bg-alt bg-opacity-40'
            }
            header={t('codat_card_title')}
            description={t('codat_card_description')}
            linkTo="/organisation/integrations/codat"
          />
        </div>
      </div> */}
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
