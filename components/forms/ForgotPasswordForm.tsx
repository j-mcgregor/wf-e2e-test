import { useTranslations } from 'next-intl';
import Link from '../elements/Link';
import Logo from '../elements/Logo';
import Button from '../elements/Button';

const ForgotPasswordForm = () => {
  const t = useTranslations();
  return (
    <div className="mt-6">
      <div>
        <Logo />
        <h1 className="text-3xl font-bold py-3 my-2">
          {t('forgotten password')}
        </h1>
        <form className="space-y-6">
          <p>{t('enter email')}</p>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium">
              {t('email address')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 my-2 rounded-md focus:outline-none placeholder-gray-40 sm:text-sm text-black"
            />
          </div>
        </form>
      </div>
      <div>
        <Link linkTo="#">
          <Button type="submit">{t('sign in')}</Button>
        </Link>
      </div>

      <div className="w-full text-center mt-8 text-highlight hover:text-yellow-500 text-sm">
        <Link linkTo="/login">
          <p>{t('back to login')}</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
