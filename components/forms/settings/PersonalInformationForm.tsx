import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { validEmailRegex } from '../../../lib/regexes';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Select from '../../elements/Select';
import countryJSON from '../../../lib/country_currency.json';

interface PersonalInformationProps {
  heading: string;
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
  companyHQLocation: string;
}

const formClassName =
  'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const formLabelClassName = 'block text-sm font-medium text-gray-700';

const countries = countryJSON.map(value => {
  return { optionValue: value.CountryName };
});

const PersonalInformationForm: FC<PersonalInformationProps> = ({ heading }) => {
  
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
            {heading && (
              <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
                {heading}
              </h3>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Change or update your personal information
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Input
                {...register('firstName')}
                label="First name"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Input
                {...register('lastName')}
                label="Last name"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <Input
                {...register('email', { pattern: validEmailRegex })}
                type="email"
                label="Email address"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Select
                {...register('country')}
                label="Country / Region"
                options={countries}
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6">
              <Input
                {...register('streetAddress')}
                label="Street Address"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                {...register('city')}
                label="City"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                {...register('state')}
                label="State / Province"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Input
                {...register('postcode')}
                label="Zip / Postcode"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <Input
                {...register('companyName')}
                label="Company Name"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
              <Select
                {...register('companyHQLocation')}
                options={countries}
                label="Company Headquarters Location"
                className={formClassName}
                labelClassName={formLabelClassName}
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            disabled={!isDirty || !isValid}
            type="submit"
            variant="primary"
            className="max-w-[150px] ml-auto"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformationForm;
