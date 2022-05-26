import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React, { Fragment } from 'react';
import useSWR from 'swr';

import Button from '../components/elements/Button';
import Stats from '../components/elements/Stats';
import Table, { TableHeadersType } from '../components/table/Table';
import Layout from '../components/layout/Layout';
import useOrganisation from '../hooks/useOrganisation';
import fetcher from '../lib/utils/fetcher';
import {
  OrganisationUser,
  OrganisationUserReport
} from '../types/organisations';
import { OrganisationTypeApi } from './api/organisation/[orgId]/[type]';
import LoadingIcon from '../components/svgs/LoadingIcon';
import { Tab } from '@headlessui/react';
import { getTotalOrganisationReportsType } from '../lib/funcs/organisation';
import ReactTimeago from 'react-timeago';
import { createReportTitle } from '../lib/utils/text-helpers';
import { CheckIcon, LightningBoltIcon } from '@heroicons/react/outline';
import LinkCard from '../components/cards/LinkCard';

const Organisation = () => {
  const t = useTranslations();
  const { organisation, message } = useOrganisation();
  const [skip, setSkip] = React.useState(0);
  const [users, setUsers] = React.useState<OrganisationUser[]>([]);
  const [reportsSkip, setReportsSkip] = React.useState(0);
  const [reports, setReports] = React.useState<OrganisationUserReport[]>([]);

  const { data: codat } = useSWR(
    organisation?.id &&
      `/api/integrations/codat-credentials?orgId=${organisation?.id}`,
    fetcher
  );

  const isIntergrated = codat?.data?.auth_header ?? false;

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

  const { data: userReports, isValidating: reportsIsValidating } =
    useSWR<getTotalOrganisationReportsType>(
      `/api/organisation/${organisation?.id}?reports=true&skip=${reportsSkip}&limit=${limit}`,
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

  React.useEffect(() => {
    if (userReports?.organisationUserReports) {
      setReports(userReports.organisationUserReports);
    }
  });

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

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const reportsHeaders: TableHeadersType[] = [
    {
      name: t('company_name'),
      selector: getReportName,
      align: 'left',
      width: 'w-[70%]',
      contentClassName:
        'truncate max-w-[400px] sm:max-w-lg lg:max-w-lg xl:max-w-2xl',
      rowTitle: getReportName
    },
    {
      name: t('sme_z-score'),
      selector: 'sme_z_score',
      align: 'center',
      width: 'w-[10%]'
    },
    {
      name: t('bre'),
      selector: 'bond_rating_equivalent',
      align: 'center',
      width: 'w-[10%]'
    },
    {
      name: t('created'),
      selector: (row: { created_at: string }) => (
        <ReactTimeago date={row.created_at} />
      ),
      align: 'center',
      width: 'w-[10%] pr-6'
    }
  ];

  return (
    <Layout
      adminRequired
      title={`${t.rich('title', {
        organisation_name: organisation?.name
      })}`}
    >
      <div className="text-primary flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">
          {t.rich('title', {
            organisation_name: organisation?.name
          })}
        </h1>
        <p className=" max-w-2xl">{t('dashboard_description')}</p>

        <Tab.Group>
          <Tab.List className="flex flex-col md:flex-row max-w-full md:max-w-lg shadow">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  type="button"
                  className={`${
                    selected ? 'border-highlight' : ''
                  } py-5 px-4 bg-white text-left md:w-1/2 min-h-[100px] border-[1px] flex flex-col justify-end `}
                >
                  <p className="text-2xl font-medium text-highlight">
                    {organisation?.totalUsers || (
                      <LoadingIcon className="text-highlight" />
                    )}
                  </p>
                  <p className="text-primary text-base">
                    {t('stats_users_title')}
                  </p>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  type="button"
                  className={`${
                    selected ? 'border-highlight' : ''
                  } py-5 px-4 bg-white text-left md:w-1/2 min-h-[100px] border-[1px] flex flex-col justify-end`}
                >
                  <p className="text-2xl font-medium text-highlight">
                    {organisation?.totalOrganisationReports || (
                      <LoadingIcon className="text-highlight" />
                    )}
                  </p>
                  <p className="text-primary text-base">
                    {t('stats_total_reports_title')}
                  </p>
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="mt-12 flex flex-col gap-5">
                <h2 className="text-2xl font-semibold">{t('users_title')}</h2>
                <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center">
                  <p className="pr-14 max-w-2xl">{t('users_description')}</p>
                  <Button
                    className="max-w-min whitespace-nowrap px-16 rounded-none"
                    variant="alt"
                    linkTo="/organisation/user/add"
                  >{`Add User`}</Button>
                </div>

                <div className="max-h-[700px]">
                  <Table
                    tableName={t('users_title')}
                    total={result?.total || 0}
                    limit={limit}
                    headers={usersHeaders}
                    data={users}
                    skip={skip}
                    setSkip={setSkip}
                    pagination
                    fillEmptyRows
                    isLoading={isValidating}
                    rowLink={row => `/organisation/user/${row.id}`}
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-12 flex flex-col gap-5">
                <h2 className="text-2xl font-semibold">
                  {t('table_reports_header')}
                </h2>
                <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center max-w-2xl">
                  <p className="pr-14">{t('reports_description')}</p>
                </div>

                <div className="max-h-[700px]">
                  <Table
                    tableName={t('users_title')}
                    total={
                      parseInt(`${organisation?.totalOrganisationReports}`) || 0
                    }
                    limit={limit}
                    headers={reportsHeaders}
                    data={reports}
                    skip={reportsSkip}
                    setSkip={setReportsSkip}
                    pagination
                    fillEmptyRows
                    isLoading={reportsIsValidating}
                    rowLink={row => `/report/${row.id}?from=/organisation`}
                  />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="mt-12 flex flex-col gap-5 mb-24">
          <h2 className="text-2xl font-semibold">{t('intergrations_title')}</h2>
          <p className="pr-14">{t('intergrations_description')}</p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4 max-w-lg md:max-w-none mx-0 md:mr-auto">
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
        ...require(`../messages/${locale}/reports.${locale}.json`),
        ...require(`../messages/${locale}/organisation.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
