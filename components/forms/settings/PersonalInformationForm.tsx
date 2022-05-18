import * as Sentry from '@sentry/nextjs';
import { getSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mutate } from 'swr';

import config from '../../../config';
import appState, { appUser } from '../../../lib/appState';
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
  const [submitError, setSubmitError] = useState({ type: '' });
  const [successMessage, setSuccessMessage] = useState<string>('');

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

      if (!json.ok) {
        setSubmitError({ type: json.error });
        return reset(currentUserValues);
      }

      if (json.ok) {
        setSuccessMessage('USER_UPDATED');
        setCurrentUser({ ...user, ...json.data });
        mutate('/api/user');
        // this might be used to update the session user - might be needed for email updates
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
                  {...register('fullName')}
                  label={t('forms.personal.name')}
                  className={formClassName}
                />
                {errors.fullName && (
                  <ErrorMessage text={`${t(FULL_NAME_REQUIRED)}`} />
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <Input
                  {...register('email', { pattern: VALID_EMAIL })}
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
            {submitError.type === GENERIC_API_ERROR && (
              <ErrorMessage text={t(GENERIC_API_ERROR)} />
            )}
            {successMessage === 'USER_UPDATED' && (
              <SuccessMessage text={t('forms.personal.update_name')} />
            )}
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
