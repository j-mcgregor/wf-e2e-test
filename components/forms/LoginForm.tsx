import { useTranslations } from 'next-intl';

const LoginForm = () => {
  const t = useTranslations();

  return (
    <form>
      <div>
        <div className="mt-8">
          <div>
            <div className="mt-6 relative flex items-center">
              <div className="w-full border-t border-white" />

              <div className="relative flex justify-center text-sm w-full">
                <span className="px-2">{t('continue with')}</span>
              </div>
              <div className="w-full border-t border-white" />
            </div>
          </div>

          <div className="mt-6">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  {t('email')}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  {t('password')}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm">
                    {t('remember me')}
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-yellow-500 hover:text-yellow-400"
                  >
                    {t('forgot password')}
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  {t('sign in')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
