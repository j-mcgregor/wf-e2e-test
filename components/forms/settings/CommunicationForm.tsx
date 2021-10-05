import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CheckboxInput from '../../elements/Checkbox';
import { SettingsSectionHeader } from '../../elements/Headers';
import { useTranslations } from 'next-intl';
import Button from '../../elements/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import appState from '../../../lib/appState';

interface CommunicationFormInput {
  comments: boolean;
  candidates: boolean;
  offers: boolean;
}

//====================== COMPONENT ========================

const CommunicationForm = () => {
  const { user } = useRecoilValue(appState);
  const setCurrentUserCommsInfo = useSetRecoilState(appState);

  //====================== translate ========================

  const t = useTranslations();

  //====================== form ========================

  const { register, handleSubmit, formState, setValue } =
    useForm<CommunicationFormInput>({
      defaultValues: user?.preferences?.communication
    });

  const _offers = user?.preferences?.communication?.offers || false;
  const _candidates = user?.preferences?.communication?.candidates || false;
  const _comments = user?.preferences?.communication?.comments || false;

  React.useEffect(() => {
    setValue('offers', _offers);
    setValue('candidates', _candidates);
    setValue('comments', _comments);
  }, [user]);

  const { isDirty } = formState;
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
                  id={'comments'}
                  paragraph={t('forms.communication-form.get_notified')}
                  {...{ ...register('comments') }}
                  name={'comments'}
                />
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.service_updates')}
                  id={'candidates'}
                  paragraph={t(
                    'forms.communication-form.get_the_latest_updates_on'
                  )}
                  {...{ ...register('candidates') }}
                  name={'candidates'}
                />
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.company_updates')}
                  id={'offers'}
                  paragraph={t(
                    'forms.communication-form.get_all_the_latest_updates_relating'
                  )}
                  {...{ ...register('offers') }}
                  name={'offers'}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            disabled={!isDirty}
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
