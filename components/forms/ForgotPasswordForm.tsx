import { useTranslations } from 'next-intl';
import Link from '../elements/Link';
import Logo from '../elements/Logo';

const ForgotPasswordForm = () => {
  const t = useTranslations();
  return (
    <form action="#" method="POST" className="space-y-6">
      <div>
        <Logo />
        <h1 className="text-3xl font-bold py-3 my-2">
          {t('forgotten password')}
        </h1>
        <p>{t('enter email')}</p>
        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium">
            {t('email address')}
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-highlight focus:border-highlight sm:text-sm text-black"
            />
          </div>
        </div>
      </div>
      <div>
        <Link linkTo="#">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-highlight hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {t('sign in')}
          </button>
        </Link>
      </div>

      {/* link component linkTo is prop replacing href */}
      <div className="w-full text-center mt-8 text-highlight hover:text-yellow-500">
        <Link linkTo="/login">
          <p>{t('back to login')}</p>
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
