import { useTranslations } from 'next-intl';

import Link from '../elements/Link';
import Checkbox from '../elements/Checkbox';
import TextInput from '../elements/TextInput';
import Button from '../elements/Button';

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
                <Checkbox
                  label={t('remember me')}
                  inputId="remember-me"
                  inputName="remember-me"
                  inputType="checkbox"
                />

                <div className="text-sm">
                  <Link
                    linkTo="/forgotten-password"
                    className="font-medium text-highlight hover:text-yellow-500"
                  >
                    {t('forgot password')}
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  buttonType="submit"
                  backgroundColor="highlight"
                  hoverColor="yellow-500"
                  focusColor="yellow-500"
                >
                  {t('sign in')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
