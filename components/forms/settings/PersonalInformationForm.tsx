import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { validEmailRegex } from '../../../lib/regexes';

interface PersonalInformationFormInput {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  postCode: string;
  companyName: string;
  coHeadquartLocation: string;
}

const PersonalInformationForm: FC = () => {
  const { register, handleSubmit } = useForm<PersonalInformationFormInput>();

  // refactored to pass build; same with others
  const onSubmit: SubmitHandler<PersonalInformationFormInput> = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Change or update your personal information
            </p>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                {...register('firstName')}
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                className="mt-1 block w-full border border-gray-300 rounded-md
                                    shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500
                                    focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                {...register('lastName')}
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                className="mt-1 block w-full border border-gray-300 rounded-md
                                    shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                {...register('email', { pattern: validEmailRegex })}
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1 block w-full border border-gray-300
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country / Region
              </label>
              <select
                {...register('country')}
                id="country"
                name="country"
                autoComplete="country"
                className="mt-1 block w-full bg-white border border-gray-300
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="unitedStates">United States</option>
                <option value="canada">Canada</option>
                <option value="mexico">Mexico</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Street address
              </label>
              <input
                {...register('streetAddress')}
                type="text"
                name="streetAddress"
                id="streetAddress"
                autoComplete="street-address"
                className="mt-1 block w-full border border-gray-300
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                {...register('city')}
                type="text"
                name="city"
                id="city"
                className="mt-1 block w-full border border-gray-300
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province
              </label>
              <input
                {...register('state')}
                type="text"
                name="state"
                id="state"
                className="mt-1 block w-full border border-gray-300
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal
              </label>
              <input
                {...register('postCode')}
                type="text"
                name="postCode"
                id="postCode"
                autoComplete="postal-code"
                className="mt-1 block w-full border border-gray-300
                                    rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                {...register('companyName')}
                type="text"
                name="companyName"
                id="companyName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm
                                    py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
              <label
                htmlFor="coHeadquartLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Company Headquarters Location
              </label>
              <select
                {...register('coHeadquartLocation')}
                id="coHeadquartLocation"
                name="coHeadquartLocation"
                autoComplete="company-headquarters-location"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md
                                    shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={'unitedStates'}>United States</option>
                <option value={'canada'}>Canada</option>
                <option value={'mexico'}>Mexico</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
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
