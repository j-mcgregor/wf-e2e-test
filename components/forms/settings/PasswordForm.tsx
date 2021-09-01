import React, {FC} from 'react';

import {useSettingsNavItemsProps} from "../../../hooks/useNavigation";
import Button from "../../elements/Button";
import HashHeader from "../../elements/HashHeader";

interface PasswordFormProps {
    headings: useSettingsNavItemsProps[]
}

const PasswordForm: FC<PasswordFormProps> = ({headings}) => {
    return (
        <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                        <HashHeader text={headings[2]['title']}
                                    classname={"text-lg leading-6 font-medium text-gray-900"}/>
                        <p className="mt-1 text-sm text-gray-500">
                            Handle your authentication details
                        </p>
                    </div>
                    <div>
                        <p className="mt-1 text-sm font-normal	 text-gray-900">
                            Your account is handled by a Single Sign On provider.
                        </p>
                        <p className="mt-1 text-sm font-normal text-gray-900">
                            Please use their account settings to change your details.
                        </p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                            <div className="bg-gray-100 p-8">
                                {/*<Icon />*/}
                                {/*google icon*/}
                                <h3 className={'text-center mt-1 text-base font-bold text-gray-900'}>You
                                    are logged in with Google</h3>
                                <Button variant={'none'}>Manage Acccount</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="bg-indigo-600 border border-transparent rounded-none shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PasswordForm;