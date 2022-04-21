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
            <li>Log into Codat</li>
            <li>
              Navigate to <span className="font-bold">Account</span> on the side
              bar
            </li>
            <li>
              Then click into <span className="font-bold">Profile</span>
            </li>
            <li>
              Scroll down to <span className="font-bold">API Access</span>
            </li>
            <li>
              Copy the Authorisation header, which looks similar to{' '}
              <span className="font-bold">
                Basic XXXXXXXansdklandklasndansdadnadad21e12==
              </span>
            </li>
            <li>
              Paste what you copied below and click{' '}
              <span className="font-bold">Add integration</span>
            </li>
          </ol>
        </div>
        <div className="shadow">
          <div className="bg-white py-7 px-5 space-y-4">
            <h2 className="text-xl font-semibold">Add Authorisation Header</h2>
            <p className="text-gray-500">
              Add the authorisation header from Codat below.
            </p>
            <textarea
              className="w-full bg-gray-50 border-none h-52"
              placeholder="Copy and paste your authorisation here."
            ></textarea>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Button
              variant="alt"
              newClassName="bg-alt text-white w-max py-2 px-8"
            >
              Add integration
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
