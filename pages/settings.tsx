/* eslint-disable security/detect-non-literal-require */
import React from 'react';

import HashContainer from '../components/elements/HashContainer';
import CommunicationForm from '../components/forms/settings/CommunicationForm';
import PasswordForm from '../components/forms/settings/PasswordForm';
import PersonalInformationForm from '../components/forms/settings/PersonalInformationForm';
import PreferenceForm from '../components/forms/settings/PreferenceForm';
import Layout from '../components/layout/Layout';
import SecondaryLayout from '../components/layout/SecondaryLayout';
import SettingsNav from '../components/layout/SettingsNav';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

const Settings = () => {
  const t = useTranslations();

  return (
    <Layout title="Settings" fullWidth>
      <SecondaryLayout navigation={<SettingsNav />}>
        <div className="flex flex-col sm:px-6 lg:px-0 max-w-3xl mx-auto space-y-24 pb-12">
          <HashContainer
            id={`personal-information-id`}
            name={'Personal Information'}
          >
            <PersonalInformationForm />
          </HashContainer>

          <HashContainer id={`preferences-id`} name={'Preferences'}>
            <PreferenceForm />
          </HashContainer>

          <HashContainer id={`password-id`} name={'Password'}>
            <PasswordForm isSSO={true} />
          </HashContainer>

          <HashContainer id={`communication-id`} name={'Communication'}>
            <CommunicationForm />
          </HashContainer>
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
        ...require(`../messages/${locale}/general.${locale}.json`)
      }
    }
  };
}
