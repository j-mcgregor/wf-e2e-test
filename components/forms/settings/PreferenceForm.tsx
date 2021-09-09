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

interface PreferenceFormInput {
  localisation: string;
  reporting: string;
  currency: string;
  loginScreen: string;
}

const PreferenceForm = () => {

  const t = useTranslations()

  const { register, handleSubmit, formState } = useForm<PreferenceFormInput>();
  const { isDirty, isValid } = formState;
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
            <SettingsSectionHeader text={t('preferences')}/>

              <p className="mt-1 text-sm text-gray-500">
                Change or update your personal information
              </p>
            </div>
          </div>
          {/*#localisation*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('localisation')} {...localisationProps}>
                <p className="mt-1 text-sm text-gray-500">
                  Set your language preferences.
                </p>
              </Select>
            </div>
          </div>
          {/*#reporting*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('reporting')} {...reportingProps}>
                <p className="mt-1 text-sm text-gray-500">
                  Change your default country to run your reports in.
                </p>
              </Select>
            </div>
            {/*#currency*/}
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('currency')} {...currencyProps}>
                <p className="mt-1 text-sm text-gray-500">
                  Change the default reporting currency.
                </p>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('loginScreen')} {...loginScreenProps}>
                <p className="mt-1 text-sm text-gray-500">
                  Change the screen you see on your first login.
                </p>
              </Select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {/*FIXME: need to implement the reset functionality here*/}
          <button
            type="submit"
            className="bg rounded-none border-2 border-current mr-4
                            rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium
                            text-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset to defaults
          </button>
          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="bg-indigo-600 border border-transparent
                            rounded-none shadow-sm py-2 px-4 inline-flex justify-center
                            text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PreferenceForm;
