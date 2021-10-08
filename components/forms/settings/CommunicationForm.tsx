import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CheckboxInput from '../../elements/Checkbox';
import { SettingsSectionHeader } from '../../elements/Headers';
import { useTranslations } from 'next-intl';
import Button from '../../elements/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import appState from '../../../lib/appState';

interface CommunicationFormInput {
  batch_report_email: boolean;
  service_update: boolean;
  company_updates: boolean;
}

//====================== COMPONENT ========================

const CommunicationForm = () => {
  const { user } = useRecoilValue(appState);
  const setCurrentUserCommsInfo = useSetRecoilState(appState);

  //====================== translate ========================

  const t = useTranslations();

  //====================== form ========================

  const { register, handleSubmit, formState, setValue, reset } =
    useForm<CommunicationFormInput>({
      defaultValues: user?.preferences?.communication
    });

  const _company_updates =
    user?.preferences?.communication?.company_updates || false;
  const _service_update =
    user?.preferences?.communication?.service_update || false;
  const _batch_report_email =
    user?.preferences?.communication?.batch_report_email || false;

  React.useEffect(() => {
    setValue('company_updates', _company_updates);
    setValue('service_update', _service_update);
    setValue('batch_report_email', _batch_report_email);
  }, [user]);

  const { isDirty, isSubmitting } = formState;
  const onSubmit: SubmitHandler<CommunicationFormInput> = data => {
    // eslint-disable-next-line no-console
    // console.log({ data });
    // @ts-ignore
    setCurrentUserCommsInfo(curr => {
      return {
        ...curr,
        user: {
          ...curr.user,
          preferences: {
            ...curr.user?.preferences,
            communication: data
          }
        }
      };
    });
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(user.preferences.communication, {
        keepDirty: false,
        keepDefaultValues: true
      });
    }
  }, [formState, reset]);

  // console.log({ user });

  return (
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
                  {...{ ...register('batch_report_email') }}
                  name={'batch_report_email'}
                />
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.service_updates')}
                  id={'service_update'}
                  paragraph={t(
                    'forms.communication-form.get_the_latest_updates_on'
                  )}
                  {...{ ...register('service_update') }}
                  name={'service_update'}
                />
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.company_updates')}
                  id={'company_updates'}
                  paragraph={t(
                    'forms.communication-form.get_all_the_latest_updates_relating'
                  )}
                  {...{ ...register('company_updates') }}
                  name={'company_updates'}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            disabled={!isDirty}
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
  );
};

export default CommunicationForm;
