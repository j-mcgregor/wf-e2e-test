import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import React from 'react';
import useSWR from 'swr';

import Button from '../../../components/elements/Button';
import Table, { TableHeadersType } from '../../../components/elements/Table';
import Layout from '../../../components/layout/Layout';
import useOrganisation from '../../../hooks/useOrganisation';
import fetcher from '../../../lib/utils/fetcher';

const tableHeaders: TableHeadersType[] = [
  { name: 'Report Name', selector: 'full_name' },
  { name: 'SME Z-Score', selector: 'full_name', align: 'center' },
  { name: 'BRE', selector: 'full_name', align: 'center' },
  { name: 'Created At', selector: 'full_name', align: 'center' }
];

const OrganisationUserPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { organisation, message } = useOrganisation();
  const { id } = router.query;

  const { data: result, isValidating } = useSWR<any>(
    `/api/organisation/${organisation?.id}/user?userId=${id}`,
    fetcher
  );

  const { full_name, email, is_superuser, is_active } =
    (result?.user?.length > 0 && result?.user[0]) || {};

  return (
    <Layout>
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
                44
              </div>
              <span>Reports</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 min-w-full">
          <ToggleUserAccess
            title={t('organisation_user_role_title')}
            description={t('organisation_user_role_description')}
            buttonText={is_superuser ? 'Return to user' : 'Make admin'}
            buttonVariant={is_superuser ? 'highlight' : 'alt'}
          />

          <ToggleUserAccess
            title={t('organisation_deactivate_user_title')}
            description={t('organisation_deactivate_user_description')}
            buttonText={is_active ? 'Deactivate user' : 'Activate User'}
            buttonVariant={is_active ? 'highlight' : 'alt'}
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
            data={[]}
            limit={7}
            skip={x => null}
            total={121}
            isLoading={false}
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
}

const ToggleUserAccess = ({
  title,
  description,
  buttonText,
  buttonVariant
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
