import React from 'react';
import Input from '../../elements/Input';
import { useForm } from 'react-hook-form';
import Button from '../../elements/Button';
import { useTranslations } from 'next-intl';
import ErrorMessage from '../../elements/ErrorMessage';
import {
  CONFIRM_PASSWORD_MATCH,
  NEW_PASSWORD_REQUIRED
} from '../../../lib/utils/error-codes';

interface PasswordFormInput {
  newPassword: string;
  confirmPassword: string;
}

const PasswordManagement = () => {
  const t = useTranslations();

  const { register, formState, getValues, handleSubmit, reset } =
    useForm<PasswordFormInput>();
  const { isDirty, errors } = formState;

  const onSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div className=" xs:w-full sm:w-full lg:w-1/2">
          <Input
            {...register('newPassword', {
              required: 'You must specify a password',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              }
            })}
            label={t('forms.password-management.new_password')}
            name="newPassword"
            type="password"
          />
          {errors.newPassword && (
            <ErrorMessage text={t(NEW_PASSWORD_REQUIRED)} />
          )}
          <Input
            {...register('confirmPassword', {
              validate: {
                //if this returns false it triggers the validation to show, its if validating is false, trigger message
                confirmPasswordValidate: value => {
                  return getValues('newPassword') === value;
                }
              }
            })}
            label={t('forms.password-management.confirm_password')}
            name="confirmPassword"
            type="password"
          />
          {errors?.confirmPassword && (
            <ErrorMessage text={t(CONFIRM_PASSWORD_MATCH)} />
          )}
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
