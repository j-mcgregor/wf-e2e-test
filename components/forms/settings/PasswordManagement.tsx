import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import config from '../../../config';
import appState, { appUser } from '../../../lib/appState';
import {
  CONFIRM_PASSWORD_MATCH,
  GENERIC_API_ERROR,
  NEW_PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENTS
} from '../../../lib/utils/error-codes';
import { validPasswordRegex } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';

interface PasswordFormInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordManagement = () => {
  const { user } = useRecoilValue(appState);
  const setCurrentUser = useSetRecoilState(appUser);

  const t = useTranslations();

  const { register, formState, getValues, handleSubmit, reset } =
    useForm<PasswordFormInput>();
  const { isDirty, errors, isSubmitting } = formState;
  const [submitError, setSubmitError] = useState({ type: '' });

  // @ts-ignore
  const onSubmit: SubmitHandler = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const { newPassword, currentPassword } = data;
    try {
      const fetchRes = await fetch(
        `${config.URL}/api/user/password?id=${user.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...user,
            currentPassword,
            password: newPassword.trim()
          })
        }
      );

      const json = await fetchRes.json();

      if (!json.ok) {
        setSubmitError({ type: json.error });
        return reset();
      }

      if (json.ok) {
        setCurrentUser({ ...user });
        return reset();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <Sentry.ErrorBoundary
      showDialog
      fallback={<ErrorMessage text={t(GENERIC_API_ERROR)} />}
      beforeCapture={scope => {
        scope.setTag('location', 'form-password-management');
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div className=" xs:w-full sm:w-1/2 ">
            <Input
              {...register('currentPassword', {
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                }
              })}
              label={t('forms.password-management.current_password')}
              name="currentPassword"
              autoComplete="current-password"
              type="password"
              showEye
            />
            {errors.currentPassword && (
              <ErrorMessage text={t(NEW_PASSWORD_REQUIRED)} />
            )}
            <Input
              {...register('newPassword', {
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                },
                validate: value =>
                  validPasswordRegex.test(value) ||
                  'Password should be minimum 8 characters and contain at least one uppercase letter, one lowercase letter, one number, one special character'
              })}
              label={t('forms.password-management.new_password')}
              name="newPassword"
              autoComplete="new-password"
              type="password"
              showEye
            />
            {errors.newPassword ? (
              errors.newPassword.message ? (
                <ErrorMessage text={t(PASSWORD_REQUIREMENTS)} />
              ) : (
                <ErrorMessage text={t(NEW_PASSWORD_REQUIRED)} />
              )
            ) : null}
            <Input
              {...register('confirmPassword', {
                validate: {
                  //if this returns false it triggers the validation to show, its if validating is false, trigger message
                  confirmPasswordValidate: value => {
                    if (getValues('newPassword') !== value) {
                      return t(CONFIRM_PASSWORD_MATCH);
                    }
                    return true;
                  }
                }
              })}
              label={t('forms.password-management.confirm_password')}
              name="confirmPassword"
              autoComplete="new-password"
              showEye
            />
            {errors?.confirmPassword && (
              <ErrorMessage text={t(CONFIRM_PASSWORD_MATCH)} />
            )}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center">
          {submitError.type === GENERIC_API_ERROR && (
            <ErrorMessage className="text-left" text={t(GENERIC_API_ERROR)} />
          )}
          <Button
            disabled={!isDirty}
            type="submit"
            loading={isSubmitting}
            variant="primary"
            className="max-w-[150px] ml-auto"
          >
            {t('save')}
          </Button>
        </div>
      </form>
    </Sentry.ErrorBoundary>
  );
};

export default PasswordManagement;
