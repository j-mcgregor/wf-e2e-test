import { signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useLocalStorage from '../../../hooks/useLocalStorage';
import {
  EMAIL_REQUIRED,
  INCORRECT_DETAILS,
  PASSWORD_REQUIRED,
  VALID_EMAIL_REQUIRED
} from '../../../lib/utils/error-codes';
import { validEmailRegex } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import CheckboxInput from '../../elements/Checkbox';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';
import Link from '../../elements/Link';

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<FormValues>();

  const [, setActiveUser] = useLocalStorage<string | null>('user', null);
  const [authError, setAuthError] = useState(false);
  const [userEmail, setUserEmail] = useLocalStorage('wf_user_email', '');
  const [userLoginTime, setUserLoginTime] = useLocalStorage<number[]>(
    'wf_last_login',
    []
  );

  // handle the remember functions
  React.useEffect(() => {
    userEmail && setValue('email', userEmail);
    userEmail && setValue('remember', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  // only runs if form is valid
  const onSubmit = async (data: FormValues) => {
    // set login time for most recent login on dashboard
    setUserLoginTime([Date.now(), userLoginTime[0]]);

    // if remember add email to local state
    if (data.remember) {
      setUserEmail(data.email);
    }

    // if don't remember remove from local state
    if (!data.remember) {
      setUserEmail('');
    }

    const authenticated = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (authenticated?.ok) {
      data.remember && setActiveUser(data.email);
      return router.push('/');
    }
    return setAuthError(true);
  };

  return (
    <div>
      <div className="mt-8">
        <div>
          <div className="mt-6 relative flex items-center">
            <div className="sm:w-full w-1/4 border-t border-white" />

            <div className="relative flex justify-center text-sm w-full text-center">
              <span className="px-2">{t('continue_with')}</span>
            </div>
            <div className="sm:w-full w-1/4 border-t border-white" />
          </div>
        </div>

        <div className="mt-6">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <div>
                <Input
                  {...register('email', {
                    required: true,
                    pattern: validEmailRegex
                  })}
                  label={`${t('email')}`}
                  type="email"
                  autoComplete="email"
                  // requires a string to be passed
                  placeholder={`${t('placeholders.email')}`}
                />
                {errors.email?.type === 'required' && (
                  <ErrorMessage text={t(EMAIL_REQUIRED)} />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorMessage text={t(VALID_EMAIL_REQUIRED)} />
                )}
              </div>

              <div>
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  autoComplete="current-password"
                  label={`${t('password')}`}
                  placeholder={`${t('placeholders.password')}`}
                />
                {errors.password?.type === 'required' && (
                  <ErrorMessage text={t(PASSWORD_REQUIRED)} />
                )}
              </div>
            </div>

            {authError && <ErrorMessage text={t(INCORRECT_DETAILS)} />}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-left">
              <div className="flex items-center w-full sm:w-auto">
                <CheckboxInput
                  {...register('remember')}
                  id="remember"
                  label={`${t('remember_me')}`}
                />
              </div>

              <div className="text-sm hidden sm:block ">
                <Link
                  linkTo="/forgotten-password"
                  className="font-medium text-highlight hover:text-yellow-500"
                >
                  {t('forgot_password')}
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" loading={isSubmitting} variant="highlight">
                {t('sign_in')}
              </Button>
            </div>

            <div className="text-sm text-center pb-3 sm:hidden">
              <Link
                linkTo="/forgotten-password"
                className="font-medium text-highlight hover:text-yellow-500"
              >
                {t('forgot_password')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
