import { useTranslations } from 'next-intl';
import React from 'react';

import Button from '../../elements/Button';
import { SettingsSectionHeader } from '../../elements/Headers';
import PasswordManagement from './PasswordManagement';
import GoogleIcon from '../../icons/GoogleIcon';
import MicrosoftIcon from '../../icons/MicrosoftIcon';
import Link from '../../elements/Link';

interface PasswordFormProps {
  isSSO: false | 'microsoft' | 'google';
}

const SSOPassword = ({ isSSO }: PasswordFormProps) => {
  let component: React.ReactElement = <></>;
  const t = useTranslations();
  switch (isSSO) {
    case 'google':
      component = (
        <>
          <div className={'flex justify-center py-4'}>
            <GoogleIcon />
          </div>
          <h3 className={'text-center text-base font-bold text-gray-900'}>
            {t('forms.password-form.logged_in_google')}
          </h3>
        </>
      );
      break;
    case 'microsoft':
      component = (
        <>
          <div className={'flex justify-center py-4'}>
            <MicrosoftIcon />
          </div>
          <h3 className={'text-center text-base font-bold text-gray-900'}>
            {t('forms.password-form.logged_in_microsoft')}
          </h3>
        </>
      );
      break;
  }
  return component;
};

const ssoLink = ({ isSSO }: PasswordFormProps) => {
  switch (isSSO) {
    case 'google':
      return 'https://myaccount.google.com/';
    case 'microsoft':
      return 'https://account.microsoft.com/';
  }
};
const PasswordForm = ({ isSSO }: PasswordFormProps) => {
  const t = useTranslations();
  const linkTo = ssoLink({ isSSO });
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="bg-white pt-6 px-6 space-y-6 sm:pt-6">
        <div>
          <SettingsSectionHeader text={t('password')} />
          <p className="mt-1 text-sm text-gray-500">
            {t('forms.password-form.handle')}
          </p>
        </div>
      </div>
      {isSSO ? (
        <div className="bg-white py-6 px-4 sm:p-6">
          <div className="mb-8">
            <p className="mt-1 text-sm font-normal text-gray-900">
              {t('forms.password-form.your_account_is_handled')}
            </p>
            <p className="mt-1 text-sm font-normal text-gray-900">
              {t('forms.password-form.please_use_their_account')}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
              <div className="bg-gray-100 flex flex-col justify-center">
                <SSOPassword isSSO={isSSO} />
                <div className={'flex justify-center my-4'}>
                  <Button
                    // @ts-ignore
                    linkTo={linkTo}
                    type="submit"
                    variant="primary"
                    className="max-w-[150px]"
                  >
                    {t('forms.password-form.manage_account')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PasswordManagement />
      )}
    </div>
  );
};

export default PasswordForm;
