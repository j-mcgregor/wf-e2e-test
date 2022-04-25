import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import React from 'react';

import Button from '../../../components/elements/Button';
import Layout from '../../../components/layout/Layout';

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
      <div className="text-primary space-y-10">
        <div className="space-y-4 leading-relaxed">
          <h1 className="text-3xl font-semibold">{t('codat_page_title')}</h1>
          <p>{t('codat_page_description')}</p>
          <ol start={1} style={{ listStyleType: 'decimal' }} className="pl-12">
            <li>{t('codat_integration_step_1')}</li>
            <li>
              {t.rich('codat_integration_step_2', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_3', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_4', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_5', { b: bold => <b>{bold}</b> })}
            </li>
            <li>
              {t.rich('codat_integration_step_6', { b: bold => <b>{bold}</b> })}
            </li>
          </ol>
        </div>
        <div className="shadow">
          <div className="bg-white py-7 px-5 space-y-4">
            <h2 className="text-xl font-semibold">
              {t('codat_add_auth_header_title')}
            </h2>
            <p className="text-gray-500">
              {t('codat_add_auth_header_description')}
            </p>
            <textarea
              className="w-full bg-gray-50 border-none h-52"
              placeholder={t('codat_auth_header_placeholder')}
            ></textarea>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Button variant="alt" className="max-w-max rounded-none">
              {t('add_integration_button')}
            </Button>
          </div>
        </div>
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
        ...require(`../../../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
