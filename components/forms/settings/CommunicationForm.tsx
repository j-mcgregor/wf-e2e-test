import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CheckboxInput from '../../elements/Checkbox';
import { SettingsSectionHeader } from '../../elements/Headers';
import { useTranslations } from 'next-intl';
import ErrorMessage from '../../elements/ErrorMessage';
import Button from '../../elements/Button';

interface CommunicationFormInput {
  comments: string;
  candidates: string;
  offers: string;
}

const CommunicationForm = () => {
  const t = useTranslations();

  const { register, handleSubmit, formState } =
    useForm<CommunicationFormInput>();
  const { isDirty, isValid, errors } = formState;
  const onSubmit: SubmitHandler<CommunicationFormInput> = data =>
    // eslint-disable-next-line no-console
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <SettingsSectionHeader text={t('communication')} />
            <p className="mt-1 text-sm text-gray-500">
              {t('forms.communication-form.change or update')}
            </p>
          </div>

          <fieldset>
            <legend className="text-base font-medium text-gray-900">
              {t('forms.communication-form.by email')}
            </legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.batch report')}
                  id={'comments'}
                  paragraph={t('forms.communication-form.get notified')}
                  {...{ ...register('comments') }}
                  name={'comments'}
                />
                {errors.comments && (
                  <ErrorMessage text={`${t('errors.comments')}`} />
                )}
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.service updates')}
                  id={'candidates'}
                  paragraph={t(
                    'forms.communication-form.get the latest updates on'
                  )}
                  {...{ ...register('candidates') }}
                  name={'candidates'}
                />
                {errors.candidates && (
                  <ErrorMessage text={`${t('errors.candidates')}`} />
                )}
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('forms.communication-form.company updates')}
                  id={'offers'}
                  paragraph={t(
                    'forms.communication-form.get all the latest updates relating'
                  )}
                  {...{ ...register('offers') }}
                  name={'offers'}
                />
                {errors.offers && (
                  <ErrorMessage text={`${t('errors.offers')}`} />
                )}
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
