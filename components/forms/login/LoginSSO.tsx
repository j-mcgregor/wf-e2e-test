import { useTranslations } from 'next-intl';

import Button from '../../elements/Button';
import GoogleIcon from '../../icons/GoogleIcon';
import MicrosoftIcon from '../../icons/MicrosoftIcon';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import ErrorMessage from '../../elements/ErrorMessage';
import { INVALID_SSO_LOGIN } from '../../../lib/utils/error-codes';

const LoginSSO = () => {
  const t = useTranslations();
  const router = useRouter();
  const ssoError = router.query.error === 'Callback';
  return (
    <div className="pt-8">
      <p className="text-sm pb-1 ">
        {t('sign_in_with', {
          a: function Linked(children: React.ReactNode) {
            return children;
          }
        })}
      </p>

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
            onClick={() => signIn('msal')}
            variant="none"
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
