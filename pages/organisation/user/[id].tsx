import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import React from 'react';
import useSWR, { mutate } from 'swr';
import ReactTimeAgo from 'react-timeago';

import Button from '../../../components/elements/Button';
import Table, { TableHeadersType } from '../../../components/table/Table';
import Layout from '../../../components/layout/Layout';
import useOrganisation from '../../../hooks/useOrganisation';
import fetcher from '../../../lib/utils/fetcher';
import { OrganisationTypeApi } from '../../api/organisation/[orgId]/[type]';
import { createReportTitle } from '../../../lib/utils/text-helpers';
import LoadingIcon from '../../../components/svgs/LoadingIcon';
import ToggleUserAccessButton from '../../../components/elements/ToggleUserAccessButton';

import {
  OrganisationUser,
  OrganisationUserReport
} from '../../../types/organisations';

const OrganisationUserPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { organisation, message } = useOrganisation();
  const [user, setUser] = React.useState<OrganisationUser>();
  const [reports, setReports] = React.useState<
    OrganisationUserReport[] | null | undefined
  >([]);
  const { id } = router.query;
  const [skip, setSkip] = React.useState(0);

  const limit = 10;

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const tableHeaders: TableHeadersType[] = [
    {
      name: 'Report Name',
      selector: getReportName,
      rowTitle: getReportName,
      contentClassName: 'truncate max-w-[240px] lg:max-w-sm',
      width: 'w-3/6'
    },
    {
      name: 'SME Z-Score',
      selector: 'sme_z_score',
      align: 'center',
      width: 'w-1/6'
    },
    {
      name: 'BRE',
      selector: 'bond_rating_equivalent',
      align: 'center',
      width: 'w-1/6'
    },
    {
      name: 'Created At',
      selector: (row: { created_at: string }) => (
        <ReactTimeAgo date={row.created_at} />
      ),
      align: 'center',
      width: 'w-1/6'
    }
  ];

  const {
    data: result,
    isValidating,
    mutate
  } = useSWR<OrganisationTypeApi>(
    `/api/organisation/${organisation?.id}/user-reports?userId=${id}&skip=${skip}&limit=${limit}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false
    }
  );

  const {
    full_name: fullName,
    email,
    organisation_role: organisationRole,
    is_active: isActive,
    total_reports: totalReports
  } = user || {};

  const isAdmin = organisationRole === 'Admin';

  React.useEffect(() => {
    // only update if the value for total reports changes
    // prevents load of value on button toggle
    if (
      (!isValidating && result?.user?.total_reports) ||
      result?.user?.total_reports === 0
    ) {
      result?.user && setUser(result?.user);
    }
    if (!isValidating && result?.userReports && result.userReports.length > 0) {
      result?.userReports && setReports(result?.userReports);
    }
  }, [result, isValidating]);

  const updateUserFn = async (body: Partial<OrganisationUser>) => {
    const res = await fetch(
      `/api/organisation/${organisation?.id}/user?userId=${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(body)
      }
    );
    return await res.json();
  };

  const toggleActiveUser = () => {
    const optimisticData = result &&
      user && { ...result, user: { ...user, is_active: !user?.is_active } };
    return (
      user &&
      mutate(updateUserFn({ is_active: !user?.is_active }), {
        optimisticData,
        rollbackOnError: true
      })
    );
  };
  const toggleAdminUser = () => {
    const optimisticData = result &&
      user && {
        ...result,
        user: { ...user, organisation_role: isAdmin ? 'User' : 'Admin' }
      };
    return mutate(
      updateUserFn({ organisation_role: isAdmin ? 'User' : 'Admin' }),
      { optimisticData, rollbackOnError: true }
    );
  };

  return (
    <Layout adminRequired title={t('organisation_user_overview')}>
      <div className="h-10 flex items-center text-primary mb-3 ">
        <Button
          linkTo="/organisation"
          variant="none"
          newClassName="text-sm flex items-center hover:text-alt"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          {t('back_to_organisation')}
        </Button>
      </div>
      <div className="max-w-lg text-primary min-w-full space-y-12 mb-40">
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
                <h1
                  className={`text-xl font-semibold text-highlight  ${
                    fullName ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {fullName ? fullName : 'John Doe'}
                </h1>
                <h3>Name</h3>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h2
                  className={`text-xl font-semibold text-highlight ${
                    email ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {email ? email : 'placeholder@example.com'}
                </h2>
                <h3>Email</h3>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex items-center justify-center bg-primary rounded-full w-16 h-16 text-white text-xl">
                {/* @ts-ignore */}
                {!user?.total_reports && !user?.total_reports === 0 ? (
                  <LoadingIcon className="text-white" />
                ) : (
                  totalReports
                )}
              </div>
              <span>Reports</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 min-w-full">
          <ToggleUserAccessButton
            title={t('organisation_user_role_title')}
            description={t('organisation_user_role_description')}
            buttonText={isAdmin ? 'Return to user' : 'Make admin'}
            buttonVariant={isAdmin ? 'highlight' : 'alt'}
            onClick={toggleAdminUser}
          />

          <ToggleUserAccessButton
            title={t('organisation_deactivate_user_title')}
            description={t('organisation_deactivate_user_description')}
            buttonText={isActive ? 'Deactivate user' : 'Activate User'}
            buttonVariant={isActive ? 'highlight' : 'alt'}
            onClick={toggleActiveUser}
          />
        </div>
        <div className="space-y-4 ">
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
            data={reports || []}
            limit={limit}
            skip={setSkip}
            total={totalReports || 0}
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
