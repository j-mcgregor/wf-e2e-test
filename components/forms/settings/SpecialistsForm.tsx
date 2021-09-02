import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SpecialistsFormInput {
  localisation: string;
  reporting: string;
  currency: string;
  loginScreen: string;
}

const SpecialistsForm = () => {
  const { register, handleSubmit } = useForm<SpecialistsFormInput>();
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<SpecialistsFormInput> = data =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
              Specialists
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Change base preferences.
            </p>
          </div>
          {/*#localisation*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="localisation"
                className="block text-sm font-medium text-gray-700"
              >
                Localisation
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Set your language preferences.
              </p>
              <select
                {...register('localisation')}
                id="localisation"
                name="localisation"
                autoComplete="localisation"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={'english(uK)'}>English(UK)</option>
                <option value={'english(uS)'}>English(US)</option>
                <option value={'mexican'}>Mexican</option>
              </select>
            </div>
          </div>
          {/*#reporting*/}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="reporting"
                className="block text-sm font-medium text-gray-700"
              >
                Default reporting country
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Change your default country to run your reports in.
              </p>
              <select
                {...register('reporting')}
                id="reporting"
                name="reporting"
                autoComplete="reporting"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={'unitedKingdom'}>United Kingdom</option>
                <option value={'uS'}>US</option>
                <option value={'mexico'}>Mexico</option>
              </select>
            </div>
            {/*#currency*/}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700"
              >
                Default currency
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Change the default reporting currency.
              </p>

              <select
                {...register('currency')}
                id="currency"
                name="currency"
                autoComplete="currency"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={'unitedKingdom'}>United Kingdom</option>
                <option value={'US'}>US</option>
                <option value={'mexico'}>Mexico</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="localisation"
                className="block text-sm font-medium text-gray-700"
              >
                Default login screen
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Change the screen you see on your first login.
              </p>
              <select
                {...register('loginScreen')}
                id="loginScreen"
                name="loginScreen"
                autoComplete="login-screen"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={'dashboard'}>Dashboard</option>
                <option value={'otherDashboard'}>Other Dashboard</option>
                <option value={'differentDashboard'}>
                  Different Dashboard
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {/*FIXME: need to implement the reset functionality here*/}
          <button
            type="submit"
            className="bg rounded-none border-2 border-current mr-4
                            rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium
                            text-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset to defaults
          </button>
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent
                            rounded-none shadow-sm py-2 px-4 inline-flex justify-center
                            text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default SpecialistsForm;
