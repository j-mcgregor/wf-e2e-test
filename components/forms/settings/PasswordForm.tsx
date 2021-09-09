import React, { FC } from 'react';

import Button from '../../elements/Button';
import { SettingsSectionHeader } from '../../elements/Headers';
import PasswordManagement from './PasswordManagement';
import { useTranslations } from 'next-intl';

interface PasswordFormProps {
  isSSO: boolean;
}

const PasswordForm: FC<PasswordFormProps> = ({ isSSO }) => {
  const t = useTranslations()
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <SettingsSectionHeader text={t('password')}/>
          <p className="mt-1 text-sm text-gray-500">
            Handle your authentication details
          </p>
        </div>
        {isSSO ? (
          <>
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
                  <h3
                    className={
                      'text-center mt-1 text-base font-bold text-gray-900'
                    }
                  >
                    You are logged in with Google
                  </h3>
                  <Button variant={'none'}>Manage Acccount</Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PasswordManagement />
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
