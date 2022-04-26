import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import React from 'react';
import useSWR from 'swr';
import ReactTimeAgo from 'react-timeago';

import Button from '../../../components/elements/Button';
import Table, { TableHeadersType } from '../../../components/table/Table';
import Layout from '../../../components/layout/Layout';
import useOrganisation from '../../../hooks/useOrganisation';
import fetcher from '../../../lib/utils/fetcher';
import { OrganisationIndexApi } from '../../api/organisation/[orgId]';
import { OrganisationTypeApi } from '../../api/organisation/[orgId]/[type]';
import { createReportTitle } from '../../../lib/utils/text-helpers';

const OrganisationUserPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { organisation, message } = useOrganisation();
  const { id } = router.query;
  const [skip, setSkip] = React.useState(0);

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const tableHeaders: TableHeadersType[] = [
    {
      name: 'Report Name',
      selector: getReportName,
      rowTitle: getReportName,
      contentClassName: 'truncate max-w-[240px] lg:max-w-sm'
    },
    { name: 'SME Z-Score', selector: 'sme_z_score', align: 'center' },
    { name: 'BRE', selector: 'bond_rating_equivalent', align: 'center' },
    {
      name: 'Created At',
      selector: (row: { created_at: string }) => (
        <ReactTimeAgo date={row.created_at} />
      ),
      align: 'center'
    }
  ];

  const { data: result, isValidating } = useSWR<OrganisationTypeApi>(
    `/api/organisation/${organisation?.id}/user-reports?userId=${id}&skip=${skip}&limit=7`,
    fetcher
  );

  const { full_name, email, organisation_role, is_active, total_reports } =
    result?.user || {};

  const userReports = result?.userReports || [];

  const handleUpdateUser = (update: 'active' | 'admin') => {
    const updateActiveUser = { is_active: is_active ? false : true };
    const updateAdminUser = {
      organisation_role: organisation_role === 'Admin' ? 'User' : 'Admin'
    };

    return async () => {
      const res = await fetch(
        `/api/organisation/${organisation?.id}/user?userId=${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            ...(update === 'active' && updateActiveUser),
            ...(update === 'admin' && updateAdminUser)
          })
        }
      );
    };
  };

  return (
    <Layout adminRequired>
      <div className="h-10 flex items-center text-primary mb-3">
        <Button
          linkTo="/organisation"
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back_to_organisation')}
        </Button>
      </div>
      <div className="max-w-lg text-primary min-w-full space-y-12">
        <div className="max-w-lg space-y-4 ">
          <h1 className="text-3xl font-semibold">
            {t('organisation_user_overview')}
          </h1>
          <p className="text-sm leading-relaxed">
            {t('organisation_user_overview_description')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-center bg-white p-5 text-gray-500 text-sm">
            <div className="flex flex-col justify-between gap-y-2">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl font-semibold text-highlight">
                  {full_name}
                </span>
                <h2>Name</h2>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl font-semibold text-highlight">
                  {email}
                </span>
                <h2>Email</h2>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex items-center justify-center bg-primary rounded-full w-16 h-16 text-white text-xl">
                {total_reports}
              </div>
              <span>Reports</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 min-w-full">
          <ToggleUserAccess
            title={t('organisation_user_role_title')}
            description={t('organisation_user_role_description')}
            buttonText={
              organisation_role === 'Admin' ? 'Return to user' : 'Make admin'
            }
            buttonVariant={organisation_role === 'Admin' ? 'highlight' : 'alt'}
            onClick={handleUpdateUser('admin')}
          />

          <ToggleUserAccess
            title={t('organisation_deactivate_user_title')}
            description={t('organisation_deactivate_user_description')}
            buttonText={is_active ? 'Deactivate user' : 'Activate User'}
            buttonVariant={is_active ? 'highlight' : 'alt'}
            onClick={handleUpdateUser('active')}
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t('organisation_user_reports_title')}
            </h2>
            <p className="text-sm leading-relaxed">
              {t('organisation_user_reports_description')}
            </p>
          </div>
          <Table
            headers={tableHeaders}
            data={userReports}
            limit={7}
            skip={setSkip}
            total={total_reports || 0}
            isLoading={isValidating}
            rowLink={(row: { id: string }) =>
              `/report/${row.id}?from=/organisation/user/${id}`
            }
            fillEmptyRows
            pagination
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrganisationUserPage;

interface ToggleUserAccessProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: 'highlight' | 'alt';
  onClick?: () => void;
}

const ToggleUserAccess = ({
  title,
  description,
  buttonText,
  buttonVariant,
  onClick
}: ToggleUserAccessProps) => {
  return (
    <div className="flex flex-col justify-between gap-y-4 max-w-sm min-h-full pr-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
      <Button
        variant={buttonVariant}
        newClassName={`w-52 md:w-60 h-10 bg-${buttonVariant} text-white font-semibold`}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export async function getServerSideProps({
  locale
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../../messages/${locale}/organisation.${locale}.json`),
        ...require(`../../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
