/* eslint-disable security/detect-non-literal-require */
import {GetServerSidePropsContext} from 'next';
import React from 'react';

import CommunicationForm from "../components/forms/settings/CommunicationForm";
import PasswordForm from "../components/forms/settings/PasswordForm";
import PersonalInformationForm from "../components/forms/settings/PersonalInformationForm";
import {SpecialistsForm} from "../components/forms/settings/SpecialistsForm";
import Layout from '../components/layout/Layout';
import SecondaryLayout from '../components/layout/SecondaryLayout';
import SettingsNav from "../components/layout/SettingsNav";
import {useSettingsNavItems} from '../hooks/useNavigation';
import getServerSidePropsWithAuth from '../lib/auth/getServerSidePropsWithAuth';

const Settings = () => {
    const headings = useSettingsNavItems();

    return (
        <Layout title="Settings" fullWidth>
            <SecondaryLayout
                navigation={<SettingsNav/>}
            >

                <div className="flex flex-col max-w-3xl mx-auto">
                    <div className="space-y-24 sm:px-6 lg:px-0 lg:col-span-9 pb-40">
                        <div
                            data-report-section="true"
                            id={`${headings[0]['title'].toLowerCase().replace(/ /g, '-')}-id`}
                            className="pt-16"
                        >
                            <PersonalInformationForm headings={headings}/>
                        </div>

                        <div
                            data-report-section="true"
                            id={`${headings[1]['title'].toLowerCase().replace(/ /g, '-')}-id`}
                            className="pt-16"
                        >
                            <SpecialistsForm headings={headings}/>
                        </div>
                        <div
                            data-report-section="true"
                            id={`${headings[2]['title'].toLowerCase().replace(/ /g, '-')}-id`}
                            className="pt-16"
                        >
                            <PasswordForm headings={headings} />
                        </div>
                        <div
                            data-report-section="true"
                            id={`${headings[3]['title'].toLowerCase().replace(/ /g, '-')}-id`}
                            className="pt-16"
                        >
                            <CommunicationForm headings={headings}/>
                        </div>

                    </div>
                </div>

            </SecondaryLayout>
        </Layout>
    );
};

export default Settings;

export const getServerSideProps = getServerSidePropsWithAuth(
    ({locale}: GetServerSidePropsContext) => {
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
