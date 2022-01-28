import { signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { INVALID_SSO_LOGIN } from '../../../lib/utils/error-codes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import MicrosoftIcon from '../../icons/MicrosoftIcon';

const LoginSSO = () => {
  const t = useTranslations();
  const router = useRouter();
  const ssoError = router.query.error === 'Callback';
  const [userLoginTime, setUserLoginTime] = useLocalStorage<number[]>(
    'wf_last_login',
    []
  );
  const [ssoIsLoading, setSsoIsLoading] = React.useState(false);
  const handleMSALClick = () => {
    // show indicator for loading of SSO auth parameters
    setSsoIsLoading(true);

    // set the most recent login time into local state
    setUserLoginTime([Date.now(), userLoginTime[0]]);

    // sign in with the correct provider
    return signIn('msal');
  };

  return (
    <div className="pt-8">
      <p className="text-sm pb-1 ">{t('sign_in_with')}</p>

      <div className="mt-1">
        {/* <div>
          <Button
            variant="none"
            newClassName="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50"
          >
            <GoogleIcon />
          </Button>
        </div> */}

        <div className="mb-2">
          <Button
            onClick={handleMSALClick}
            variant="none"
            loading={ssoIsLoading}
            disabled={ssoIsLoading}
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
