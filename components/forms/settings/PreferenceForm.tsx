import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SettingsSectionHeader } from '../../elements/Headers';
import Select from '../../elements/Select';
import { useTranslations } from 'next-intl';

import {
  localisationProps,
  currencyProps,
  loginScreenProps,
  reportingProps
} from './settingsData/SpecialistsInputProps';
import ErrorMessage from '../../elements/ErrorMessage';
import Button from '../../elements/Button';

interface PreferenceFormInput {
  localisation: string;
  reporting: string;
  currency: string;
  loginScreen: string;
}

const PreferenceForm = () => {
  const t = useTranslations();

  const { register, handleSubmit, formState } = useForm<PreferenceFormInput>();
  const { isDirty, isValid, errors } = formState;
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<PreferenceFormInput> = data =>
    // eslint-disable-next-line no-console
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <div>
              <SettingsSectionHeader text={t('preferences')} />

              <p className="mt-1 text-sm text-gray-500">
                {`${t('forms.preference.change your base')}`}
              </p>
            </div>
          </div>
          {/*#localisation*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('localisation')} {...localisationProps(t)}>
                {errors.localisation && (
                  <ErrorMessage text={`${t('errors.localisation')}`} />
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.set your language')}
                </p>
              </Select>
            </div>
          </div>
          {/*#reporting*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('reporting')} {...reportingProps(t)}>
                {errors.reporting && (
                  <ErrorMessage text={`${t('errors.reporting')}`} />
                )}

                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.change your default country')}
                </p>
              </Select>
            </div>
            {/*#currency*/}
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('currency')} {...currencyProps(t)}>
                {errors.currency && (
                  <ErrorMessage text={`${t('errors.currency')}`} />
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.change the default reporting')}
                </p>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('loginScreen')} {...loginScreenProps(t)}>
                {errors.loginScreen && (
                  <ErrorMessage text={`${t('errors.loginScreen')}`} />
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.change the screen')}
                </p>
              </Select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {/*FIXME: need to implement the reset functionality here*/}
          {/*<button*/}
          {/*  type="submit"*/}
          {/*  className="bg rounded-none border-2 border-current mr-4*/}
          {/*                  rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium*/}
          {/*                  text-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
          {/*>*/}
          {/*  {t('forms.preference.reset to defaults')}*/}
          {/*</button>*/}
          <div className="flex">
            <Button
              disabled={!isDirty || !isValid}
              type="submit"
              variant="primary"
              className="max-w-[150px] ml-auto"
            >
              {t('forms.preference.reset to defaults')}
            </Button>
            <Button
              disabled={!isDirty || !isValid}
              type="submit"
              variant="primary"
              className="max-w-[150px] ml-3"
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PreferenceForm;
