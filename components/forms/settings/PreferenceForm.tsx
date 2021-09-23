import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SettingsSectionHeader } from '../../elements/Headers';
import Select from '../../elements/Select';
import { useTranslations } from 'next-intl';

import Button from '../../elements/Button';
import localisationJSON from '../../../lib/data/localisation.json';
import {
  RecoilValueReadOnly,
  selector,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import appState from '../../../lib/appState';

interface PreferenceFormInput {
  localisation: string;
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
    'sme calc',
    'sme prospector'
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

interface thing {
  localisation: string;
  default_currency: string;
  default_login_screen: string;
  default_reporting_country: string;
}

const PreferenceForm = () => {
  const currentUser: RecoilValueReadOnly<thing | undefined> = selector({
    key: 'currentUserContactInfoState',
    get: ({ get }) => {
      const user = get(appState).user;
      // @ts-ignore
      return user.preferences.default_screen;
    }
  });
  const currentUserPrefsInfo = useRecoilValue(currentUser);
  // const test = useRecoilValue(appState);
  const setCurrentUserPrefsInfo = useSetRecoilState(appState);
  //====================== translate ========================

  const t = useTranslations();

  const { register, handleSubmit, formState, reset } =
    useForm<PreferenceFormInput>({
      defaultValues: {
        localisation: currentUserPrefsInfo?.localisation,
        currency: currentUserPrefsInfo?.default_currency,
        reporting: currentUserPrefsInfo?.default_reporting_country,
        loginScreen: currentUserPrefsInfo?.default_login_screen
      }
    });
  const { isDirty, isValid } = formState;

  //====================== form ========================

  const onSubmit: SubmitHandler<PreferenceFormInput> = data => {
    // eslint-disable-next-line no-console
    console.log({ data });
    // @ts-ignore
    setCurrentUserPrefsInfo(curr => {
      return { ...curr, user: { preferences: data } };
    });
  };

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
              <Select
                {...register('localisation')}
                options={getLocalisation()}
                label={t('forms.preference.localisation')}
                name={'localisation'}
                labelClassName={formLabelClassName}
                className={formClassName}
              >
                <p className="mt-1 text-sm text-gray-500">
                  {t('forms.preference.set your language')}
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
                  {t('forms.preference.change your default country')}
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
                  {t('forms.preference.change the default reporting')}
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
                  {t('forms.preference.change the screen')}
                </p>
              </Select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {/*FIXME: need to implement the reset functionality here*/}

          <div className="flex">
            <Button
              onClick={() => reset()}
              disabled={!isDirty || !isValid}
              type="submit"
              variant="primary"
              className="max-w-[150px] ml-auto"
            >
              {t('forms.preference.reset to defaults')}
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
