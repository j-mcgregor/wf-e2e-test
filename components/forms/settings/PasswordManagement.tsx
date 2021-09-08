import React, { FC, useRef } from 'react';
import Input from '../../elements/Input';
import { UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { useForm } from 'react-hook-form';

interface PasswordManagementProps {
  watch: UseFormWatch<any>;
  errors: FieldErrors;
  register: UseFormRegister<any>;
}

const newPasswordProps = {
  label: 'New Password',
  name: 'newPassword',
  type: 'password'
};
const confirmPasswordProps = {
  label: 'Confirm Password',
  name: 'confirmPassword',
  type: 'password'
};

const PasswordManagement: FC = ({{register, watch, errors}}) => {

  interface PasswordFormInput {
    newPassword: string;
    confirmPassword: string;
  }


  const password = useRef({});
  password.current = watch('password', '');


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register('newPassword', {
            required: 'You must specify a password',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters'
            }
          })}
          {...newPasswordProps}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <Input
          {...register('confirmPassword', {
            validate: value =>
              value === password.current || 'The passwords do not match'
          })}
          {...confirmPasswordProps}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
    </form>
  );
};

export default PasswordManagement;
