import React, { FC } from 'react';

import Button from '../../elements/Button';
import {  useForm } from 'react-hook-form';
import PasswordManagement from './PasswordManagement';

interface PasswordFormProps {
  isSSO: boolean;
}

interface PasswordFormInput {
  newPassword: string;
  confirmPassword: string;
}

const PasswordForm: FC<PasswordFormProps> = ({ isSSO }) => {
  const { register, formState, watch } =
    useForm<PasswordFormInput>();
  const { isDirty, isValid, errors } = formState;

  const onSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <h3 className={'text-lg leading-6 font-medium text-gray-900'}>
            Password
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Handle your authentication details
          </p>
        </div>
        {isSSO ? (
          <>
            <div>
              <p className="mt-1 text-sm font-normal	 text-gray-900">
                Your account is handled by a Single Sign On provider.
              </p>
              <p className="mt-1 text-sm font-normal text-gray-900">
                Please use their account settings to change your details.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                <div className="bg-gray-100 p-8">
                  {/*<Icon />*/}
                  {/*google icon*/}
                  <h3
                    className={
                      'text-center mt-1 text-base font-bold text-gray-900'
                    }
                  >
                    You are logged in with Google
                  </h3>
                  <Button variant={'none'}>Manage Acccount</Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PasswordManagement
            register={register}
            watch={watch}
            errors={errors}
          />
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="bg-indigo-600 border border-transparent rounded-none shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;
