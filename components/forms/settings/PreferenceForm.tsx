import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SettingsSectionHeader } from '../../elements/Headers';
import Select from '../../elements/Select';
import { useTranslations } from 'next-intl';
import { UserType } from '../../../types/global';

import Button from '../../elements/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import appState from '../../../lib/appState';
import { useEffect } from 'react';
import SettingsSettings from '../../../lib/settings/settings.settings';
import { FormWithClassProps } from '../../../pages/settings';

type PreferenceFormInput = {
  locale: string;
  reporting: string;
  currency: string;
  homePage: string;
};

const { preferences, dashboardOptionValues } = SettingsSettings;

const PreferenceForm = ({
  formClassName,
  formLabelClassName
}: FormWithClassProps) => {
  const { user } = useRecoilValue(appState);

  const setCurrentUserPrefs = useSetRecoilState(appState);

  const t = useTranslations();

  const dashboardOptions = React.useMemo(
    () =>
      dashboardOptionValues.map(value => ({
        optionValue: value,
        optionName: t(`forms.specialist-props.${value}`)
      })),
    [t]
  );

  const prefDefaults = {
    locale: preferences.defaults.locale,
    currency: preferences.defaults.currency,
    homePage: preferences.defaults.home_page,
    reporting: preferences.defaults.reporting_country
  };

  const currentUserValues = {
    locale: user?.preferences.defaults.locale,
    currency: user?.preferences.defaults.currency,
    homePage: user?.preferences.defaults.home_page,
    reporting: user?.preferences.defaults.reporting_country
  };

  const { register, handleSubmit, formState, reset, watch } =
    useForm<PreferenceFormInput>({ defaultValues: currentUserValues });

  // form state
  const { isDirty, isValid } = formState;

  const onSubmit: SubmitHandler<PreferenceFormInput> = data => {
    setCurrentUserPrefs((currentUser: { user: UserType }) => {
      return {
        user: {
          ...currentUser.user,
          preferences: {
            defaults: {
              locale: data.locale,
              currency: data.currency,
              home_page: data.homePage,
              reporting_country: data.reporting
            },
            ...currentUser.user?.preferences?.communication
          }
        }
      };
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(currentUserValues, {
        keepDirty: true
      });
    }
  }, [formState, reset]);

  useEffect(() => {
    reset(currentUserValues);
  }, [user]);

  // comparing JS objects must be strings otherwise comparison will always be false
  const shouldAllowReset =
    JSON.stringify(currentUserValues) !== JSON.stringify(prefDefaults);

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
                options={SettingsSettings.supportedLocales}
                label={t('forms.preference.locale')}
                name={'locale'}
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
                options={SettingsSettings.supportedCountries}
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
                options={SettingsSettings.supportedCurrencies}
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
                {...register('homePage')}
                options={dashboardOptions}
                label={t('forms.preference.home_page')}
                name={'homePage'}
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
          <div className="flex">
            <Button
              onClick={() =>
                reset(prefDefaults, {
                  keepDefaultValues: false,
                  keepDirty: true
                })
              }
              disabled={!shouldAllowReset || !isValid}
              type="submit"
              variant="primary"
              className="max-w-[150px] ml-auto"
            >
              {t('forms.preference.reset_to_defaults')}
            </Button>
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
