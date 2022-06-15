import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { INVALID_SSO_LOGIN } from '../../../lib/utils/error-codes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import GoogleIcon from '../../icons/GoogleIcon';
import MicrosoftIcon from '../../icons/MicrosoftIcon';

const LoginSSO = () => {
  const t = useTranslations();
  const router = useRouter();
  const ssoError = router.query?.error === 'Callback';

  const [ssoIsLoading, setSsoIsLoading] = React.useState('none');
  const handleMSALClick = () => {
    // show indicator for loading of SSO auth parameters
    setSsoIsLoading('msal');

    // sign in with the correct provider
    return signIn('msal');
  };

  const handleGoogleClick = () => {
    // show indicator for loading of SSO auth parameters
    setSsoIsLoading('google');

    // sign in with the correct provider
    return signIn('google');
  };

  return (
    <div className="pt-8">
      <p className="text-sm pb-1 ">{t('sign_in_with')}</p>

      <div className="mt-1 flex gap-x-4 ">
        <div className="w-full">
          <Button
            variant="none"
            onClick={handleGoogleClick}
            loading={ssoIsLoading === 'google'}
            disabled={ssoIsLoading === 'google'}
            newClassName="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50 text-black"
          >
            {t('google')}
            <GoogleIcon className="ml-2" />
          </Button>
        </div>

        <div className=" w-full">
          <Button
            onClick={handleMSALClick}
            variant="none"
            loading={ssoIsLoading === 'msal'}
            disabled={ssoIsLoading === 'msal'}
            newClassName="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50 text-black"
          >
            {t('microsoft')}
            <MicrosoftIcon className="ml-2" />
          </Button>
        </div>
      </div>
      {ssoError && <ErrorMessage text={t(INVALID_SSO_LOGIN)} />}
    </div>
  );
};

export default LoginSSO;
