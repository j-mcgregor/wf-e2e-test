import React, { useRef } from 'react';
import Input from '../../elements/Input';
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import { useTranslations } from 'next-intl';

interface PasswordFormInput {
  newPassword: string;
  confirmPassword: string;
}

const PasswordManagement = () => {
  const t = useTranslations();

  const { register, formState, getValues, handleSubmit, watch } =
    useForm<PasswordFormInput>();
  const { isDirty, errors } = formState;
  let pass = watch('newPassword');

  const onSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <Input
            {...register('newPassword', {
              required: 'You must specify a password',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              }
            })}
            label={t('forms.password-management.new password')}
            name="newPassword"
            type="password"
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}

          <Input
            {...register('confirmPassword', {
              validate: () => {
                return (
                  getValues('newPassword') !== pass ||
                  'The passwords did not match'
                );
              }
            })}
            label={t('forms.password-management.confirm password')}
            name="confirmPassword"
            type="password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
    </form>
  );
};

export default PasswordManagement;
