import { useTranslations } from 'next-intl';
// import { Children } from 'react';
import { CheckboxInput, TextInput } from '../elements/Input';
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
              <TextInput
                label={t('email')}
                inputId="email"
                inputName="email"
                inputType="email"
                isRequired
              />
              <div className="space-y-1">
                <TextInput
                  label={t('password')}
                  inputId="password"
                  inputName="password"
                  inputType="password"
                  autoComplete="password"
                  isRequired
                />
              </div>

              <div className="flex items-center justify-between">
                <CheckboxInput
                  label={t('remember me')}
                  inputId="remember-me"
                  inputName="remember-me"
                  inputType="checkbox"
                />

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-highlight hover:text-yellow-500"
                  >
                    {t('forgot password')}
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-highlight hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
