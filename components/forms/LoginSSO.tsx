import { useTranslations } from 'next-intl';
import MicrosoftIcon from '../icons/MicrosoftIcon';
import GoogleIcon from '../icons/GoogleIcon';

const LoginSSO = () => {
  const t = useTranslations();
  return (
    <div className="pt-8">
      <p className="text-sm pb-1 ">
        {t('sign in with', {
          a: function Linked(children: React.ReactNode) {
            return children;
          }
        })}
      </p>

      <div className="mt-1 grid grid-cols-2 gap-3">
        <div>
          <a
            href="#"
            className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50"
          >
            <GoogleIcon />
          </a>
        </div>

        <div>
          <a
            href="#"
            className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-white text-sm font-medium hover:bg-gray-50"
          >
            <MicrosoftIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginSSO;
