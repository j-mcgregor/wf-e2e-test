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
import Select from '../../elements/Select';
import {
  EMAIL_REQUIRED,
  LAST_NAME_REQUIRED,
  FIRST_NAME_REQUIRED
} from '../../../lib/utils/error-codes';
import SettingsSettings from '../../../lib/settings/settings.settings';
import { FormWithClassProps } from '../../../pages/settings';
import HeaderWrapper from '../../elements/HeaderWrapper';

interface PersonalInformationFormInput {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  postcode: string;
  companyName: string;
  companyHQLocation: string;
}

const { supportedCountries } = SettingsSettings;

const PersonalInformationForm = ({
  formClassName,
  formLabelClassName
}: FormWithClassProps) => {
  const { user } = useRecoilValue(appState);

  const setCurrentUserContactInfo = useSetRecoilState(appState);
  const contactInfo = user?.contact_information;

  const t = useTranslations();

  const currentUserValues = {
    firstName: contactInfo?.first_name,
    lastName: contactInfo?.last_name,
    email: user?.email,
    country: contactInfo?.country,
    streetAddress: contactInfo?.street_address,
    city: contactInfo?.city,
    state: contactInfo?.state,
    postcode: contactInfo?.postcode,
    companyName: contactInfo?.company_name,
    companyHQLocation: contactInfo?.company_hq_location
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
    const updatedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      country: data.country,
      street_address: data.streetAddress,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      company_name: data.companyName,
      company_hq_location: data.companyHQLocation
    };

    // @ts-ignore
    setCurrentUserContactInfo(curr => {
      return {
        ...curr,
        user: {
          ...curr.user,
          contact_information: updatedData,
          name: `${data.firstName} ${data.lastName}`,
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
                {...register('firstName')}
                label={t('forms.personal.first_name')}
                className={formClassName}
              />
              {errors.firstName && (
                <ErrorMessage text={`${t(FIRST_NAME_REQUIRED)}`} />
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Input
                {...register('lastName', { required: true })}
                label={t('forms.personal.last_name')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
              {errors.lastName && (
                <ErrorMessage text={`${t(LAST_NAME_REQUIRED)}`} />
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

            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('country')}
                label={t('forms.personal.country')}
                options={supportedCountries}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6">
              <Input
                {...register('streetAddress')}
                label={t('forms.personal.street_address')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                {...register('city')}
                label={t('forms.personal.city')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                {...register('state')}
                label={t('forms.personal.state')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                {...register('postcode')}
                label={t('forms.personal.postcode')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                {...register('companyName')}
                label={t('forms.personal.company_name')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
              <Select
                {...register('companyHQLocation')}
                label={t('forms.personal.company_headquarters')}
                options={supportedCountries}
                className={formClassName}
                placeholder={'Your company headquarters'}
                labelClassName={formLabelClassName}
              />
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
