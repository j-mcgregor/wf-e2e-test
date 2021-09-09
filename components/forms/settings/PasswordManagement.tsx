import React from 'react';
import Input from '../../elements/Input';
import { useForm } from 'react-hook-form';

interface PasswordFormInput {
  newPassword: string;
  confirmPassword: string;
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

const PasswordManagement = () => {
  const { register, formState, getValues, handleSubmit} = useForm<PasswordFormInput>();
  const { isDirty, isValid, errors } = formState;

  const onSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    alert(JSON.stringify(data));
  };

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
        {errors.newPassword && <p>{errors.newPassword.message}</p>}

        <Input
          {...register('confirmPassword', {
            validate: {
              sameAs: value => getValues('newPassword') === value
            }
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
