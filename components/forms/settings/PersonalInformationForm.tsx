import * as Sentry from '@sentry/nextjs';
import { getSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mutate } from 'swr';

import config from '../../../config';
import { useToast } from '../../../hooks/useToast';
import appState, { appUser } from '../../../lib/appState';
import { fetchMockData } from '../../../lib/mock-data/helpers';
import {
  EMAIL_REQUIRED,
  FULL_NAME_REQUIRED,
  GENERIC_API_ERROR
} from '../../../lib/utils/error-codes';
import { VALID_EMAIL } from '../../../lib/utils/regexes';
import { FormWithClassProps } from '../../../pages/settings';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import { SettingsSectionHeader } from '../../elements/Headers';
import Input from '../../elements/Input';
import SuccessMessage from '../../elements/SuccessMessage';

interface PersonalInformationFormInput {
  fullName: string;
  email: string;
}

const PersonalInformationForm = ({
  formClassName,
  formLabelClassName
}: FormWithClassProps) => {
  const { user } = useRecoilValue(appState);
  const setCurrentUser = useSetRecoilState(appUser);
  const t = useTranslations();

  const { triggerToast, getToastTextFromResponse } = useToast();

  const currentUserValues = {
    fullName: user?.full_name,
    email: user?.email
  };

  // Initiate the form
  const { register, handleSubmit, formState, reset } =
    useForm<PersonalInformationFormInput>({
      defaultValues: currentUserValues
    });

  const { isDirty, errors, isSubmitting } = formState;

  useEffect(() => {
    reset(currentUserValues);
  }, [user]);

  // @ts-ignore
  const onSubmit: SubmitHandler = async (
    data: PersonalInformationFormInput
  ) => {
    try {
      const fetchRes = await fetch(`${config.URL}/api/user?id=${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          full_name: data.fullName?.trim()
        })
      });

      const json = await fetchRes.json();

      // const json = await fetchMockData(400, 'USER', 'USER_400')();

      if (!json.ok) {
        const toastText = getToastTextFromResponse(json);

        toastText &&
          triggerToast({
            title: toastText.title,
            description: toastText.description,
            status: json.status
          });

        return reset(currentUserValues);
      }

      if (json.ok) {
        setCurrentUser({ ...user, ...json.data });
        mutate('/api/user');
        // this might be used to update the session user - might be needed for email updates

        triggerToast({
          title: t(`USER.USER_UPDATED.title`),
          description: t(`USER.USER_UPDATED.description`, {
            section: t('personal_information')
          }),
          status: json.status
        });

        return await getSession();
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
        scope.setTag('location', 'form-personal-information');
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <SettingsSectionHeader text={t('personal_information')} />
              <p className="mt-1 text-sm text-gray-500">
                {t('forms.personal.update_your_personal')}
              </p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  {...register('fullName', { required: true })}
                  label={t('forms.personal.name')}
                  className={formClassName}
                />
                {errors.fullName && (
                  <ErrorMessage text={`${t(FULL_NAME_REQUIRED)}`} />
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <Input
                  {...register('email', {
                    pattern: VALID_EMAIL,
                    required: true
                  })}
                  type="email"
                  disabled={true}
                  label={t('forms.personal.email_address')}
                  className={`${formClassName} !bg-gray-200`}
                  labelClassName={formLabelClassName}
                />

                {errors.email && <ErrorMessage text={`${t(EMAIL_REQUIRED)}`} />}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center">
            <Button
              disabled={!isDirty || isSubmitting}
              loading={isSubmitting}
              type="submit"
              variant="primary"
              className="max-w-[150px] ml-auto"
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </form>
    </Sentry.ErrorBoundary>
  );
};

export default PersonalInformationForm;
