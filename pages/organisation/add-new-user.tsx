import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';
import Button from '../../components/elements/Button';
import Layout from '../../components/layout/Layout';

const AddNewUserPage = () => {
  const t = useTranslations();
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
        ...require(`../../messages/${locale}/organisation.${locale}.json`),
        ...require(`../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
