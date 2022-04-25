import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../elements/Button';
import Input from '../../elements/Input';

interface FormDataType {
  email: string;
  full_name: string;
  role: 'Admin' | 'User';
}

const AddNewUserForm = () => {
  const t = useTranslations();
  const [role, setRole] = React.useState('User');
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = data => console.log(data);

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
                  <ul className="grid grid-cols-2">
                    <li className="relative">
                      <input
                        {...register('role', { required: true })}
                        type="radio"
                        name="role"
                        id="user_role"
                        className="sr-only peer"
                        value="User"
                        checked
                      />
                      <label
                        htmlFor="user_role"
                        className="flex h-10 items-center justify-center rounded-l-lg border-[1px] border-primary bg-white text-primary peer-checked:text-white peer-checked:bg-alt"
                      >
                        User
                      </label>
                    </li>
                    <li className="relative">
                      <input
                        {...register('role', { required: true })}
                        type="radio"
                        name="role"
                        id="admin_role"
                        className="sr-only peer"
                        value="Admin"
                      />
                      <label
                        htmlFor="admin_role"
                        className="flex h-10 px-2 items-center justify-center rounded-r-lg border-[1px] border-primary  bg-white text-primary peer-checked:text-white peer-checked:bg-highlight"
                      >
                        Admin
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-5">
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
              disabled={!isDirty || isSubmitting}
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
