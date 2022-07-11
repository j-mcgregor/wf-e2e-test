/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CheckIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import config from '../../../config';
import { useToast } from '../../../hooks/useToast';
import appState, { appUser } from '../../../lib/appState';
import {
  CONFIRM_PASSWORD_MATCH,
  GENERIC_API_ERROR,
  NEW_PASSWORD_REQUIRED,
  PASSWORD_REQUIREMENTS,
  USER_BAD_REQUEST,
  USER_NOT_AUTHORISED
} from '../../../lib/utils/error-codes';
import { generatePassword } from '../../../lib/utils/generatePassword';
import { VALID_PASSWORD } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import Input from '../../elements/Input';
import SuccessMessage from '../../elements/SuccessMessage';
import { PasswordValidation } from './PasswordValidation';

interface PasswordFormInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordManagement = () => {
  const { user } = useRecoilValue(appState);
  const setCurrentUser = useSetRecoilState(appUser);

  const t = useTranslations();

  const {
    register,
    formState,
    getValues,
    handleSubmit,
    reset,
    watch,
    setValue
  } = useForm<PasswordFormInput>();
  const { isDirty, errors, isSubmitting } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const { triggerToast, getToastTextFromResponse } = useToast();

  // @ts-ignore
  const onSubmit: SubmitHandler = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const { newPassword, currentPassword } = data;

    try {
      const fetchRes = await fetch(`${config.URL}/api/user`, {
        method: 'PUT',
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword.trim()
        })
      });

      const json = await fetchRes.json();

      if (!json.ok) {
        const toastText = getToastTextFromResponse(json);

        toastText &&
          triggerToast({
            title: toastText.title,
            description: toastText.description,
            status: json.status
          });

        return reset();
      }

      if (json.ok) {
        setCurrentUser({ ...user });

        triggerToast({
          title: t(`USER.USER_UPDATED.title`),
          description: t(`USER.USER_UPDATED.description`, {
            section: 'Password'
          }),
          status: json.status
        });

        return reset();
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const createPassword = () => {
    const generatedPassword = generatePassword();
    setShowPassword(true);
    setValue('newPassword', generatedPassword);
    setValue('confirmPassword', generatedPassword);
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
        <div className="bg-white py-6 px-4 sm:space-x-4 space-y-6 sm:p-6 flex flex-col sm:flex-row justify-between">
          <div className=" xs:w-full sm:w-1/2 ">
            <Input
              {...register('currentPassword', {
                required: 'You must enter your current password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                }
              })}
              label={t('forms.password-management.current_password')}
              name="currentPassword"
              autoComplete="current-password"
              type="password"
              showEye={{
                isOpen: showPassword
              }}
            />
            {errors.currentPassword && (
              <ErrorMessage
                text={
                  errors.currentPassword.message || t(NEW_PASSWORD_REQUIRED)
                }
              />
            )}
            <Input
              {...register('newPassword', {
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters'
                },
                validate: value =>
                  VALID_PASSWORD.test(value) ||
                  'Please check your new password is valid'
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
            {isDirty && (
              <button
                type="button"
                className="text-xs text-orange-400 cursor-pointer mt-4 hover:text-orange-200 mb-2"
                onClick={() => createPassword()}
              >
                {t('forms.password-management.generate_password')}
              </button>
            )}
          </div>
          <div className="sm:w-2/5">
            <PasswordValidation password={watch('newPassword')} />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center">
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
