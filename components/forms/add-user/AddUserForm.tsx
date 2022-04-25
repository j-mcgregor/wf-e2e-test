import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useOrganisation from '../../../hooks/useOrganisation';

import Button from '../../elements/Button';
import Input from '../../elements/Input';

interface FormDataType {
  email: string;
  full_name: string;
  organisation_role: 'Admin' | 'User';
}

const AddNewUserForm = () => {
  const t = useTranslations();
  const { organisation, message } = useOrganisation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = async data => {
    const res = await fetch(`/api/organisation/${organisation?.id}/user`, {
      method: 'POST',
      body: JSON.stringify({
        ...{
          email: 'user@example.com',
          is_active: true,
          is_superuser: false,
          full_name: 'string',
          organisation_id: organisation?.id,
          preferences: {
            defaults: {
              locale: 'en-GB',
              currency: 'GBP',
              home_page: 'dashboard',
              reporting_country: 'GB'
            },
            communication: {
              batch_report_email: true,
              service_updates: true,
              company_updates: true
            }
          },
          organisation_role: 'User',
          password: 'string'
        },
        ...data
      })
    });
    reset({ full_name: '', email: '', organisation_role: 'User' });
  };

  return (
    <>
      <div className="bg-white shadow">
        <div className="p-5">
          <h2 className="text-xl font-semibold">{t('new_user_form_title')}</h2>
          <p className="text-gray-500">{t('new_user_form_description')}</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5">
            <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
              <div className="w-96">
                <Input
                  label="Full name *"
                  type="text"
                  {...register('full_name', {
                    required: true,
                    pattern: /^[a-zA-Z]+\s[a-zA-Z]+$/i
                  })}
                />
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
            <div className="mt-5 w-96">
              <Input
                label="Email *"
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/i
                })}
              />
            </div>
          </div>
          <div className="bg-gray-50 p-5">
            <Button
              type="submit"
              variant="alt"
              disabled={!isValid || isSubmitting}
              className="max-w-max"
            >
              {t('add_user_button')}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewUserForm;
