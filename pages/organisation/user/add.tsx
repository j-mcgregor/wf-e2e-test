import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';
import Button from '../../../components/elements/Button';
import Input from '../../../components/elements/Input';
import Stats from '../../../components/elements/Stats';
import AddNewUserForm from '../../../components/forms/add-user/AddUserForm';
import Layout from '../../../components/layout/Layout';
import useOrganisation from '../../../hooks/useOrganisation';

const AddNewUserPage = () => {
  const t = useTranslations();
  const { organisation, mutateUsers } = useOrganisation();

  return (
    <Layout adminRequired title={t('add_user_title')}>
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
      <div className="text-primary space-y-10 ">
        <div className="space-y-4 leading-relaxed">
          <h1 className="text-3xl font-semibold">{t('add_user_title')}</h1>
          <p>{t('add_user_description')}</p>
          <Stats
            stats={[
              {
                header: t('add_user_total_stats'),
                data: `${organisation.totalUsers || '-'}`
              }
              // {
              //   header: t('add_user_max_stats'),
              //   data: `${organisation?.max_users || '-'}`
              // }
            ]}
          />
        </div>
        <AddNewUserForm onSubmitSuccess={mutateUsers} />
      </div>
    </Layout>
  );
};

export default AddNewUserPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../../../messages/${locale}/organisation.${locale}.json`),
        ...require(`../../../messages/${locale}/errors.${locale}.json`),
        ...require(`../../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
