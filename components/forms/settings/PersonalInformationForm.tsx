import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSettingsNavItemsProps } from '../../../hooks/useNavigation';
import { validEmailRegex } from '../../../lib/regexes';
import HashHeader from '../../elements/HashHeader';
import Input from '../../elements/Input';
import Select from '../../elements/Select';

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
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<PersonalInformationFormInput> = data =>
    // eslint-disable-next-line no-console
    console.log({ data });

  const firstNameProps = {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    // eslint-disable-next-line sonarjs/no-duplicate-string
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      // eslint-disable-next-line sonarjs/no-duplicate-string
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const lastNameProps = {
    label: 'Last name',
    name: 'firstName',
    type: 'text',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const emailProps = {
    label: 'Email address',
    name: 'email',
    type: 'email',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const coHeadquartLocationProps = {
    options: [
      { optionValue: 'unitedStates', optionName: 'United States' },
      { optionValue: 'canada', optionName: 'Canada' }
    ],
    label: 'Company Headquarters Location',
    name: 'coHeadquartLocation',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const countryProps = {
    options: [
      { optionValue: 'unitedStates', optionName: 'United States' },
      { optionValue: 'canada', optionName: 'Canada' }
    ],
    label: 'Country / Region',
    name: 'country',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };

  const streetAddressProps = {
    label: 'Street Address',
    name: 'streetAddress',
    type: 'text',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const cityProps = {
    label: 'City',
    name: 'city',
    type: 'text',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const stateProps = {
    label: 'State/ Province',
    name: 'state',
    type: 'text',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const postcodeProps = {
    label: 'ZIP / Postal',
    name: 'postcode',
    type: 'text',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };
  const companyNameProps = {
    label: 'Company Name',
    name: 'companyName',
    type: 'text',
    labelClassName: 'block text-sm font-medium text-gray-700',
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <HashHeader
              text={headings[0]['title']}
              classname={'text-lg leading-6 font-medium text-gray-900'}
            />
            <p className="mt-1 text-sm text-gray-500">
              Change or update your personal information
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input {...register('firstName')} {...firstNameProps} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Input {...register('lastName')} {...lastNameProps} />
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
