import * as Sentry from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { mutate } from 'swr';

import config from '../../../config';
import { useToast } from '../../../hooks/useToast';
import appState, { appUser } from '../../../lib/appState';
import { GENERIC_API_ERROR } from '../../../lib/utils/error-codes';
import Button from '../../elements/Button';
import CheckboxInput from '../../elements/Checkbox';
import ErrorMessage from '../../elements/ErrorMessage';
import { SettingsSectionHeader } from '../../elements/Headers';
import SuccessMessage from '../../elements/SuccessMessage';

interface CommunicationFormInput {
  batch_report_email: boolean;
  service_updates: boolean;
  company_updates: boolean;
}

//====================== COMPONENT ========================

const CommunicationForm = () => {
  const { user } = useRecoilValue(appState);

  const t = useTranslations();

  const { register, handleSubmit, formState, setValue, reset } =
    useForm<CommunicationFormInput>({
      defaultValues: user?.preferences?.communication
    });

  const { isDirty, isSubmitting } = formState;

  const { triggerToast, getToastTextFromResponse } = useToast();

  const onSubmit: SubmitHandler<CommunicationFormInput> = async data => {
    try {
      const fetchRes = await fetch(`${config.URL}/api/user?id=${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...user,
          preferences: {
            ...user?.preferences,
            communication: {
              service_updates: data?.service_updates,
              batch_report_email: data?.batch_report_email,
              company_updates: data?.company_updates
            }
          }
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
        mutate('/api/user');

        triggerToast({
          title: t(`USER.USER_UPDATED.title`),
          description: t(`USER.USER_UPDATED.description`, {
            section: `${t('communication').toLowerCase()}  ${t(
              'preferences'
            ).toLowerCase()}`
          }),
          status: json.status
        });
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  // restore to user defaults
  React.useEffect(() => {
    reset(user?.preferences?.communication);
  }, [user]);

  return (
    <Sentry.ErrorBoundary
      showDialog
      fallback={<ErrorMessage text={t(GENERIC_API_ERROR)} />}
      beforeCapture={scope => {
        scope.setTag('location', 'form-communication');
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <SettingsSectionHeader text={t('communication')} />
              <p className="mt-1 text-sm text-gray-500">
                {t('forms.communication-form.change_or_update')}
              </p>
            </div>

            <fieldset>
              <legend className="text-base font-medium text-gray-900">
                {t('forms.communication-form.by_email')}
              </legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <CheckboxInput
                    label={t('forms.communication-form.batch_report')}
                    id={'batch_report_email'}
                    paragraph={t('forms.communication-form.get_notified')}
                    {...register('batch_report_email')}
                  />
                </div>
                <div className="flex items-center">
                  <CheckboxInput
                    label={t('forms.communication-form.service_updates')}
                    id={'service_update'}
                    paragraph={t(
                      'forms.communication-form.get_the_latest_updates_on'
                    )}
                    {...register('service_updates')}
                  />
                </div>
                <div className="flex items-center">
                  <CheckboxInput
                    label={t('forms.communication-form.company_updates')}
                    id={'company_updates'}
                    paragraph={t(
                      'forms.communication-form.get_all_the_latest_updates_relating'
                    )}
                    {...register('company_updates')}
                  />
                </div>
              </div>
            </fieldset>
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

export default CommunicationForm;
