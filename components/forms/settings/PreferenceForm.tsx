import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SettingsSectionHeader } from '../../elements/Headers';
import Select from '../../elements/Select';
import { useTranslations } from 'next-intl';

import Button from '../../elements/Button';
import localisationJSON from '../../../lib/data/localisation.json';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import appState from '../../../lib/appState';
import { useEffect, useState } from 'react';

interface PreferenceFormInput {
  locale: string;
  reporting: string;
  currency: string;
  loginScreen: string;
}

const getLocalisation = () =>
  localisationJSON.map(value => {
    return { optionValue: value.locale };
  });

const formLabelClassName = 'block text-sm font-medium text-gray-700';

const formClassName =
  'mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 ' +
  'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const options = (t: any) => {
  const dashboardOptionsValues = [
    'dashboard',
    'reports',
    'sme_calc',
    'sme_prospector'
  ];
  return dashboardOptionsValues.map((name, nameIndex) => {
    return {
      optionName: t(
        'forms.specialist-props.' +
          //checks type, prevents any sort of injection, takes index as string, then parses it to a number.
          dashboardOptionsValues[parseInt(String(nameIndex))]
      ),
      optionValue: name
    };
  });
};

//====================== COMPONENT ========================

const PreferenceForm = () => {
  const { user } = useRecoilValue(appState);
  const setCurrentUserPrefs = useSetRecoilState(appState);
  const [submittedData, setSubmittedData] = useState();
  //====================== translate ========================

  const t = useTranslations();

  const prefDefaults = {
    locale: 'English GB',
    currency: 'GBP',
    loginScreen: 'English GB',
    reporting: 'dashboard'
  };
  const currentValues = {
    locale: user?.preferences.localisation,
    currency: user?.preferences.default_currency,
    loginScreen: user?.preferences.default_login_screen,
    reporting: user?.preferences.default_reporting_country
  };

  const initialValues = () => {
    if (currentValues !== prefDefaults) {
      return currentValues;
    } else {
      return prefDefaults;
    }
  };
  const { register, handleSubmit, formState, reset } =
    // @ts-ignore
    useForm<PreferenceFormInput>(initialValues());
  const { isDirty, isValid } = formState;

  //====================== form ========================
  const onSubmit: SubmitHandler<PreferenceFormInput> = data => {
    // @ts-ignore
    setCurrentUserPrefs(currentUser => {
      const {
        locale: localisation,
        currency: default_currency,
        loginScreen: default_login_screen,
        reporting: default_reporting_country
      } = data;

      // @ts-ignore
      setSubmittedData(data);
      const newPrefs = {
        localisation,
        default_currency,
        default_login_screen,
        default_reporting_country
      };
      return {
        ...currentUser,
        user: {
          ...currentUser.user,
          preferences: newPrefs,
          ...currentUser.user?.preferences?.communication
        }
      };
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(submittedData, {
        keepDirty: false,
        keepDefaultValues: true
      });
    }
  }, [formState, submittedData, reset]);

  const userTest = 'test@test.com';

  const ResetToDefault = () => {
    const dirty = currentValues !== prefDefaults;

    return (
      <Button
        onClick={() => reset(undefined, { keepDefaultValues: true })}
        disabled={!dirty || !isValid}
        type="submit"
        variant="primary"
        className="max-w-[150px] ml-auto"
      >
        {t('forms.preference.reset_to_defaults')}
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <div>
              <SettingsSectionHeader text={t('preferences')} />
              <p className="mt-1 text-sm text-gray-500">
                {`${t('forms.preference.change_your_base')}`}
              </p>
            </div>
          </div>
          {/*#localisation*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('locale')}
                options={getLocalisation()}
                label={t('forms.preference.localisation')}
                name={'reporting'}
                labelClassName={formLabelClassName}
                className={formClassName}
              >
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.set_your_language')}
                </p>
              </Select>
            </div>
          </div>
          {/*#reporting*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('reporting')}
                options={getLocalisation()}
                label={t('forms.preference.reporting')}
                name={'reporting'}
                labelClassName={formLabelClassName}
                className={formClassName}
              >
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.change_your_default_country')}
                </p>
              </Select>
            </div>
            {/*#currency*/}
            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('currency')}
                options={getLocalisation()}
                label={t('forms.preference.currency')}
                name={'currency'}
                labelClassName={formLabelClassName}
                className={formClassName}
              >
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.change_the_default_reporting')}
                </p>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('loginScreen')}
                options={options(t)}
                label={t('forms.preference.loginScreen')}
                name={'loginScreen'}
                labelClassName={formLabelClassName}
                className={formClassName}
              >
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.change_the_screen')}
                </p>
              </Select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {/*FIXME: need to implement the reset functionality here*/}

          <div className="flex">
            <ResetToDefault />
            <Button
              disabled={!isDirty}
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
