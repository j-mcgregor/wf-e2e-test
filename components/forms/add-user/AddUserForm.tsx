import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useOrganisation from '../../../hooks/useOrganisation';
import * as Sentry from '@sentry/nextjs';

import Button from '../../elements/Button';
import Input from '../../elements/Input';
import ErrorMessage from '../../elements/ErrorMessage';
import { GENERIC_API_ERROR } from '../../../lib/utils/error-codes';
import ErrorSkeleton from '../../skeletons/ErrorSkeleton';
import { CheckIcon } from '@heroicons/react/outline';

interface FormDataType {
  email: string;
  full_name: string;
  password: string;
  organisation_role: 'Admin' | 'User';
}

const AddNewUserForm = ({
  onSubmitSuccess
}: {
  onSubmitSuccess: () => void;
}) => {
  const [submitError, setSubmitError] = React.useState({
    type: 'INTERNAL_SERVER_ERROR'
  });
  const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
  const t = useTranslations();
  const { organisation, message } = useOrganisation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitted }
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = async data => {
    try {
      const res = await fetch(`/api/organisation/${organisation?.id}/user`, {
        method: 'POST',
        body: JSON.stringify(data)
      });

      const json = await res.json();
      onSubmitSuccess();

      if (!json.ok) {
        setSubmitError({ type: json.message });
      } else {
        onSubmitSuccess();
        setSuccessfulSubmit(true);
      }

      return reset();
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <Sentry.ErrorBoundary
      showDialog
      fallback={<ErrorSkeleton message={t(GENERIC_API_ERROR)} />}
      beforeCapture={scope => {
        scope.setTag('location', 'form-add-new-organisation-user');
      }}
    >
      <div className="bg-white shadow max-w-3xl">
        <div className="p-5">
          <h2 className="text-xl font-semibold">{t('new_user_form_title')}</h2>
          <p className="text-gray-500">{t('new_user_form_description')}</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5">
            <div className="flex flex-col-reverse md:flex-row gap-4 justify-between">
              <div className="w-full">
                <div className="w-64">
                  <Input
                    label="Full name *"
                    type="text"
                    isError={errors.full_name?.type === 'required'}
                    onErrorClassName="border-red-500 border-2"
                    {...register('full_name', {
                      required: true,
                      pattern: /^\S+\s\S+$/i
                    })}
                  />
                </div>
                {errors.full_name && (
                  <p className="mb-2 text-xs text-red-500">
                    Full name is required and must be a first and last name.
                  </p>
                )}
                <div className="w-4/5">
                  <Input
                    label="Email *"
                    type="email"
                    isError={errors.email?.type === 'required'}
                    onErrorClassName="border-red-500 border-2"
                    {...register('email', {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/i
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mb-2 text-xs text-red-500">
                    A valid email is required.
                  </p>
                )}

                <div className="w-64">
                  <Input
                    label="Password *"
                    type="password"
                    isError={errors.password?.type === 'required'}
                    onErrorClassName="border-red-500 border-2"
                    {...register('password', {
                      required: true
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mb-2 text-xs text-red-500">
                    A valid password is required (at least 8 characters with at
                    least 1 upper case, 1 lower case, 1 numeric and 1 symbol).
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  {t('add_user_form_role_label')}
                </label>
                <div className="flex w-52 my-2 h-9">
                  <ul className="grid grid-cols-2 w-full">
                    <li className="relative">
                      <input
                        {...register('organisation_role', { required: true })}
                        type="radio"
                        name="role"
                        id="user_role"
                        className="sr-only peer"
                        value="User"
                        checked
                      />
                      <label
                        htmlFor="user_role"
                        className="flex h-10 px-2 items-center justify-center rounded-l-lg border-[1px] border-primary bg-white text-primary peer-checked:text-white peer-checked:bg-alt cursor-pointer"
                      >
                        User
                      </label>
                    </li>
                    <li className="relative">
                      <input
                        {...register('organisation_role', { required: true })}
                        type="radio"
                        name="role"
                        id="admin_role"
                        className="sr-only peer"
                        value="Admin"
                      />
                      <label
                        htmlFor="admin_role"
                        className="flex h-10 px-2 items-center justify-center rounded-r-lg border-[1px] border-primary  bg-white text-primary peer-checked:text-white peer-checked:bg-highlight cursor-pointer"
                      >
                        Admin
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-5 flex justify-between items-center">
            <Button
              type="submit"
              variant="alt"
              loading={isSubmitting}
              disabled={!isDirty || isSubmitting}
              className="max-w-fit"
            >
              {t('add_user_button')}
            </Button>
            {submitError && <ErrorMessage text={t(submitError.type)} />}
            {successfulSubmit && (
              <div className="flex gap-1 items-center text-green-500">
                <CheckIcon className="h-5 w-5" />
                <p>{t('new_user_created')}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </Sentry.ErrorBoundary>
  );
};

export default AddNewUserForm;
