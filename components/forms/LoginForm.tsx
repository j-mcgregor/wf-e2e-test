import useLocalStorage from '../../hooks/useLocalStorage';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import Link from '../elements/Link';
import Checkbox from '../elements/Checkbox';
import TextInput from '../elements/TextInput';
import Button from '../elements/Button';

const LoginForm = () => {
  const [checked, setChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [activeUser, setActiveUser] = useLocalStorage('user_email', userEmail);

  const t = useTranslations();

  // if checkbox is true, set userEmail in local storage with 'user_email' key
  const handleSaveUser = (): void => {
    checked ? setActiveUser(userEmail) : null;
  };

  // useEffect(() => {
  //   console.log(userEmail);
  //   console.log(checked);
  //   console.log(activeUser);
  // }, [userEmail, checked]);

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
                autoComplete="email"
                value={userEmail}
                onChangeValue={e => setUserEmail(e.target.value)}
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
                  onToggleChecked={() => setChecked(!checked)}
                  isChecked={checked}
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
                <Button buttonType={'submit'} handleClicked={handleSaveUser}>
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
