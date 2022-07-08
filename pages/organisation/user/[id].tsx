import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import React from 'react';
import ReactTimeago from 'react-timeago';
import useSWR from 'swr';

import Button from '../../../components/elements/Button';
import ToggleUserAccessButton from '../../../components/elements/ToggleUserAccessButton';
import Layout from '../../../components/layout/Layout';
import LoadingIcon from '../../../components/svgs/LoadingIcon';
import Table, { TableHeadersType } from '../../../components/table/Table';
import useOrganisation from '../../../hooks/useOrganisation';
import useSWRWithToasts from '../../../hooks/useSWRWithToasts';
import { useToast } from '../../../hooks/useToast';
import fetcher from '../../../lib/utils/fetcher';
import { createReportTitle } from '../../../lib/utils/text-helpers';
import { ReportSnippetType } from '../../../types/global';
import {
  OrganisationUser,
  OrganisationUserReport
} from '../../../types/organisations';

// eslint-disable-next-line sonarjs/cognitive-complexity
const OrganisationUserPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { organisation } = useOrganisation();
  const [user, setUser] = React.useState<OrganisationUser>();
  const [reports, setReports] = React.useState<OrganisationUserReport[]>([]);
  const { id } = router.query;
  const [skip, setSkip] = React.useState(0);

  const { triggerToast } = useToast();

  const limit = 10;

  const getReportName = (row: { company_name: string; created_at: string }) =>
    createReportTitle(row.company_name || t('unnamed_company'), row.created_at);

  const ReportTableHeaders: TableHeadersType[] = [
    {
      name: t('company_name'),
      selector: getReportName,
      align: 'left',
      width: 'w-[60%]',
      contentClassName: 'truncate max-w-[240px] lg:max-w-xs xl:max-w-sm',
      rowTitle: getReportName
    },
    {
      name: t('source'),
      selector: 'source',
      align: 'center',
      width: 'w-[10%]'
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
      width: 'w-[10%]'
    }
  ];

  const {
    data: organisationUser,
    isValidating: userIsValidating,
    mutate: userMutate
  } = useSWR(
    `/api/organisation/${organisation?.id}/user?userId=${id}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false
    }
  );

  const {
    data: userReports,
    isValidating,
    mutate
  } = useSWRWithToasts<OrganisationUserReport[]>(
    `/api/organisation/${organisation?.id}/user-reports?userId=${id}&skip=${skip}&limit=${limit}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false
    }
  );

  React.useEffect(() => {
    if (organisationUser?.data) {
      setUser({ ...user, ...organisationUser?.data });
    }
  }, [organisationUser]);

  React.useEffect(() => {
    if (userReports?.data) {
      setReports(userReports.data);
    }
  }, [userReports]);

  const {
    full_name: fullName,
    email,
    organisation_role: organisationRole,
    is_active: isActive,
    total_reports: totalReports
  } = user || {};

  const isAdmin = organisationRole === 'Admin';

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
    const optimisticData = organisationUser?.data &&
      user && {
        ...organisationUser?.data,
        user: { ...user, is_active: !user?.is_active }
      };
    return (
      user &&
      userMutate(updateUserFn({ is_active: !user?.is_active }), {
        optimisticData,
        rollbackOnError: true
      }).then(res => {
        const role = res.data?.is_active === true ? 'active' : 'inactive';

        triggerToast({
          toastId: `ACTIVE_USER_${res.data?.is_active}`,
          title: t(`${res?.sourceType}.${res?.code}.title`),
          description: t(`${res?.sourceType}.${res?.code}.description`, {
            user: res?.data?.full_name,
            role
          }),
          status: res?.status
        });
      })
    );
  };

  const toggleAdminUser = () => {
    const optimisticData = {
      data: organisationUser?.data &&
        user && {
          ...organisationUser?.data,
          user: { ...user, organisation_role: isAdmin ? 'User' : 'Admin' }
        }
    };
    return userMutate(
      updateUserFn({ organisation_role: isAdmin ? 'User' : 'Admin' }),
      { optimisticData, rollbackOnError: true }
    ).then(res => {
      const role =
        res?.data?.organisation_role === 'Admin'
          ? 'an admin'
          : res?.data?.organisation_role === 'User'
          ? 'a user'
          : '';

      triggerToast({
        toastId: `TOGGLE_USER_${res?.data?.organisation_role}`,
        title: t(`${res?.sourceType}.${res?.code}.title`),
        description: t(`${res?.sourceType}.${res?.code}.description`, {
          user: res?.data?.full_name,
          role
        }),
        status: res?.status
      });
    });
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
      <div className="max-w-lg text-primary min-w-full space-y-12 pb-40">
        <div className="max-w-lg space-y-4 ">
          <h1 className="text-3xl font-semibold">
            {t('organisation_user_overview')}
          </h1>
          <p className="text-sm leading-relaxed">
            {t('organisation_user_overview_description')}
          </p>

          {user ? (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between items-center bg-white p-5 text-gray-500 text-sm">
              <div className="flex flex-col justify-between gap-y-2">
                <div className="flex flex-col items-center sm:items-start">
                  <h1
                    className={`text-xl font-semibold text-highlight  ${
                      fullName ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {fullName ? fullName : '-'}
                  </h1>
                  <h3>Name</h3>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <h2
                    className={`text-xl font-semibold text-highlight ${
                      email ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {email ? email : '-'}
                  </h2>
                  <h3>Email</h3>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="flex items-center justify-center bg-primary rounded-full w-16 h-16 text-white text-xl">
                  {/* @ts-ignore */}
                  {!totalReports && !totalReports === 0 ? (
                    <LoadingIcon className="text-white" />
                  ) : (
                    totalReports
                  )}
                </div>
                <span>Reports</span>
              </div>
            </div>
          ) : (
            <div className="bg-white animate-pulse h-[144px] rounded-sm"></div>
          )}
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
            buttonText={isActive ? 'Deactivate user' : 'Activate user'}
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
            tableName={t('organisation_user_reports_title')}
            headers={ReportTableHeaders}
            data={reports}
            limit={limit}
            setSkip={setSkip}
            total={user?.total_reports || 0}
            isLoading={isValidating && reports.length === 0}
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
        ...require(`../../../messages/${locale}/reports.${locale}.json`),
        ...require(`../../../messages/${locale}/organisation.${locale}.json`),
        ...require(`../../../messages/${locale}/general.${locale}.json`),
        ...require(`../../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../../messages/${locale}/errors-default.${locale}.json`),
        ...require(`../../../messages/${locale}/toasts.${locale}.json`)
      }
    }
  };
}
