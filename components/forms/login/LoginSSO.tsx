import { useTranslations } from 'next-intl';

import Button from '../../elements/Button';
import GoogleIcon from '../../icons/GoogleIcon';
import MicrosoftIcon from '../../icons/MicrosoftIcon';

const LoginSSO = () => {
  const t = useTranslations();
  return (
    <div className="pt-8">
      <p className="text-sm pb-1 ">
        {t('sign_in_with', {
          a: function Linked(children: React.ReactNode) {
            return children;
          }
        })}
      </p>

      <div className="mt-1 grid grid-cols-2 gap-3">
        <div>
          <Button
            variant="none"
            newClassName="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50"
          >
            <GoogleIcon />
          </Button>
        </div>

        <div>
          <Button
            variant="none"
            newClassName="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50"
          >
            <MicrosoftIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginSSO;
