import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSettingsNavItemsProps } from '../../../hooks/useNavigation';
import { validEmailRegex } from '../../../lib/regexes';
import Input from '../../elements/Input';
import Select from '../../elements/Select';
import {
  companyNameProps,
  postcodeProps,
  stateProps,
  cityProps,
  streetAddressProps,
  countryProps,
  coHeadquartLocationProps,
  emailProps,
  lastNameProps,
  firstNameProps
} from './settingsData/personalInformationInputProps';

interface PersonalInformationProps {
  headings: useSettingsNavItemsProps[];
}

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
  coHeadquartLocation: string;
}

const PersonalInformationForm: FC<PersonalInformationProps> = ({
  headings
}) => {
  const { register, handleSubmit, formState } =
    useForm<PersonalInformationFormInput>();
  const { isDirty, isValid } = formState;
  const onSubmit: SubmitHandler<PersonalInformationFormInput> = data =>
    // eslint-disable-next-line no-console
    console.log({ data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
              {headings[0]['title']}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Change or update your personal information
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                key={'firstName'}
                {...register('firstName')}
                {...firstNameProps}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input
                key={'lastName'}
                {...register('lastName')}
                {...lastNameProps}
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <Input
                {...register('email', { pattern: validEmailRegex })}
                {...emailProps}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select {...register('country')} {...countryProps} />
            </div>

            <div className="col-span-6">
              <Input {...register('streetAddress')} {...streetAddressProps} />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input {...register('city')} {...cityProps} />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input {...register('state')} {...stateProps} />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input {...register('postcode')} {...postcodeProps} />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input {...register('companyName')} {...companyNameProps} />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
              <Select
                {...register('coHeadquartLocation')}
                {...coHeadquartLocationProps}
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="bg-alt border border-transparent rounded-none
                        shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium
                        text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformationForm;
