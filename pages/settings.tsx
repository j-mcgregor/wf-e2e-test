/* eslint-disable security/detect-non-literal-require */
import { GetServerSidePropsContext } from 'next';
import React from 'react';

import HashContainer from '../components/elements/HashContainer';
import CommunicationForm from '../components/forms/settings/CommunicationForm';
import PasswordForm from '../components/forms/settings/PasswordForm';
import PersonalInformationForm from '../components/forms/settings/PersonalInformationForm';
import PreferenceForm from '../components/forms/settings/PreferenceForm';
import Layout from '../components/layout/Layout';
import SecondaryLayout from '../components/layout/SecondaryLayout';
import SettingsNav from '../components/layout/SettingsNav';
import { useSettingsNavItems } from '../hooks/useNavigation';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';

const Settings = () => {
  const headings = useSettingsNavItems();

  return (
    <Layout title="Settings" fullWidth>
      <SecondaryLayout navigation={<SettingsNav />}>
        <div className="flex flex-col sm:px-6 lg:px-0 max-w-3xl mx-auto space-y-24 pb-12">
          <HashContainer
            data-report-section="true"
            id={`${headings[0]['title'].toLowerCase().replace(/ /g, '-')}-id`}
            className="pt-16"
            name={headings[0]['title']}
          >
            <PersonalInformationForm heading={headings[0].title} />
          </HashContainer>

          <HashContainer
            data-report-section="true"
            id={`${headings[1]['title'].toLowerCase().replace(/ /g, '-')}-id`}
            className="pt-16"
            name={headings[1]['title']}
          >
            <PreferenceForm headings={headings} />
          </HashContainer>

          <HashContainer
            data-report-section="true"
            id={`${headings[2]['title'].toLowerCase().replace(/ /g, '-')}-id`}
            className="pt-16"
            name={headings[2]['title']}
          >
            <PasswordForm isSSO={false} />
          </HashContainer>

          <HashContainer
            data-report-section="true"
            id={`${headings[3]['title'].toLowerCase().replace(/ /g, '-')}-id`}
            className="pt-16"
            name={headings[3]['title']}
          >
            <CommunicationForm headings={headings} />
          </HashContainer>
        </div>
        <div className="h-[50vh]" />
      </SecondaryLayout>
    </Layout>
  );
};

export default Settings;

export const getServerSideProps = getServerSidePropsWithAuth(
  ({ locale }: GetServerSidePropsContext) => {
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
);
