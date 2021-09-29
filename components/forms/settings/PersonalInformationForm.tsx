import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { validEmailRegex } from '../../../lib/utils/regexes';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Select from '../../elements/Select';
import countryJSON from '../../../lib/data/country_currency.json';
import ErrorMessage from '../../elements/ErrorMessage';
import { useTranslations } from 'next-intl';
import { SettingsSectionHeader } from '../../elements/Headers';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import appState from '../../../lib/appState';

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

const formClassName =
  'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const formLabelClassName = 'block text-sm font-medium text-gray-700';

const countries = countryJSON.map(value => {
  return { optionValue: value.CountryName };
});

//====================== COMPONENT ========================
const PersonalInformationForm = () => {
  const { user } = useRecoilValue(appState);
  const setCurrentUserContactInfo = useSetRecoilState(appState);
  const contactInfo = user?.contact_information;

  //====================== translate ========================
  const t = useTranslations();

  //====================== form ========================
  const { register, handleSubmit, formState, setValue } =
    useForm<PersonalInformationFormInput>({
      defaultValues: {
        firstName: contactInfo?.first_name,
        lastName: contactInfo?.last_name,
        email: contactInfo?.email,
        country: contactInfo?.country,
        streetAddress: contactInfo?.street_address,
        city: contactInfo?.city,
        state: contactInfo?.state,
        postcode: contactInfo?.postcode,
        companyName: contactInfo?.company_name,
        companyHQLocation: contactInfo?.company_HQ_location
      }
    });

  const first_name = contactInfo?.first_name || '';
  const _email = contactInfo?.email || '';
  const last_name = contactInfo?.last_name || '';
  const _country = contactInfo?.country || '';
  const street_address = contactInfo?.street_address || '';
  const _city = contactInfo?.city || '';
  const _state = contactInfo?.state || '';
  const _postcode = contactInfo?.postcode || '';
  const company_name = contactInfo?.company_name || '';
  const company_HQ_location = contactInfo?.company_HQ_location || '';

  React.useEffect(() => {
    setValue('firstName', first_name);
    setValue('email', _email);
    setValue('lastName', last_name);
    setValue('country', _country);
    setValue('streetAddress', street_address);
    setValue('city', _city);
    setValue('state', _state);
    setValue('postcode', _postcode);
    setValue('companyName', company_name);
    setValue('companyHQLocation', company_HQ_location);
  }, [user]);

  const { isDirty, errors } = formState;

  // @ts-ignore
  const onSubmit: SubmitHandler = async (
    data: PersonalInformationFormInput
  ) => {
    const updatedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      country: data.country,
      street_address: data.streetAddress,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      company_name: data.companyName,
      company_HQ_Location: data.companyHQLocation
    };

    // @ts-ignore
    setCurrentUserContactInfo(curr => {
      return {
        ...curr,
        user: { ...curr.user, contact_information: updatedData }
      };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <SettingsSectionHeader>
              {t('personal information')}
            </SettingsSectionHeader>
            <p className="mt-1 text-sm text-gray-500">
              {t('forms.personal.update your personal')}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                {...register('firstName')}
                label={t('forms.personal.first name')}
                className={formClassName}
              />
              {errors.firstName && (
                <ErrorMessage text={`${t('errors.first name')}`} />
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Input
                {...register('lastName', { required: true })}
                label={t('forms.personal.last name')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
              {errors.lastName && (
                <ErrorMessage text={`${t('errors.last name')}`} />
              )}
            </div>

            <div className="col-span-6 sm:col-span-4">
              <Input
                {...register('email', { pattern: validEmailRegex })}
                type="email"
                label={t('forms.personal.email address')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
              {errors.email && <ErrorMessage text={`${t('errors.email')}`} />}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('country')}
                label={t('forms.personal.country')}
                options={countries}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6">
              <Input
                {...register('streetAddress')}
                label={t('forms.personal.street address')}
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
                label={t('forms.personal.company name')}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
              <Select
                {...register('companyHQLocation')}
                label={t('forms.personal.company headquarters')}
                options={countries}
                className={formClassName}
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
