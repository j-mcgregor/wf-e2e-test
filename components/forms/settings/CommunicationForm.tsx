import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CheckboxInput from '../../elements/Checkbox';
import { SettingsSectionHeader } from '../../elements/Headers';
import { useTranslations } from 'next-intl';
import ErrorMessage from '../../elements/ErrorMessage';

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
  // eslint-disable-next-line no-console
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
              {t('Change or update your personal information')}
            </p>
          </div>

          <fieldset>
            <legend className="text-base font-medium text-gray-900">
              {t('By Email')}
            </legend>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <CheckboxInput
                  label={t('Batch report completion')}
                  id={'comments'}
                  paragraph={t(
                    'Get notified when a batch report has completed all reports.'
                  )}
                  {...{ ...register('comments') }}
                  name={'comments'}
                />
                {errors.comments && (
                  <ErrorMessage text={`${t('errors.comments')}`} />
                )}
              </div>
              <div className="flex items-center">
                <CheckboxInput
                  label={t('Service Updates')}
                  id={'candidates'}
                  paragraph={t(
                    'Get the latest updates on the Wiserfunding platform.'
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
                  label={t('Company Updates')}
                  id={'offers'}
                  paragraph={t(
                    'Get all the latest updates relating to Wiserfunding.'
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
          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="bg-indigo-600 border border-transparent
                        rounded-none shadow-sm py-2 px-4 inline-flex justify-center
                        text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-indigo-600"
          >
            {t('Save')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommunicationForm;
