/* eslint-disable security/detect-non-literal-require */
import React from 'react';

import CommunicationForm from '../components/forms/settings/CommunicationForm';
import PasswordForm from '../components/forms/settings/PasswordForm';
import PersonalInformationForm from '../components/forms/settings/PersonalInformationForm';
import PreferenceForm from '../components/forms/settings/PreferenceForm';
import Layout from '../components/layout/Layout';
import SecondaryLayout from '../components/layout/SecondaryLayout';
import SettingsNav from '../components/layout/SettingsNav';
import { GetStaticPropsContext } from 'next';
import { useRecoilValue } from 'recoil';
import appState from '../lib/appState';
import { Element } from 'react-scroll';

// default setting formclasses
const formLabelClassName = 'block text-sm font-medium text-gray-700';
const formClassName =
  'mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

export type FormWithClassProps = {
  formClassName?: string;
  formLabelClassName: string;
};

const Settings = () => {
  const { user } = useRecoilValue(appState);
  return (
    <Layout title="Settings" fullWidth>
      <SecondaryLayout navigation={<SettingsNav />}>
        <div className="flex flex-col sm:px-6 lg:px-0 max-w-3xl mx-auto space-y-24 pb-[60vh] pt-12">
          <Element name="personal_information">
            <PersonalInformationForm
              formClassName={formClassName}
              formLabelClassName={formLabelClassName}
            />
          </Element>
          <Element name="preferences">
            <PreferenceForm
              formClassName={formClassName}
              formLabelClassName={formLabelClassName}
            />
          </Element>
          <Element name="password">
            <PasswordForm isSSO={user?.is_sso} />
          </Element>
          <Element name="communication">
            <CommunicationForm />
          </Element>
        </div>
      </SecondaryLayout>
    </Layout>
  );
};

export default Settings;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        // You can get the messages from anywhere you like, but the recommended
        // pattern is to put them in JSON files separated by language and read
        // the desired one based on the `locale` received from Next.js.
        ...require(`../messages/${locale}/settings.${locale}.json`),
        ...require(`../messages/${locale}/general.${locale}.json`),
        ...require(`../messages/${locale}/errors.${locale}.json`)
      }
    }
  };
}
