import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import appState from '../../../lib/appState';
import { validEmailRegex } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import ErrorMessage from '../../elements/ErrorMessage';
import { SettingsSectionHeader } from '../../elements/Headers';
import Input from '../../elements/Input';
import {
  EMAIL_REQUIRED,
  FULL_NAME_REQUIRED
} from '../../../lib/utils/error-codes';
import SettingsSettings from '../../../lib/settings/settings.settings';
import { FormWithClassProps } from '../../../pages/settings';

interface PersonalInformationFormInput {
  fullName: string;
  email: string;
}

const PersonalInformationForm = ({
  formClassName,
  formLabelClassName
}: FormWithClassProps) => {
  const { user } = useRecoilValue(appState);

  const setCurrentUserContactInfo = useSetRecoilState(appState);
  const contactInfo = user?.contact_information;
  const t = useTranslations();
  console.log('BELOW T:', { user });
  const currentUserValues = {
    full_name: contactInfo?.full_name,
    email: user?.email
  };
  const { register, handleSubmit, formState, reset } =
    useForm<PersonalInformationFormInput>({
      defaultValues: currentUserValues
    });

  React.useEffect(() => {
    reset(currentUserValues);
  }, [user]);
  const { isDirty, errors } = formState;

  // @ts-ignore
  const onSubmit: SubmitHandler = async (
    data: PersonalInformationFormInput
  ) => {
    // const updatedData = {
    //   full_name: data.fullName
    // };
    console.log('INSIDE SUBMIT, ABOVE SETCURRENT:', {
      data,
      fullName: data.fullName
    });
    setCurrentUserContactInfo((curr: { user: any }) => {
      console.log('INSIDE SUBMIT, UNDER SETCURRENT:', { ...curr.user });

      return {
        ...curr,
        user: {
          ...curr.user,
          // contact_information: updatedData,
          full_name: data.fullName,
          email: data.email
        }
      };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <SettingsSectionHeader text={t('personal_information')} />
            <p className="mt-1 text-sm text-gray-500">
              {t('forms.personal.update_your_personal')}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                {...register('fullName')}
                label={t('forms.personal.name')}
                className={formClassName}
              />
              {errors.fullName && (
                <ErrorMessage text={`${t(FULL_NAME_REQUIRED)}`} />
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <Input
                {...register('email', { pattern: validEmailRegex })}
                type="email"
                label={t('forms.personal.email_address')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />

              {errors.email && <ErrorMessage text={`${t(EMAIL_REQUIRED)}`} />}
            </div>
          </div>
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

export default PersonalInformationForm;
