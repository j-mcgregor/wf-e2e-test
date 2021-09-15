import React, { FC } from 'react';

import Button from '../../elements/Button';
import { SettingsSectionHeader } from '../../elements/Headers';
import PasswordManagement from './PasswordManagement';
import { useTranslations } from 'next-intl';

interface PasswordFormProps {
  isSSO: boolean;
}

const PasswordForm: FC<PasswordFormProps> = ({ isSSO }) => {
  const t = useTranslations();
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <SettingsSectionHeader text={t('forms.password-form.password')} />
          <p className="mt-1 text-sm text-gray-500">
            {t('forms.password-form.handle')}
          </p>
        </div>
        {!isSSO ? (
          <>
            <div>
              <p className="mt-1 text-sm font-normal text-gray-900">
                {t('forms.password-form.your account is handled')}
              </p>
              <p className="mt-1 text-sm font-normal text-gray-900">
                {t('forms.password-form.please use their account')}
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
                    {t('forms.password-form.logged in google')}
                  </h3>
                  <Button
                    type="submit"
                    variant="primary"
                    className="max-w-[150px] ml-auto"
                  >
                    {t('forms.password-form.manage account')}
                  </Button>
                  {/*<Button variant={'none'}>Manage Acccount</Button>*/}
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
