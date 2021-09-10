import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useLocalStorage from '../../../hooks/useLocalStorage';
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
    formState: { errors, isSubmitting }
  } = useForm<FormValues>();

  const [, setActiveUser] = useLocalStorage<string | null>('user', null);
  const [authError, setAuthError] = useState(false);

  // only runs if form is valid
  const onSubmit = async (data: FormValues) => {
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
              <span className="px-2">{t('continue with')}</span>
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
                  // requires a string to be passed
                  placeholder={`${t('placeholders.email')}`}
                />
                {errors.email?.type === 'required' && (
                  <ErrorMessage text={t('errors.email required')} />
                )}
                {errors.email?.type === 'pattern' && (
                  <ErrorMessage text={t('errors.valid email')} />
                )}
              </div>

              <div>
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  label={`${t('password')}`}
                  placeholder={`${t('placeholders.password')}`}
                />
                {errors.password?.type === 'required' && (
                  <ErrorMessage text={t('errors.password required')} />
                )}
              </div>
            </div>

            {authError && <ErrorMessage text={t('errors.incorrect details')} />}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-left">
              <div className="flex items-center w-full sm:w-auto">
                <CheckboxInput
                  {...register('remember')}
                  id="remember"
                  label={`${t('remember me')}`}
                />
              </div>

              <div className="text-sm hidden sm:block ">
                <Link
                  linkTo="/forgotten-password"
                  className="font-medium text-highlight hover:text-yellow-500"
                >
                  {t('forgot password')}
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" loading={isSubmitting} variant="highlight">
                {t('sign in')}
              </Button>
            </div>

            <div className="text-sm text-center pb-3 sm:hidden">
              <Link
                linkTo="/forgotten-password"
                className="font-medium text-highlight hover:text-yellow-500"
              >
                {t('forgot password')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;